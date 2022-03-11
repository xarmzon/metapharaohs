import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const useEther = () => {
  const [ethereum, setEthereum] = useState<any>(null)
  const [price, setPrice] = useState<number>(0.09)
  const [account, setAccount] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [totalPrice, setTotalPrice] = useState<number>(() => price)
  const [totalMint, setTotalMint] = useState<number>(1)
  const [maxMint, setMaxMint] = useState<number>(5)
  const [minMint, setMinMint] = useState<number>(1)
  const [connected, setConnected] = useState<boolean>(false)
  const [minting, setMinting] = useState<boolean>(false)
  const [mobileConnect, setMobileConnect] = useState<boolean>(false)

  const increaseEth = (by: number = 1) => {
    maxMint > totalMint && setTotalMint((prev) => prev + 1)
  }
  const decreaseEth = (by: number = 1) => {
    totalMint > 1 && setTotalMint((prev) => prev - 1)
  }

  const connectAccount = async () => {
    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0])
        setConnected(true)

        //TODO:SWITCH TO MAINNET
      } catch (error) {
        toast.error(
          'Failed to connect to your wallet account. Please try again'
        )
        setConnected(false)
      }
    }
  }

  const formatAccount = (account: string) => {
    const factor = 10
    if (account.length > 0) {
      return `${account.substring(0, factor)}...${account.substring(
        account.length - factor
      )}`
    } else {
      return account
    }
  }

  const mint = async () => {
    console.log('Minting')
    setMinting(true)
    toast.loading('Loading...')
    setTimeout(() => {
      setMinting(false)
      toast.dismiss()
    }, 2000)
  }

  useEffect(() => {
    if (window) {
      setEthereum(() =>
        (window as any).ethereum ? (window as any).ethereum : null
      )
    }
    const checkExistingAccount = async () => {
      if (ethereum) {
        if (ethereum?.selectedAddress) {
          setAccount(ethereum?.selectedAddress)
          setConnected(true)
        } else {
          setConnected(false)
        }
      } else {
        setConnected(false)
      }
    }

    checkExistingAccount()

    const addEthEvent = () => {
      const eth = (window as any).ethereum
      eth.on('accountsChanged', checkExistingAccount)
    }
    window.addEventListener('load', addEthEvent)
    return () => {
      window.removeEventListener('load', addEthEvent)
    }
  }, [ethereum])

  useEffect(() => {
    const total = totalMint * price
    setTotalPrice(+total.toFixed(2))
  }, [price, totalMint])

  return {
    price,
    account,
    address,
    totalPrice,
    totalMint,
    maxMint,
    increaseEth,
    decreaseEth,
    minMint,
    connected,
    connectAccount,
    mobileConnect,
    formatAccount,
    mint,
    minting,
  }
}

export default useEther
