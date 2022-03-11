import React from 'react'

interface IButton {
  onClick: () => void
  text: string
  type?: 'sm' | 'mint'
  disabled?: boolean
}

const classes = {
  common: 'rounded-lg cursor-pointer duration-[300ms] ',
  sm: 'text-sm px-5 py-2 bg-gradient-to-t from-primary-101/20 to-zinc-200/10 border-[1px] border-primary-101/20 hover:border-primary-101/40 disabled:pointer-events-none disabled:pointer-not-allowed disabled:bg-gradient-to-b disabled:from-black/40 disabled:border-transparent disabled:to-black/20 disabled:text-gray-700 md:text-4xl',
  mint: 'px-4 py-2 bg-gradient-to-t from-primary hover:from-primary/80 to-primary-500',
}

const Button = ({ onClick, text, type = 'sm', disabled = false }: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${classes.common} ${
        type === 'sm' ? classes.sm : classes.mint
      }`}
    >
      {text}
    </button>
  )
}

export default Button
