export const guides = [
  {
    slug: "rbi-positive-pay-system-guide",
    title: "RBI Positive Pay System (PPS): Rules, Mandatory Limits & Bank-wise Confirmation Formats",
    description: "Understand the RBI security mechanism for high-value cheques to prevent fraud and clearing bounce.",
    content: `
<p>The Reserve Bank of India introduced the Positive Pay System (PPS) to secure high-value cheque transactions. If you are issuing a cheque for ₹50,000 or more, your bank may request additional confirmation. Above ₹5 Lakh, this confirmation is mandatory for cheque clearing.</p>

<h3>Why Banks Need Confirmation</h3>
<p>High-value cheques are susceptible to tampering—altering the payee name, modifying the amount, or forging signatures. When you submit a PPS confirmation, the bank cross-verifies the cheque details against your provided data. If there is a mismatch (e.g., date error, spelling mistake in payee, or amount variance), the cheque is returned rather than cleared.</p>

<h3>Mandatory Details for PPS</h3>
<p>You must provide:</p>
<ul>
  <li>Cheque Number (6 digits)</li>
  <li>Cheque Date</li>
  <li>Payee Name (Exact spelling matters)</li>
  <li>Amount</li>
</ul>

<h3>How to Confirm</h3>
<p>Most banks (SBI, PNB, HDFC, ICICI, Kotak) allow PPS submission via:</p>
<ul>
  <li>Netbanking/Mobile Banking App</li>
  <li>SMS</li>
  <li>Bank Branch (Counter submission)</li>
</ul>
<p>For SMS, banks usually require specific formats like: <code>PPS <ChequeNumber> <Date> <PayeeName> <Amount></code> sent to their official service number.</p>

<div class="rounded-xl bg-amber-50 p-6 border border-amber-200 mt-8">
  <h4 class="font-bold text-amber-900">Need a format draft?</h4>
  <p class="text-sm text-amber-800 mt-2">Use our live PPS utility to generate the exact confirmation text required by your bank.</p>
  <a href="/tools/pps-cheque" class="inline-block mt-4 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700">Generate RBI-standard Positive Pay Slip & Words Format</a>
</div>
`
  },
  {
    slug: "india-post-speed-post-charges-guide",
    title: "India Post Speed Post vs Registered Post: Weight Slabs, Tariff Breakdown & Delivery SLAs",
    description: "Clear up the confusion between Speed Post and Registered Post with our tariff and SLA guide.",
    content: `
<p>Shipping documents or parcels via India Post often leads to confusion between Speed Post and Registered Post. Both are reliable, but serve different operational purposes.</p>

<h3>Speed Post: The Time-Bound Courier</h3>
<p>Speed Post is a premium, time-bound service. It uses a barcode-tracked logistics chain, prioritising speed. You pay more for the faster transit time and reliability of the tracked network. Ideal for urgent applications, sensitive documents, and commercial dispatch.</p>

<h3>Registered Post: The Legal Proof</h3>
<p>Registered Post is designed for legal and official reliability. It may take longer than Speed Post, but every handling point is documented. It acts as legal evidence that a specific document was delivered to the recipient. Crucial for court summons, landlord notices, or official government correspondence.</p>

<h3>Tariff Structure</h3>
<p>India Post tariffs depend on three factors:</p>
<ul>
  <li><strong>Weight Slab:</strong> Starts at 50g, progressing through 200g, 500g, and beyond.</li>
  <li><strong>Distance:</strong> Local, within 200km, up to 1000km, etc.</li>
  <li><strong>GST:</strong> An additional 18% service tax applies on the base tariff.</li>
</ul>

<div class="rounded-xl bg-teal-50 p-6 border border-teal-200 mt-8">
  <h4 class="font-bold text-teal-900">Calculate your shipping charges</h4>
  <p class="text-sm text-teal-800 mt-2">Get an accurate tariff estimation including GST and print your own dispatch slip.</p>
  <a href="/tools/speedpost-calculator" class="inline-block mt-4 px-4 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700">Calculate Speed Post Tariff & Print Dispatch Slip</a>
</div>
`
  },
  {
    slug: "verify-bank-ifsc-micr-code-guide",
    title: "How to Verify Bank IFSC & MICR Codes: Preventing NEFT, RTGS & IMPS Transfer Rejections",
    description: "An essential guide to verifying bank codes and understanding the post-merger landscape.",
    content: `
<p>An incorrect IFSC code is the primary reason for failed NEFT, RTGS, or IMPS transactions. Understanding what these codes mean helps you catch errors before you hit 'send'.</p>

<h3>The Anatomy of an IFSC Code</h3>
<p>An IFSC (Indian Financial System Code) is an 11-character alphanumeric string that identifies a specific bank branch. It is structured as:</p>
<ul>
  <li><strong>First 4 characters:</strong> Bank Identifier (e.g., SBIN for SBI).</li>
  <li><strong>5th character:</strong> Always '0' (Reserved for future use).</li>
  <li><strong>Last 6 characters:</strong> Branch Identifier.</li>
</ul>

<h3>The Impact of Bank Mergers</h3>
<p>Bank mergers have invalidated thousands of old IFSC codes. For instance, if you still use an Allahabad Bank IFSC for an account now under Indian Bank, your transaction will bounce. Always re-verify the IFSC code if you haven't transferred funds to a particular account in the last six months.</p>

<h3>MICR vs. IFSC</h3>
<p>MICR (Magnetic Ink Character Recognition) is a 9-digit code used primarily for cheque clearing. While IFSC facilitates electronic transfers (NEFT/RTGS), MICR is used by bank machines to process physical cheques. They are not interchangeable.</p>

<div class="rounded-xl bg-sky-50 p-6 border border-sky-200 mt-8">
  <h4 class="font-bold text-sky-900">Need to find an active branch IFSC?</h4>
  <p class="text-sm text-sky-800 mt-2">Lookup the latest active branch records to prevent transfer rejections.</p>
  <a href="/ifsc" class="inline-block mt-4 px-4 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700">Lookup Active Branch IFSC Records</a>
</div>
`
  }
];
