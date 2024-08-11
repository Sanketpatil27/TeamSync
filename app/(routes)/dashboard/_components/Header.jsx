"use client"        // add when using useAuth

import Logo from '@/app/_components/Logo'
import React from 'react'
import { OrganizationSwitcher, UserButton, useAuth } from '@clerk/nextjs'

function Header() {
    const {orgId} = useAuth();
    console.log(orgId);
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