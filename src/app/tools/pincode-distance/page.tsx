"use client";

import { useState } from "react";
import { calculateSLA } from "@/utils/pincodeSlaCalculator";

export default function PincodeDistancePage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (origin.length === 6 && destination.length === 6) {
      setResult(calculateSLA(origin, destination));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pincode Distance & Delivery SLA Calculator</h1>
      <div className="grid gap-4 max-w-md">
        <input
          type="text"
          placeholder="Origin Pincode"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Destination Pincode"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleCalculate} className="bg-blue-600 text-white p-2 rounded">
          Calculate
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 border rounded bg-slate-50">
          <h2 className="font-bold">Results:</h2>
          <p>Distance: {result.distance}</p>
          <p>Estimated SLA: {result.estimatedSla}</p>
        </div>
      )}
    </div>
  );
}
