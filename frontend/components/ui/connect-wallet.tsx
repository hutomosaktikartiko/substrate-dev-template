"use client"

import { useWallet } from "../providers/wallet-provider"
import { Button } from "./button"

export function ConnectWallet () {
    const { connectWallet } = useWallet()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Button onClick={connectWallet}>
                Connect Wallet
            </Button>
        </div>
    )
}