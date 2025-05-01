"use client"

import { usePolkadot } from "@/components/providers/polkadot-provider"
import { useEffect, useState } from "react"

export default function DashboardPage () {
    const { api, isConnected } = usePolkadot()
    const [info, setInfo] = useState<{
        chain?: string
        nodeName?: string
        nodeVersion?: string
        genesisHash?: string
    }>({})

    useEffect(() => {
        if (!api || !isConnected) return

        const fetchInfo = async () => {
            try {
                const chain = await api.rpc.system.chain()
                const nodeName = await api.rpc.system.name()
                const nodeVersion = await api.rpc.system.version()
                const genesisHash = api.genesisHash.toHex()

                setInfo({
                    chain: chain.toString(),
                    nodeName: nodeName.toString(),
                    nodeVersion: nodeVersion.toString(),
                    genesisHash,
                })
            } catch (error) {
                console.log("Failed to fetch chain info")
            }
        }

        fetchInfo()
    }, [api, isConnected])

    if (!isConnected) {
        return <p>🔌RPC not connected...</p>
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">📡 Connected RPC</h1>
            <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Chain:</strong> {info.chain}</li>
                <li><strong>Node:</strong> {info.nodeName}</li>
                <li><strong>Version:</strong> {info.nodeVersion}</li>
                <li><strong>Genesis Hash:</strong> {info.genesisHash}</li>
            </ul>
        </div>
    )
}
