import React from 'react'
import useEther from '../hooks/useEther'
import Button from './Button'

const Main = () => {
  const {
    increaseEth,
    decreaseEth,
    totalMint,
    totalPrice,
    maxMint,
    account,
    minMint,
    connected,
    connectAccount,
    formatAccount,
    mint,
    minting,
    doneMinting,
    mobileConnect,
    mobileLink,
  } = useEther()

  if (doneMinting) {
    return <div className="">Done Minting</div>
  }

  return (
    <main
      data-aos="flip-down"
      data-aos-delay="300"
      className="max-container relative flex w-[90%] flex-col space-y-5 divide-y divide-dashed divide-slate-200/30 rounded-lg border-[4px] border-x-primary-201 border-y-primary-101 p-5 py-2 text-center backdrop-blur-[1px]"
    >
      <span className="absolute -inset-2 -z-[1] bg-gradient-to-tr from-pink-800 to-purple-900 opacity-30 blur-sm" />
      {account && (
        <section className="absolute -top-4 left-1/2 -translate-x-1/2 py-[1px] text-xs italic md:text-sm lg:text-base">
          {formatAccount(account)}
        </section>
      )}
      <section className="pt-4 text-2xl font-black uppercase md:text-5xl">
        <h1 className="">
          Limited sale now{' '}
          <span className="bg-gradient-to-br from-purple-400 to-red-400 bg-clip-text text-transparent">
            live
          </span>
          !
        </h1>
        <p className="mt-2 text-sm text-yellow-200 md:text-3xl">
          {totalPrice} ETH + GAS
        </p>
      </section>
      <section className="flex flex-col">
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            onClick={decreaseEth}
            text="-"
            disabled={totalMint <= minMint}
          />
          <div className="rounded-md bg-primary/80 px-5 py-4 text-2xl md:text-6xl">
            {totalMint}
          </div>
          <Button
            onClick={increaseEth}
            text="+"
            disabled={totalMint >= maxMint}
          />
        </div>
        <span className="-mt-2 text-xs capitalize md:text-sm lg:text-base">
          {maxMint} NFTs per Wallet
        </span>
      </section>
      <section className="py-2">
        {connected ? (
          <Button
            disabled={minting}
            type="mint"
            onClick={mint}
            text={minting ? 'PLEASE WAIT...' : `MINT NOW FOR ${totalPrice}ETH`}
          />
        ) : mobileConnect ? (
          <Button
            type="mint"
            text="Connect Mobile"
            link={mobileLink}
            linkType
          />
        ) : (
          <Button type="mint" onClick={connectAccount} text="Connect Wallet" />
        )}
      </section>
    </main>
  )
}

export default Main
