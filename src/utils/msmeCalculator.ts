export interface MsmeCalculationResult {
  principalAmount: number;
  buyerType: 'micro' | 'small' | 'medium';
  agreementType: 'with_agreement' | 'without_agreement';
  maxCreditDays: number;
  invoiceDate: string;
  dueDate: string;
  delayDays: number;
  rbiBankRate: number; // e.g. 6.5% repo rate
  statutoryInterestRate: number; // 3x RBI bank rate compounded monthly
  simpleInterestAmount: number;
  compoundInterestAmount: number;
  totalPayableAmount: number;
  isEligibleForSamadhan: boolean;
  sectionReference: string;
}

export function calculateMsmeInterest(
  principalAmount: number,
  buyerType: 'micro' | 'small' | 'medium',
  agreementType: 'with_agreement' | 'without_agreement',
  agreedDays: number,
  invoiceDateStr: string,
  rbiRepoRate: number = 6.5
): MsmeCalculationResult {
  // MSMED Act 2006 Section 15 & 16 rules:
  // - Max credit period without agreement: 15 days
  // - Max credit period with written agreement: 45 days (cannot exceed 45 days)
  let maxCreditDays = 15;
  if (agreementType === 'with_agreement') {
    maxCreditDays = Math.min(Math.max(agreedDays, 1), 45);
  }

  const invoiceDate = new Date(invoiceDateStr);
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(invoiceDate.getDate() + maxCreditDays);

  const today = new Date();
  const diffTime = today.getTime() - dueDate.getTime();
  const delayDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  // Statutory rate: Three times the bank rate notified by RBI (compounded with monthly rests)
  const statutoryInterestRate = rbiRepoRate * 3; // e.g. 19.5% per annum
  const monthlyRate = statutoryInterestRate / 100 / 12;

  let compoundInterestAmount = 0;
  if (delayDays > 0 && principalAmount > 0) {
    const months = delayDays / 30.4375;
    compoundInterestAmount = principalAmount * Math.pow(1 + monthlyRate, months) - principalAmount;
  }

  const simpleInterestAmount = (principalAmount * statutoryInterestRate * (delayDays / 365)) / 100;

  const totalPayableAmount = principalAmount + compoundInterestAmount;
  const isEligibleForSamadhan = delayDays > 0 && principalAmount > 0;

  return {
    principalAmount,
    buyerType,
    agreementType,
    maxCreditDays,
    invoiceDate: invoiceDateStr,
    dueDate: dueDate.toISOString().split('T')[0],
    delayDays,
    rbiBankRate: rbiRepoRate,
    statutoryInterestRate,
    simpleInterestAmount: Math.round(simpleInterestAmount * 100) / 100,
    compoundInterestAmount: Math.round(compoundInterestAmount * 100) / 100,
    totalPayableAmount: Math.round(totalPayableAmount * 100) / 100,
    isEligibleForSamadhan,
    sectionReference: "MSMED Act 2006, Section 16 (Compound interest at 3 times RBI Bank Rate) & Income Tax Sec 43B(h)"
  };
}
