import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div>
        <Image src={'/logo.png'} alt={'Logo Missing'} width={30} height={30}/>
    </div>
  )
}

export default Logo