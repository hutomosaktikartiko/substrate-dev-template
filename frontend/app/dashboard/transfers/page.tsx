"use client"

import React, { useState, useEffect } from "react"
import { usePolkadot } from "@/components/providers/polkadot-provider"
import { useWallet } from "@/components/providers/wallet-provider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { FormDescription } from "@/components/ui/form"
import { Keyring } from "@polkadot/api"
import { web3FromAddress, web3FromSource } from "@polkadot/extension-dapp"

export default function TransferPage () {
    const { selectedAccount, accounts } = useWallet()
    const { api, isConnected } = usePolkadot()
    const [selectedAccountAddress, setSelectedAccountAddress] = useState<string | undefined>(selectedAccount?.address)
    const [recipient, setRecipient] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [balance, setBalance] = useState<number>(0)

    useEffect(() => {
        if (selectedAccount && api && isConnected) {
            const fetchBalance = async () => {
                try {
                    // Mengakses data akun dan memanggil toJSON()
                    const accountInfo = await api.query.system.account(selectedAccount.address)

                    // Menggunakan destructuring untuk mengakses data.free
                    const json = accountInfo.toJSON() as any

                    if (json && json.data && json.data.free) {
                        const freeBalance = json.data.free

                        // Mengonversi freeBalance ke BigInt dan kemudian ke number (Planck -> DOT)
                        setBalance(Number(BigInt(freeBalance.toString()) / BigInt(10 ** 12)))
                    } else {
                        console.log("Data is missing in accountInfo.")
                    }
                } catch (error) {
                    console.log("Failed to fetch balance")
                }
            }
            fetchBalance()
        }
    }, [selectedAccount, api, isConnected])

    const handleTransfer = async () => {
        if (!api || !selectedAccountAddress || !recipient) return

        const transferAmount = BigInt(amount) * BigInt(10 ** (api.registry.chainDecimals[0] || 12));
        if (transferAmount <= 0) return

        try {
            setStatus("Pending...");

            const transfer = api.tx.balances.transferAllowDeath(recipient, transferAmount);

            const injector = await web3FromAddress(selectedAccountAddress);
            const hash = await transfer.signAndSend(selectedAccountAddress, { signer: injector.signer });

            setStatus(`Transfer sent with hash: ${hash.toHex()}`);
            toast.success("Transfer Successful", {
                description: `Hash: ${hash.toHex()}`
            });
        } catch (error) {
            console.error("Transfer failed:", error);
            setStatus("Transaction failed");
            toast.error("Error", {
                description: "Transaction failed, please check the console for details.",
            });
        }
    }

    if (!isConnected) {
        return <div className="p-4">Not connected to Polkadot network...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Transfer Funds</h1>

            <div className="space-y-4">
                <Label>From Account</Label>
                <Select
                    value={selectedAccountAddress}
                    onValueChange={setSelectedAccountAddress}
                >
                    <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white">
                        <SelectValue placeholder="Select From Account" />
                    </SelectTrigger>
                    <SelectContent>
                        {accounts.map((account) => (
                            <SelectItem key={account.address} value={account.address}>
                                {account.meta.name} - {account.address}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p
                    data-slot="form-description"
                    className="text-muted-foreground text-sm"
                >Balance {balance} DOT</p>

                <div className="space-y-2">
                    <Label>To Account</Label>
                    <Input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Recipient Address"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount to Transfer"
                    />
                </div>

                <Button onClick={handleTransfer} disabled={status === "Pending..."}>
                    {status === "Pending..." ? "Processing..." : "Submit Transfer"}
                </Button>

                {status && (
                    <div className="mt-4 text-sm text-gray-700">
                        <strong>Status: </strong>
                        {status}
                    </div>
                )}
            </div>
        </div>
    )
}
