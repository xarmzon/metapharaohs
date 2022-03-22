import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

type TypeOS = 'Android' | 'iOS' | 'Unknown' | 'Windows Phone' | 'Metamask'

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
  const [doneMinting, setDoneMinting] = useState<boolean>(false)
  const [mobileConnect, setMobileConnect] = useState<boolean>(false)
  const [mobileLink, setMobileLink] = useState<string>('')
  const [transactionID, setTransactionID] = useState<string>('')

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
    } else {
      toast.error(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
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

  const getMobileOperatingSystem = (): TypeOS => {
    var userAgent =
      navigator?.userAgent || navigator?.vendor || (window as any)?.opera

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const uid = urlParams.get('uid')

    if (uid == 'mm') {
      return 'Metamask'
    }
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone'
    }

    if (/android/i.test(userAgent)) {
      return 'Android'
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'iOS'
    }

    return 'Unknown'
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
        if (
          getMobileOperatingSystem() == 'Android' ||
          getMobileOperatingSystem() == 'iOS'
        ) {
          setMobileConnect(true)
          const link =
            'https://metamask.app.link/dapp/' +
            window?.location?.href
              .replace('https://', '')
              .replace('http://', '') +
            '?uid=mm'
          setMobileLink(link)
        } else {
          connected && setConnected(false)
        }
      }
    }

    checkExistingAccount()

    const addEthEvent = () => {
      const eth = (window as any).ethereum
      eth?.on('accountsChanged', checkExistingAccount)
    }
    window.addEventListener('load', addEthEvent)
    return () => {
      window.removeEventListener('load', addEthEvent)
    }
  }, [connected, ethereum])

  useEffect(() => {
    const total = totalMint * price
    setTotalPrice(+total.toFixed(2))
  }, [price, totalMint])

  return {
    price,
    account,
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
    doneMinting,
    transactionID,
    mobileLink,
  }
}

export default useEther
