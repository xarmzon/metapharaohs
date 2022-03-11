import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { APP_NAME } from '../utils/constants'

const Logo = () => {
  return (
    <Link href={'/'}>
      <a className="relative h-20 w-52 md:h-24 md:w-60" data-aos="fade-down">
        <Image
          src="/images/logo.png"
          layout="fill"
          objectFit="contain"
          alt={`${APP_NAME} Logo`}
        />
      </a>
    </Link>
  )
}

export default Logo
