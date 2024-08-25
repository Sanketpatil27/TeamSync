import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'}>
      <div>
        <Image src={'/logo.png'} alt={'Logo Missing'} width={30} height={30} />
      </div>
    </Link>
  )
}

export default Logo