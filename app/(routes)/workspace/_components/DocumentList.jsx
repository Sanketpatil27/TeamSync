"use client"

import Image from 'next/image'
import React from 'react'

function DocumentList({ documentList, params }) {
  return (
    <div>
        {
            documentList.map((doc, ind) => {
                return <div key={ind} className={`mt-2 p-2 py-3 hover:bg-purple-200 rounded-lg ${doc.id == params?.documentid && 'bg-white'}`}>
                    <div className='flex gap-2 items-center'>
                        { !doc.emoji && <Image src={'/loopdocument.svg'} width={20} height={20} alt='doc' /> } 
                        <h2> {doc?.emoji} { doc.documentName } </h2>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default DocumentList