"use client"
import React from 'react'
import SideNav from '../../_components/SideNav'

function WorkspaceDocument({ params }) {

  return (
    <div>
        {/* sideNav */}
        <div className=''>
            <SideNav params={params}/>
        </div>

        {/* Document */}
        <div className='md:ml-72'>
            document
        </div>
    </div>
  )
}

export default WorkspaceDocument