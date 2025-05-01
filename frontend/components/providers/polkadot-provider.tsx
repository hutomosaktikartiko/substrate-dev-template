"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { useRouter } from "next/navigation"

type PolkadotContextType = {
    api: ApiPromise | null
    isConnected: boolean,
    rpcUrl: string,
    setRpcUrl: (url: string) => void,
    disconnect: () => void
}

const PolkadotContext = createContext<PolkadotContextType>({
    api: null,
    isConnected: false,
    rpcUrl: "",
    setRpcUrl: () => { },
    disconnect: () => { },
})

export function PolkadotProvider ({ children }: { children: React.ReactNode }) {
    const [api, setApi] = useState<ApiPromise | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [rpcUrl, setRpcUrl] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("polkadotRpcUrl") || ""
        }

        return ""
    })
    const router = useRouter()

    useEffect(() => {
        const connect = async () => {
            try {
                const provider = new WsProvider(rpcUrl)
                const api = await ApiPromise.create({ provider })
                await api.isReady
                setApi(api)
                setIsConnected(true)
            } catch (error) {
                console.error("Polkadot connection failed", error)
                setIsConnected(false)
            }
        }

        connect()
    }, [rpcUrl])

    const handleSetRpcUrl = (url: string) => {
        localStorage.setItem("polkadotRpcUrl", url)
        setRpcUrl(url)
        setIsConnected(false)
        setApi(null)
    }

    const handleDisconnect = () => {
        if (api) {
            api.disconnect()
        }
        setApi(null)
        setIsConnected(false)
        localStorage.removeItem("polkadotRpcUrl")
        router.push("/connect")
    }

    return (
        <PolkadotContext.Provider
            value={{ api, isConnected, rpcUrl, setRpcUrl: handleSetRpcUrl, disconnect: handleDisconnect }}
        >
            {children}
        </PolkadotContext.Provider>
    )
}

export function usePolkadot () {
    return useContext(PolkadotContext)
}
