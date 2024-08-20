"use client"        // add when using useAuth

import Logo from '@/app/_components/Logo'
import React, { useEffect } from 'react'
import { OrganizationSwitcher, UserButton, useAuth, useUser } from '@clerk/nextjs'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

function Header() {
	const { orgId } = useAuth();
	const { user } = useUser();

	useEffect(()=> {
		user && saveUserData();
	}, [user])

	// saving the current user data
	const saveUserData = async() => {
		const docId = user?.primaryEmailAddress?.emailAddress;
		try {
			await setDoc(doc(db, 'LoopUsers', docId), {
				name: user?.fullName,
				avatar: user?.imageUrl,
				email: user?.primaryEmailAddress?.emailAddress
			});
		}
		catch (e) {
			console.log('error while saving user! ', e);
		}
	}

	return (
		<div className='flex justify-between items-center px-2 py-1 shadow-sm'>
			<Logo />

			<OrganizationSwitcher
				afterCreateOrganizationUrl={'/dashboard'}
				afterLeaveOrganizationUrl={'dashboard'}
			/>

			<UserButton />
		</div>
	)
}

export default Header