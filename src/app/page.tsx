import LoanCalculator from "./calculator";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculator for Monzo flex (not an official product)',
  description: "Calculator application for Monzo flex. This is not an official Monzo product, and is not endorsed by them in any way."
}

export default function Home() {
  return (
    <>
      <div className="prose lg:prose-xl prose-h1:text-3xl mx-auto py-12 px-4">
        <h1>Loan Repayment Calculator for Monzo Flex</h1>
        <p className="underline">This is not an official Monzo product, and is not endorsed by them in any way.</p>
        <p>Noticed others are also searching for a flex calculator.</p>
        <p>As of today, my flex interest rate is 24% (and 0% if you pay within the first 3 months). Things could change anytime so please use the most current rate for the best estimates.</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 pb-24">
        <LoanCalculator />
      </div>
    </>
  );
}
