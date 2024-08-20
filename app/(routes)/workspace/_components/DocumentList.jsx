"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { toast } from 'sonner';

function DocumentList({ documentList, params }) {
    const router = useRouter();

    const DeleteDocument = async(docId) => {
        await deleteDoc(doc(db, "workspaceDocument", docId));
        toast("Document Deleted!");
    }
    
    return (
        <div>
            {
                documentList.map((doc, ind) => {
                    return <div key={ind} className={`flex justify-between items-center cursor-pointer mt-2 p-2 py-3 hover:bg-purple-200 rounded-lg ${doc.id == params?.documentid && 'bg-white'}`}
                        onClick={() => { router.push(`/workspace/${params.workspaceid}/${doc.id}`) }}
                    >
                        <div className='flex gap-2 items-center max-w-72 truncate'>
                            {!doc.emoji && <Image src={'/loopdocument.svg'} width={20} height={20} alt='doc' />}
                            <h2 className='truncate'> {doc?.emoji} {doc.documentName} </h2>
                        </div>

                        {/* doc options */}
                        <DocumentOptions doc={doc} deleteDocument={(docId) => DeleteDocument(docId)}/>
                    </div>
                })
            }
        </div>
    )
}

export default DocumentList