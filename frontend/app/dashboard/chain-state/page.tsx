"use client"

import { usePolkadot } from "@/components/providers/polkadot-provider"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function ChainStatePage () {
    const { api, isConnected } = usePolkadot()
    const [pallets, setPallets] = useState<string[]>([])
    const [methods, setMethods] = useState<string[]>([])
    const [selectedPallet, setSelectedPallet] = useState("")
    const [selectedMethod, setSelectedMethod] = useState("")
    const [result, setResult] = useState<string | null>(null)

    useEffect(() => {
        if (!api || !isConnected) return
        const sectionNames = Object.keys(api.query)
        setPallets(sectionNames)
    }, [api, isConnected])

    useEffect(() => {
        if (!selectedPallet || !api?.query[selectedPallet]) {
            setMethods([])
            return
        }
        const methodNames = Object.keys(api.query[selectedPallet])
        setMethods(methodNames)
    }, [selectedPallet, api])

    const handleQuery = async () => {
        if (!selectedPallet || !selectedMethod || !api) return
        try {
            const result = await api.query[selectedPallet][selectedMethod]()
            const display = result?.toHuman?.() ?? result?.toString?.() ?? JSON.stringify(result)
            setResult(typeof display === "string" ? display : JSON.stringify(display))
        } catch (err) {
            setResult("❌ Error running query")
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">🔍 Query Chain State</h1>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="pallet">Pallet</Label>
                    <Select onValueChange={setSelectedPallet}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select pallet" />
                        </SelectTrigger>
                        <SelectContent>
                            {pallets.map((pallet) => (
                                <SelectItem key={pallet} value={pallet}>
                                    {pallet}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="method">Method</Label>
                    <Select onValueChange={setSelectedMethod} disabled={!selectedPallet}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                            {methods.map((method) => (
                                <SelectItem key={method} value={method}>
                                    {method}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleQuery} disabled={!selectedPallet || !selectedMethod}>
                    Run Query
                </Button>

                {result && (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap">
                        {result}
                    </pre>
                )}
            </div>
        </div>
    )
}
