import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import detectEthereumProvider from '@metamask/detect-provider'

type TypeOS = 'Android' | 'iOS' | 'Unknown' | 'Windows Phone' | 'Metamask'

const useEther = () => {
  const [ethereum, setEthereum] = useState<any>(null)
  const [price, setPrice] = useState<number>(0.15)
  const [account, setAccount] = useState<string>('')
  const [address, setAddress] = useState<string>(
    '0x5E0C7B9805aE842E30909F3c63344D4964EDb23f'
  )
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
  const [checkingMobile, setCheckingMobile] = useState(false)

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
    if (minting) return

    if (ethereum?.chainId !== '0x1') {
      //change to mainnet
      toast.error('Please switch your account to mainnet first')
      try {
        await ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        })
      } catch (error: any) {
        toast.error(`Error: ${error?.message || 'Unknown Error occurred'}`)
        return
      }
    }

    setMinting(true)
    toast.loading('Loading...')
    try {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(`${totalPrice}`),
      })
      setDoneMinting(true)
      toast.dismiss()
      toast.success('Transaction Successful', { duration: 6000 })
    } catch (error: any) {
      toast.dismiss()
      toast.error(`Error: ${error?.message || 'Unknown Error occurred'}`)
    }
    setMinting(false)
  }

  useEffect(() => {
    if (window) {
      setEthereum(() =>
        (window as any).ethereum ? (window as any).ethereum : null
      )
    }

    //window mobile checker
    const mobileEthChecker = () => {
      window.addEventListener('ethereum#initialized', checkExistingAccount, {
        once: true,
      })
      setTimeout(checkExistingAccount, 3000)
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
        setCheckingMobile(true)
        const provider = await detectEthereumProvider()
        setCheckingMobile(false)
        if (provider !== (window as any).ethereum) {
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
            mobileEthChecker()
          } else {
            connected && setConnected(false)
          }
        } else {
          setEthereum(provider)
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
    checkingMobile,
  }
}

export default useEther
