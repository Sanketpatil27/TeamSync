"use client"

import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { db } from '@/config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

function DocumentInfo({ params }) {
    const [coverImage, setCoverImage] = useState('/cover.png');
    const [emoji, setEmoji] = useState("");
    const [documentInfo, setDocumentInfo] = useState('');
    
    useEffect(() => {
        getDocumentInfo();
    }, [params]);

    // used to get document info
    const getDocumentInfo = async()=> {
        const docRef = doc(db, 'workspaceDocument', params?.documentid);
        const docSnap = await getDoc(docRef);
        
        if(docSnap.exists()) {
            // console.log(docSnap.data());
            setDocumentInfo(docSnap.data());
            setEmoji(docSnap?.data()?.emoji);
            docSnap?.data().coverImage && setCoverImage(docSnap?.data()?.coverImage); 
        }
    }

    const updateDocumentInfo = async(key, value)=>{
        const docRef = doc(db, 'workspaceDocument', params?.documentid);
        await updateDoc(docRef, {
            [key]: value,
        });

        toast('Document Updated!');
    }

    return (
        <div className=''>
            {/* Cover */}
            <CoverPicker updateCoverImg={(img) =>{ 
                            setCoverImage(img)
                            updateDocumentInfo('coverImage', img);
                        }}>
                <div className='relative group cursor-pointer'>
                    <h2 className='hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center'> Change Cover</h2>
                    <div className='group-hover:opacity-50'>
                        <Image src={coverImage} width={400} height={400}
                            className='w-full h-[200px] object-cover rounded-t-xl'
                        />
                    </div>
                </div>
            </CoverPicker >

            {/* Emoji Picker */}
            <div className='absolute top-56 ml-10 cursor-pointer'>
                <EmojiPickerComponent setEmojiIcon={(val) => {
                                        setEmoji(val); 
                                        updateDocumentInfo('emoji', val);
                                    }}>
                    <div className="rounded-full p-4 bg-[#ffffffb0]">
                        {emoji ? <span className='text-2xl'>{emoji}</span> : <SmilePlus className='h-8 w-8 text-gray-400'/>}
                    </div>
                </EmojiPickerComponent >
            </div>

            {/* File Name */}
            <div className='mt-10 p-10'>
                <input type='text' 
                    placeholder='Untitled Document'
                    defaultValue={documentInfo?.documentName}
                    className='font-bold text-4xl outline-none'
                    onBlur={(e) => updateDocumentInfo('documentName', e.target.value)}
                />
            </div>
        </div>
    )
}

export default DocumentInfo