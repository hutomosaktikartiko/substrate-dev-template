"use client"

import { useEffect, useState } from "react"
import { usePolkadot } from "@/components/providers/polkadot-provider"
import { useWallet } from "@/components/providers/wallet-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function SubmitExtrinsicPage () {
    const { api } = usePolkadot()
    const { selectedAccount, signer } = useWallet()

    const [pallets, setPallets] = useState<string[]>([])
    const [methods, setMethods] = useState<string[]>([])
    const [selectedPallet, setSelectedPallet] = useState("")
    const [selectedMethod, setSelectedMethod] = useState("")
    const [params, setParams] = useState<string[]>([])
    const [result, setResult] = useState<string>("")

    useEffect(() => {
        if (!api) return
        const sectionList = Object.keys(api.tx)
        setPallets(sectionList)
    }, [api])

    useEffect(() => {
        if (!api || !selectedPallet) return
        const calls = Object.keys(api.tx[selectedPallet])
        setMethods(calls)
    }, [api, selectedPallet])

    const handleSubmit = async () => {
        if (!api || !selectedAccount || !signer) return
        try {
            const parsedParams = params.map(p => {
                try {
                    return JSON.parse(p)
                } catch {
                    return p
                }
            })

            const tx = api.tx[selectedPallet][selectedMethod](...parsedParams)

            const unsub = await tx.signAndSend(
                selectedAccount.address,
                { signer: signer },
                ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            const decoded = api.registry.findMetaError(dispatchError.asModule)
                            const { docs, name, section } = decoded
                            setResult(`❌ ${section}.${name}: ${docs.join(" ")}`)
                        } else {
                            setResult(`❌ ${dispatchError.toString()}`)
                        }
                    } else {
                        setResult(`✅ Status: ${status.type}`)
                    }

                    if (status.isFinalized || status.isInBlock) {
                        unsub()
                    }
                }
            )
        } catch (err) {
            toast.error("Extrinsic failed to submit")
            setResult(String(err))
        }
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold">📤 Submit Extrinsic</h1>

            <div className="space-y-4">
                <div>
                    <Label>Pallet</Label>
                    <Select onValueChange={setSelectedPallet}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Pallet" />
                        </SelectTrigger>
                        <SelectContent>
                            {pallets.map(pallet => (
                                <SelectItem key={pallet} value={pallet}>{pallet}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Method</Label>
                    <Select onValueChange={setSelectedMethod}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Method" />
                        </SelectTrigger>
                        <SelectContent>
                            {methods.map(method => (
                                <SelectItem key={method} value={method}>{method}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Parameters</Label>
                    {params.map((param, index) => (
                        <Input
                            key={index}
                            placeholder={`Param ${index + 1}`}
                            value={param}
                            onChange={e => {
                                const copy = [...params]
                                copy[index] = e.target.value
                                setParams(copy)
                            }}
                        />
                    ))}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setParams([...params, ""])}
                        >
                            + Add Parameter
                        </Button>
                        {params.length > 0 && (
                            <Button
                                variant="ghost"
                                onClick={() => setParams(params.slice(0, -1))}
                            >
                                - Remove
                            </Button>
                        )}
                    </div>
                </div>

                <Button onClick={handleSubmit}>Submit Extrinsic</Button>

                {result && (
                    <Textarea
                        value={result}
                        readOnly
                        className="bg-muted text-muted-foreground border border-border whitespace-pre-wrap"
                    />
                )}
            </div>
        </div>
    )
}
