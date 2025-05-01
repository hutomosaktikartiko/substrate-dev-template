"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { web3Enable, web3Accounts, web3FromAddress } from "@polkadot/extension-dapp"
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import type { Signer as InjectedSigner } from "@polkadot/api/types"


interface WalletContextType {
    accounts: InjectedAccountWithMeta[]
    selectedAccount?: InjectedAccountWithMeta
    signer?: InjectedSigner
    connectWallet: () => void
    disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType>({
    accounts: [],
    connectWallet: () => { },
    disconnectWallet: () => { }
})

export function WalletProvider ({ children }: { children: React.ReactNode }) {
    const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
    const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>()
    const [signer, setSigner] = useState<InjectedSigner>()

    useEffect(() => {
        async function initWallet () {
            if (typeof window === "undefined") return

            const extensions = await web3Enable("Polkadot Dashboard")
            if (extensions.length === 0) return

            const accs = await web3Accounts()
            setAccounts(accs)

            const lastAddress = localStorage.getItem("selectedAccount")
            const matched = accs.find((acc) => acc.address === lastAddress)

            if (matched) {
                setSelectedAccount(matched)
                const injector = await web3FromAddress(matched.address)
                setSigner(injector.signer)
            }
        }

        initWallet()
    }, [])

    const connectWallet = async () => {
        if (typeof window === "undefined") return

        const extensions = await web3Enable("Polkadot Dashboard")
        if (!extensions.length) {
            alert("Please install Polkadot.js extension")

            return
        }

        const accs = await web3Accounts()
        setAccounts(accs)

        if (accs.length > 0) {
            const injector = await web3FromAddress(accs[0].address)
            setSigner(injector.signer)
            setSelectedAccount(accs[0])
            localStorage.setItem("selectedAccount", accs[0].address)
        }
    }

    const disconnectWallet = () => {
        setAccounts([])
        setSelectedAccount(undefined)
        setSigner(undefined)
    }

    return (
        <WalletContext.Provider
            value={{ accounts, selectedAccount, signer, connectWallet, disconnectWallet }}
        >
            {children}
        </WalletContext.Provider>
    )
}
export const useWallet = () => useContext(WalletContext)