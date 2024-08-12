"use client"

import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { querySnapshot, collection, onSnapshot, query, setDoc, where, doc } from 'firebase/firestore'
import { Bell, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


function SideNav({ params }) {
	const [documentList, setDocumentList] = useState([]); 
	const { user } = useUser();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		params && GetDocumentList();
	}, [params]);

	// used to get document list
	const GetDocumentList = () => {
		const q = query(collection(db, 'workspaceDocument'),
				  	where('workspaceId', '==', Number(params?.workspaceid)))

		// give all the latest data whenever document get updated
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setDocumentList([]);		// to no add same document again & again

			querySnapshot.forEach((doc) => {
				setDocumentList(documentList => [...documentList, doc.data()])
			})
		})
	}

	// create new document when click on plus icon
	const CreateNewDocument = async() => {
		setLoading(true);

		const docId = uuid4();
        await setDoc(doc(db, 'workspaceDocument', docId.toString()), {
            workspaceId: Number(params?.workspaceid),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: []
        });

        setLoading(false);
        router.replace('/workspace/'+params?.workspaceid+'/'+docId);
	}

	return (
		<div className='h-screen fixed md:w-72 hidden md:block bg-blue-50 p-5 shadow-md'>
			<div className='flex justify-between items-center'>
				<Logo />
				<Bell className='h-5 w-5 ' />
			</div>
			<hr className="my-5" />

			<div>
				<div className='flex justify-between items-center'>
					<h2>Workspace Name</h2>
					<Button onClick={CreateNewDocument} size="sm">
						{ loading ? <Loader className='h-4 w-4 animate-spin'/> : '+'}
					 </Button>
				</div>
			</div>

			{/* document list */}
			<div className='mt-8'>
				<DocumentList documentList={documentList} params={params}/>
			</div>
		</div>
	)
}

export default SideNav