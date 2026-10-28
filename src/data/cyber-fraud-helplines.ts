export interface BankEmergencyInfo {
  bankName: string;
  slug: string;
  tollFreeFraudNumbers: string[];
  smsBlockFormat: string;
  missedCallOrUpiBlockInfo: string;
  fraudReportPortal: string;
}

export interface ScamPlaybook {
  id: string;
  title: string;
  category: string;
  riskLevel: "Critical" | "High" | "Medium";
  immediateActions: string[];
  recoveryProbability: string;
}

export const NATIONAL_HELPLINES = {
  cyberHelpLine: "1930",
  officialPortal: "https://cybercrime.gov.in",
  rbiOmbudsmanPortal: "https://cms.rbi.org.in",
  sancharSaathiPortal: "https://sancharsaathi.gov.in",
};

export const BANK_EMERGENCY_DIRECTORY: BankEmergencyInfo[] = [
  {
    bankName: "State Bank of India (SBI)",
    slug: "sbi",
    tollFreeFraudNumbers: ["1800-1234", "1800-11-2211", "080-26599990"],
    smsBlockFormat: "BLOCK <CUST_ID or CARD_LAST_4> to 567676",
    missedCallOrUpiBlockInfo: "Call YONO Helpline 1800-1111 or block via YONO App instantly.",
    fraudReportPortal: "https://www.onlinesbi.sbi",
  },
  {
    bankName: "HDFC Bank",
    slug: "hdfc",
    tollFreeFraudNumbers: ["1800-258-6161", "022-61606160"],
    smsBlockFormat: "BLOCK <CARD_LAST_4> to 5676712",
    missedCallOrUpiBlockInfo: "NetBanking -> Cards/UPI -> Hotlisting / Instant Block.",
    fraudReportPortal: "https://www.hdfcbank.com",
  },
  {
    bankName: "ICICI Bank",
    slug: "icici",
    tollFreeFraudNumbers: ["1800-266-2", "022-33667777"],
    smsBlockFormat: "BLOCK <CARD_LAST_4> to 5676766",
    missedCallOrUpiBlockInfo: "iMobile Pay App -> Services -> Block Card / UPI.",
    fraudReportPortal: "https://www.icicibank.com",
  },
  {
    bankName: "Punjab National Bank (PNB)",
    slug: "pnb",
    tollFreeFraudNumbers: ["1800-180-2222", "1800-103-2222", "0120-2490000"],
    smsBlockFormat: "BLOCK <CARD_LAST_4> to 5607040",
    missedCallOrUpiBlockInfo: "PNB ONE App -> Debit Card / UPI Emergency Block.",
    fraudReportPortal: "https://www.pnbindia.in",
  },
  {
    bankName: "Bank of Baroda (BOB)",
    slug: "bob",
    tollFreeFraudNumbers: ["1800-5700", "1800-258-4455"],
    smsBlockFormat: "BLOCK <CARD_LAST_4> to 8422009988",
    missedCallOrUpiBlockInfo: "Baroda World App -> Emergency Hotlist.",
    fraudReportPortal: "https://www.bankofbaroda.in",
  },
  {
    bankName: "Axis Bank",
    slug: "axis",
    tollFreeFraudNumbers: ["1800-419-5955", "022-67987700"],
    smsBlockFormat: "BLOCK <CARD_LAST_4> to 56161600",
    missedCallOrUpiBlockInfo: "Axis Mobile App -> Security -> Emergency Block.",
    fraudReportPortal: "https://www.axisbank.com",
  },
  {
    bankName: "Kotak Mahindra Bank",
    slug: "kotak",
    tollFreeFraudNumbers: ["1800-209-0000", "022-66006022"],
    smsBlockFormat: "KOTAKCC <CARD_LAST_4> to 5676788",
    missedCallOrUpiBlockInfo: "Kotak Mobile Banking -> Service Requests -> Block.",
    fraudReportPortal: "https://www.kotak.com",
  },
  {
    bankName: "Canara Bank",
    slug: "canara",
    tollFreeFraudNumbers: ["1800-1030", "1800-425-0018"],
    smsBlockFormat: "CANARES <CARD_LAST_4> to 5607060",
    missedCallOrUpiBlockInfo: "Canara ai1 App -> Hotlist Debit Card.",
    fraudReportPortal: "https://canarabank.com",
  },
  {
    bankName: "Union Bank of India",
    slug: "union",
    tollFreeFraudNumbers: ["1800-22-2244", "1800-208-2244"],
    smsBlockFormat: "UBI <CARD_LAST_4> to 56767",
    missedCallOrUpiBlockInfo: "Union Vyom App -> Emergency Block.",
    fraudReportPortal: "https://www.unionbankofindia.co.in",
  },
  {
    bankName: "IndusInd Bank",
    slug: "indusind",
    tollFreeFraudNumbers: ["1800-209-3277", "022-44066666"],
    smsBlockFormat: "INDUSBLOCK <CARD_LAST_4> to 5676757",
    missedCallOrUpiBlockInfo: "IndusMobile App -> Instant Card Block.",
    fraudReportPortal: "https://www.indusind.com",
  },
  {
    bankName: "IDFC FIRST Bank",
    slug: "idfc",
    tollFreeFraudNumbers: ["1800-419-4332"],
    smsBlockFormat: "BLOCK <CARD_LAST_4> to 5676732",
    missedCallOrUpiBlockInfo: "IDFC FIRST Mobile App -> Report Fraud / Block.",
    fraudReportPortal: "https://www.idfcfirstbank.com",
  },
  {
    bankName: "Yes Bank",
    slug: "yes",
    tollFreeFraudNumbers: ["1800-1200", "022-50391200"],
    smsBlockFormat: "HELP <CARD_LAST_4> to 567679",
    missedCallOrUpiBlockInfo: "Yes Mobile App -> Service -> Card Control.",
    fraudReportPortal: "https://www.yesbank.in",
  },
  {
    bankName: "Indian Bank",
    slug: "indian",
    tollFreeFraudNumbers: ["1800-4250-0000"],
    smsBlockFormat: "INDSCAN <CARD_LAST_4> to 56767",
    missedCallOrUpiBlockInfo: "IndOASIS App -> Emergency Block.",
    fraudReportPortal: "https://www.indianbank.in",
  },
  {
    bankName: "Bank of India",
    slug: "boi",
    tollFreeFraudNumbers: ["1800-220-229", "022-40919191"],
    smsBlockFormat: "BOICARD <CARD_LAST_4> to 567676",
    missedCallOrUpiBlockInfo: "BOI Mobile Star App -> Hotlisting.",
    fraudReportPortal: "https://www.bankofindia.co.in",
  },
  {
    bankName: "Federal Bank",
    slug: "federal",
    tollFreeFraudNumbers: ["1800-425-1199", "0484-2630994"],
    smsBlockFormat: "FEDBLK <CARD_LAST_4> to 5676762",
    missedCallOrUpiBlockInfo: "FedNet / FedMobile -> Card Block.",
    fraudReportPortal: "https://www.federalbank.co.in",
  },
];

export const RBI_LIABILITY_MATRIX = [
  {
    delay: "Within 3 Working Days (Golden Window)",
    liability: "Zero Liability (₹0)",
    conditions: "Third-party breach where deficiency lies neither with the bank nor with the customer, and customer notifies bank within 3 working days.",
    shadowCreditTimeline: "T+10 Working Days mandatory credit to account.",
  },
  {
    delay: "4 to 7 Working Days",
    liability: "Limited Liability (₹5,000 to ₹25,000)",
    conditions: "Liability capped at basic savings account ceiling (₹10,000) or current/credit card ceiling (₹25,000) when reported between 4th and 7th day.",
    shadowCreditTimeline: "Credited within T+10 working days post investigation.",
  },
  {
    delay: "Beyond 7 Working Days",
    liability: "Bank Board Approved Policy",
    conditions: "Customer bears full loss beyond stipulated reporting days as per individual bank board guidelines unless contributory negligence by bank is proven.",
    shadowCreditTimeline: "Subject to internal fraud investigation outcome.",
  },
];

export const SCAM_PLAYBOOKS: ScamPlaybook[] = [
  {
    id: "upi-collect",
    title: "UPI / QR Code / Collect Request Scam",
    category: "UPI Fraud",
    riskLevel: "High",
    immediateActions: [
      "Open your UPI App (GPay, PhonePe, Paytm) and immediately change your UPI PIN.",
      "Check if any unauthorized Autopay or Mandate is active and revoke it.",
      "Call 1930 to freeze the beneficiary VPA/handle.",
    ],
    recoveryProbability: "Very High if reported within 2 hours.",
  },
  {
    id: "apk-malware",
    title: "NetBanking / Phishing / Remote APK Malware (AnyDesk/TeamViewer)",
    category: "Malware & Screen Sharing",
    riskLevel: "Critical",
    immediateActions: [
      "Immediately turn ON Airplane Mode to sever remote hacker connection.",
      "Power OFF the device or factory reset if a malicious APK was installed.",
      "Call your home bank emergency hotline to freeze NetBanking and Debit Cards.",
    ],
    recoveryProbability: "High if lien is placed before fund layering.",
  },
  {
    id: "investment-telegram",
    title: "Fake Investment / Part-Time Task / Telegram Scam",
    category: "Investment Fraud",
    riskLevel: "Critical",
    immediateActions: [
      "Stop transferring additional funds ('tax fee' or 'unlock charges' are extortion traps).",
      "Save all WhatsApp/Telegram chat exports, transaction slips, and bank statements.",
      "File NCRP complaint on cybercrime.gov.in with exact UTR numbers.",
    ],
    recoveryProbability: "Moderate (Depends on police freezing mule accounts).",
  },
  {
    id: "digital-arrest",
    title: "Digital Arrest / Fake CBI, Customs & Narcotics Extortion",
    category: "Extortion Scam",
    riskLevel: "Critical",
    immediateActions: [
      "Disconnect video call immediately. Real law enforcement never conducts arrests over Skype/WhatsApp video.",
      "Do not transfer any money to 'Supreme Court' or 'RBI verification' accounts.",
      "Dial 1930 and local police station to report intimidation.",
    ],
    recoveryProbability: "High if stopped before wire transfer completes.",
  },
  {
    id: "card-unauthorized",
    title: "Credit / Debit Card International / Tap-and-Pay Fraud",
    category: "Card Skimming",
    riskLevel: "High",
    immediateActions: [
      "Disable International usage, eCommerce, and Tap-and-Pay via your banking app.",
      "Hotlist and permanently block the compromised card.",
      "Raise formal chargeback dispute with bank within 3 days.",
    ],
    recoveryProbability: "Absolute Zero Liability if reported within 3 days.",
  },
];
