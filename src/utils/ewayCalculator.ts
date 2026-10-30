export interface EWayCalculationResult {
  distanceKm: number;
  cargoType: 'regular' | 'overdimensional';
  validityDays: number;
  expiresAtSummary: string;
  isExpiredSoon: boolean;
  ruleReference: string;
  penaltyWarning: string;
}

export function calculateEWayValidity(
  distanceKm: number,
  cargoType: 'regular' | 'overdimensional',
  dispatchDateStr: string = new Date().toISOString()
): EWayCalculationResult {
  // CGST Rule 138(10) E-Way Bill Validity:
  // - Regular cargo: 1 valid day for every 200 km or part thereof
  // - Over-dimensional cargo: 1 valid day for every 20 km or part thereof
  const kmPerDay = cargoType === 'overdimensional' ? 20 : 200;
  const validityDays = Math.max(1, Math.ceil(distanceKm / kmPerDay));

  const dispatchDate = new Date(dispatchDateStr);
  const expiryDate = new Date(dispatchDate);
  expiryDate.setDate(dispatchDate.getDate() + validityDays);

  return {
    distanceKm,
    cargoType,
    validityDays,
    expiresAtSummary: expiryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    isExpiredSoon: false,
    ruleReference: "CGST Rule 138(10) & Notification No. 31/2019-Central Tax",
    penaltyWarning: "Under Section 129 of CGST Act, transporting goods without valid e-way bill attracts detention, seizure, and penalty equal to 200% of tax or 50% of value of goods."
  };
}
