import React from 'react'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="max-container mt-3 flex w-[90%] flex-col items-center justify-center p-2 text-center">
      <div className="relative flex items-center space-x-6 text-3xl">
        <a
          href="https://twitter.com/metapharaohsnft"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://discord.gg/metapharaohs"
          target="_blank"
          rel="noreferrer"
        >
          <FaDiscord />
        </a>
      </div>
    </footer>
  )
}

export default Footer
