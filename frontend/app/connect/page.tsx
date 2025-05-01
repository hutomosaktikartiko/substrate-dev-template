"use client"

import { usePolkadot } from "@/components/providers/polkadot-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"

export default function ConnectPage () {
    const { isConnected, rpcUrl, setRpcUrl } = usePolkadot()
    const [urlInput, setUrlInput] = useState(rpcUrl)
    const router = useRouter()

    useEffect(() => {
        if (isConnected) {
            router.replace("/dashboard")
        }
    }, [isConnected, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setRpcUrl(urlInput.trim())
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Connect to your Polkadot Node</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">RPC WebSocket URL</label>
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="wss://rpc.polkadot.io"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-full-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Connect
                </button>
            </form>
            {!isConnected && <p className="text-sm mt-3 text-gray-600">Waiting for connection...</p>}
        </div>
    )
}
