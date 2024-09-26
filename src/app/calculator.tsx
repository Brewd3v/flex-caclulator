"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export default function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(1000)
    const [interestRate, setInterestRate] = useState<number>(24)
    const [sharedCount, setSharedCount] = useState<number>(2)

    const calculateMonthlyPayment = (principal: number, rate: number, months: number) => {
        const monthlyRate = rate / 100 / 12
        return (
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)
        )
    }

    const repaymentPeriods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24]

    const paymentSchedule = useMemo(() => {
        return repaymentPeriods.map((months) => ({
            months,
            payment: calculateMonthlyPayment(loanAmount, interestRate, months),
        }))
    }, [loanAmount, interestRate])

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <Label className="font-semibold" htmlFor="loan-amount">Loan Amount (£)</Label>
                    <Input
                        id="loan-amount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                </div>
                <div>
                    <Label className="font-semibold" htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                        id="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                </div>
                <div>
                    <Label className="font-semibold" htmlFor="shared-count">Cost Shared</Label>
                    <Input
                        id="shared-count"
                        type="number"
                        value={sharedCount}
                        onChange={(e) => setSharedCount(Number(e.target.value))}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Repayment Period (Months)</TableHead>
                        <TableHead>Monthly Payment</TableHead>
                        <TableHead>Total Payment</TableHead>
                        <TableHead>Shared Payment ({sharedCount})</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paymentSchedule.map(({ months, payment }) => (
                        <TableRow
                            className={cn({
                                "bg-yellow-200": months === 18 || months === 24
                            })}
                            key={months}>
                            <TableCell className="text-left">{months}</TableCell>
                            <TableCell className="text-center">{payment.toLocaleString('en-US', { style: 'currency', currency: 'GBP' })}</TableCell>
                            <TableCell className="text-center">{(payment * months).toLocaleString('en-US', { style: 'currency', currency: 'GBP' })}</TableCell>
                            <TableCell className="text-center">{((payment)/sharedCount).toLocaleString('en-US', { style: 'currency', currency: 'GBP' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}