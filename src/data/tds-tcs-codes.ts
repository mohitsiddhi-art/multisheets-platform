export interface TdsTcsItem {
  section: string;
  category: 'TDS' | 'TCS';
  natureOfPayment: string;
  thresholdLimit: string;
  rateIndividual: string;
  rateCompany: string;
  dueDate: string;
  description: string;
}

export const tdsTcsDatabase: TdsTcsItem[] = [
  {
    section: "194C",
    category: "TDS",
    natureOfPayment: "Payments to Contractors & Sub-Contractors",
    thresholdLimit: "₹30,000 for single invoice or ₹1,00,000 in aggregate per FY",
    rateIndividual: "1%",
    rateCompany: "2%",
    dueDate: "Deposit by 7th of next month (March by 30th April). Quarterly Return: Form 26Q",
    description: "Applies to advertising, transport, catering, manufacturing or supplying goods according to customer specifications using customer materials."
  },
  {
    section: "194J",
    category: "TDS",
    natureOfPayment: "Fees for Professional or Technical Services (FTS)",
    thresholdLimit: "₹30,000 per financial year",
    rateIndividual: "2% (for technical/royalty) / 10% (professional)",
    rateCompany: "2% (technical) / 10% (professional)",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Applies to lawyers, doctors, engineers, architects, interior decorators, consultants, and technical service fees."
  },
  {
    section: "194I",
    category: "TDS",
    natureOfPayment: "Rent (Land, Building, Furniture, or Fixtures)",
    thresholdLimit: "₹2,40,000 per financial year",
    rateIndividual: "10%",
    rateCompany: "10% (Land/Building) / 2% (Plant & Machinery)",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Applies to rent paid for commercial or residential buildings, plant, machinery, or equipment."
  },
  {
    section: "194Q",
    category: "TDS",
    natureOfPayment: "Purchase of Goods (Buyer Turnover > ₹10 Crores)",
    thresholdLimit: "₹50,00,000 aggregate purchases from a single seller in FY",
    rateIndividual: "0.1%",
    rateCompany: "0.1%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Deducted by buyer whose turnover exceeds ₹10Cr when aggregate purchase of goods from a resident seller exceeds ₹50L."
  },
  {
    section: "194H",
    category: "TDS",
    natureOfPayment: "Commission or Brokerage",
    thresholdLimit: "₹15,000 per financial year",
    rateIndividual: "5%",
    rateCompany: "5%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Applies to any commission or brokerage paid to an agent, broker, or distributor for services rendered (other than insurance commission)."
  },
  {
    section: "194A",
    category: "TDS",
    natureOfPayment: "Interest other than Interest on Securities",
    thresholdLimit: "₹40,000 (₹50,000 for senior citizens) for banks/POs; ₹5,000 for others",
    rateIndividual: "10%",
    rateCompany: "10%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Applies to interest paid on loans, deposits, and non-security financial instruments."
  },
  {
    section: "194R",
    category: "TDS",
    natureOfPayment: "Perquisites / Benefits of Business or Profession",
    thresholdLimit: "₹20,000 aggregate value in a financial year",
    rateIndividual: "10%",
    rateCompany: "10%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Deducted on providing any benefit or perquisite (free cars, sponsored foreign trips, gift items) arising from business or profession."
  },
  {
    section: "194-O",
    category: "TDS",
    natureOfPayment: "Payment by E-Commerce Operator to E-Commerce Participant",
    thresholdLimit: "₹5,00,000 for individuals/HUF with PAN; No limit if no PAN",
    rateIndividual: "1%",
    rateCompany: "1%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Deducted by digital platforms (Amazon, Flipkart, Shopify aggregators) when facilitating sale of goods or services of participants."
  },
  {
    section: "194DA",
    category: "TDS",
    natureOfPayment: "Payment in respect of Life Insurance Policy",
    thresholdLimit: "₹1,00,000 in a financial year",
    rateIndividual: "5% (on income component)",
    rateCompany: "5% (on income component)",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 26Q",
    description: "Applies to maturity or surrender value of life insurance policies not exempt under Section 10(10D)."
  },
  {
    section: "194IB",
    category: "TDS",
    natureOfPayment: "Rent by Individuals or HUF (Not subject to tax audit)",
    thresholdLimit: "₹50,000 per month or part month",
    rateIndividual: "5%",
    rateCompany: "Not Applicable",
    dueDate: "Within 30 days from end of month in Form 26QC",
    description: "One-time annual or monthly deduction by individuals/HUF paying high rent without tax audit obligation."
  },
  {
    section: "192",
    category: "TDS",
    natureOfPayment: "Salary Payments to Employees",
    thresholdLimit: "Exceeding basic exemption limit (₹2.5L to ₹3L+ depending on tax regime)",
    rateIndividual: "Average Slab Rate",
    rateCompany: "Not Applicable",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 24Q",
    description: "Standard employer withholding tax on employee salary income based on declared investments and tax regime."
  },
  {
    section: "206C(1H)",
    category: "TCS",
    natureOfPayment: "Sale of Goods (Seller Turnover > ₹10 Crores)",
    thresholdLimit: "₹50,00,000 aggregate sale to a buyer in FY",
    rateIndividual: "0.1%",
    rateCompany: "0.1%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 27EQ",
    description: "Collected by seller whose turnover exceeded ₹10Cr in preceding FY when sale consideration from a buyer exceeds ₹50L."
  },
  {
    section: "206C(1G)",
    category: "TCS",
    natureOfPayment: "Liberalised Remittance Scheme (LRS) & Overseas Tour Packages",
    thresholdLimit: "₹7,00,000 threshold for LRS; 0% to 20% slabs",
    rateIndividual: "2% to 20%",
    rateCompany: "2% to 20%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 27EQ",
    description: "Collected by Authorized Dealers on foreign remittances under LRS and tour operators on overseas travel packages."
  },
  {
    section: "206C(1)",
    category: "TCS",
    natureOfPayment: "Sale of Scrap, Alcoholic Liquor, Timber, Tendu Leaves",
    thresholdLimit: "No basic threshold limit",
    rateIndividual: "1% to 5% (Scrap: 1%, Liquor: 1%)",
    rateCompany: "1% to 5%",
    dueDate: "Deposit by 7th of next month. Quarterly Return: Form 27EQ",
    description: "Collected at source by specified businesses dealing in scrap metal, forest produce, and alcoholic beverages."
  }
];
