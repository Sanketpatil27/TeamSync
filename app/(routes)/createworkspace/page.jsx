"use client"

import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import uuid4 from 'uuid4';

function CreateWorkspace() {
    const { user } = useUser();
    const { orgId } = useAuth();
    const [coverImage, setCoverImage] = useState('/cover.png');
    const [workspaceName, setWorkspaceName] = useState();
    const [emoji, setEmoji] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    // create new workspace & save data in database
    const OnCreateWorkspace = async () => {
        setLoading(true);

        const workspaceId = Date.now();

        // in setdoc, provide doc(firestore and collection name & workspaceId in string format) & fields which we want to insert
        const result = await setDoc(doc(db, 'workspace', workspaceId.toString()), {
            workspaceName: workspaceName,
            emoji: emoji,
            coverImage: coverImage,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            id: workspaceId,
            orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
        });

        const docId = uuid4();
        await setDoc(doc(db, 'workspaceDocument', docId.toString()), {
            workspaceId: workspaceId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: []
        });

        await setDoc(doc(db, 'documentOutput', docId.toString()), {
            docId: docId,
            output: [],
        });

        setLoading(false);
        router.replace('/workspace/'+workspaceId+'/'+docId);
    }

    return (
        <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
            {/* show card */}
            <div className='rounded-bl-md rounded-xl shadow-2xl'>

                {/* cover image */}
                {/* pass the cover image div as child to coverpicker so this will work as *trigger */}
                <CoverPicker updateCoverImg={(img) => setCoverImage(img)}>
                    <div className='relative group cursor-pointer'>
                        <h2 className='hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center'> Change Cover</h2>
                        <div className='group-hover:opacity-50'>
                            <Image src={coverImage} width={400} height={400}
                                className='w-full h-[180px] object-cover rounded-t-xl'
                            />
                        </div>
                    </div>
                </CoverPicker >

                {/* Input Section */}
                <div className='p-12'>
                    <div>
                        <h2 className='text-xl font-medium'>Create a new workspace</h2>
                        <span> This is shared space where you can colloborate with your team </span>

                        <div className='flex mt-8 items-center gap-2'>
                            <EmojiPickerComponent setEmojiIcon={(val) => setEmoji(val)} >
                                <Button variant={emoji && "outline"} className="text-xl">
                                    {emoji? emoji : <SmilePlus />}
                                </Button>
                            </EmojiPickerComponent >

                            <Input
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                className='p-1 w-full  outline-primary' placeholder="Workspace Name"
                            />
                        </div>

                        <div className='mt-12 flex flex-col md:flex-row md:justify-end gap-2'>
                            <Button disabled={!workspaceName?.length || loading}
                                onClick={OnCreateWorkspace}
                            > 
                                Create  { loading && <Loader2Icon className="animate-spin ml-2" /> }
                            </Button>
                            <Button variant="outline"> Cancel </Button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default CreateWorkspace