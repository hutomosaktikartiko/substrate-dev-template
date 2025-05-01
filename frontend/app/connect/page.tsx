"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePolkadot } from "@/components/providers/polkadot-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConnectPage () {
    const { isConnected, rpcUrl, setRpcUrl } = usePolkadot()
    const [urlInput, setUrlInput] = useState(rpcUrl || "")
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
        <div className="flex items-center justify-center min-h-screen bg-muted">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle>Connect to Polkadot RPC</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="rpc-url">RPC WebSocket URL</Label>
                            <Input
                                id="rpc-url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="wss://rpc.polkadot.io"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Connect
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
