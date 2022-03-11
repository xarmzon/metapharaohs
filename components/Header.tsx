import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="max-container mb-2 flex flex-col items-center space-y-2 p-5 md:items-start md:px-0">
      <Logo />
      <h6
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex flex-col items-center bg-gradient-to-r from-primary-201 to-primary-100 bg-clip-text text-center capitalize text-transparent md:mx-auto md:max-w-lg md:text-xl lg:max-w-xl lg:text-2xl"
      >
        Made by a team of E-Commerce, Digital Marketing and Venture Capital
        Experts.
      </h6>
    </header>
  )
}

export default Header
