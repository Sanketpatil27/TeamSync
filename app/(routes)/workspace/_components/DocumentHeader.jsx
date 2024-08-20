import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function DocumentHeader() {
  return (
    <div className='flex w-full justify-between items-center p-3 px-7 shadow-md'>
        <div> </div>

        <OrganizationSwitcher />

        <div className='flex gap-2 justify-end'>
            <Button> Share </Button>
            <UserButton />
        </div>
    </div>
  )
}

export default DocumentHeader