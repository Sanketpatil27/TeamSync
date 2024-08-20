import React from 'react'
import SideNav from '../_components/SideNav'

function Workspace({ params }) {
  return (
    <div>
        <SideNav params={params}/>

        <div className='md:ml-72 lg:ml-72'>
          Select any workspace document to start working
        </div>
    </div>
  )
}

export default Workspace