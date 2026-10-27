export interface GstHsnItem {
  code: string;
  type: 'HSN' | 'SAC';
  category: string;
  description: string;
  gstRate: number; // 0, 5, 12, 18, 28
  effectiveCess: string;
}

export const GST_HSN_DATASET: GstHsnItem[] = [
  // Postal, Courier & Logistics
  { code: "996811", type: "SAC", category: "Courier & Logistics", description: "Postal and courier services for letters, parcels, and documents", gstRate: 18, effectiveCess: "0%" },
  { code: "996812", type: "SAC", category: "Courier & Logistics", description: "Multi-modal freight transport, express cargo dispatch and handling", gstRate: 18, effectiveCess: "0%" },
  { code: "996813", type: "SAC", category: "Courier & Logistics", description: "E-commerce fulfillment, last-mile delivery and reverse logistics services", gstRate: 18, effectiveCess: "0%" },
  { code: "996511", type: "SAC", category: "Courier & Logistics", description: "Road transport services of goods by commercial truck or carrier", gstRate: 5, effectiveCess: "0%" },

  // Banking & Financial Services
  { code: "997111", type: "SAC", category: "Banking & Financial", description: "Financial intermediation, bank account operations, deposits and lending", gstRate: 18, effectiveCess: "0%" },
  { code: "997112", type: "SAC", category: "Banking & Financial", description: "NEFT, RTGS, IMPS fund transfer clearing and payment gateway services", gstRate: 18, effectiveCess: "0%" },
  { code: "997119", type: "SAC", category: "Banking & Financial", description: "Other financial services including forex, bank guarantees and letters of credit", gstRate: 18, effectiveCess: "0%" },

  // Packaging, Corrugated Boxes & Sheets
  { code: "4819", type: "HSN", category: "Packaging & Boxes", description: "Cartons, boxes, cases, bags and other packing containers of paper or corrugated board", gstRate: 12, effectiveCess: "0%" },
  { code: "4821", type: "HSN", category: "Packaging & Boxes", description: "Paper or paperboard labels of all kinds, whether or not printed (barcode/shipping labels)", gstRate: 18, effectiveCess: "0%" },
  { code: "3923", type: "HSN", category: "Packaging & Boxes", description: "Articles for the conveyance or packing of goods, of plastics (stretch film, bubble wrap, poly bags)", gstRate: 18, effectiveCess: "0%" },

  // Paper, Printing & Stationery
  { code: "4802", type: "HSN", category: "Paper & Stationery", description: "Uncoated paper and paperboard for writing, printing or other graphic purposes (A4 paper reams)", gstRate: 12, effectiveCess: "0%" },
  { code: "4901", type: "HSN", category: "Paper & Stationery", description: "Printed books, brochures, leaflets, directories, and educational publications", gstRate: 0, effectiveCess: "0%" },
  { code: "4911", type: "HSN", category: "Paper & Stationery", description: "Other printed matter including printed pictures, photographs, calendars and posters", gstRate: 12, effectiveCess: "0%" },
  { code: "3926", type: "HSN", category: "Paper & Stationery", description: "Office plastic stationery items, folders, binders, and desk accessories", gstRate: 18, effectiveCess: "0%" },

  // Metals, G.I. Sheets, Coils & Profiles
  { code: "7210", type: "HSN", category: "Metals & Industrial", description: "Flat-rolled products of iron or non-alloy steel, clad, plated or coated (G.I. sheets)", gstRate: 18, effectiveCess: "0%" },
  { code: "7212", type: "HSN", category: "Metals & Industrial", description: "Flat-rolled products of iron or steel, painted, varnished or coated with plastics", gstRate: 18, effectiveCess: "0%" },
  { code: "7308", type: "HSN", category: "Metals & Industrial", description: "Structures and parts of structures (bridges, towers, roofing profiles, metal frames) of iron/steel", gstRate: 18, effectiveCess: "0%" },

  // Electronics, Computing & Office Equipment
  { code: "8471", type: "HSN", category: "Electronics & IT", description: "Automatic data processing machines (laptops, desktop computers, servers, units)", gstRate: 18, effectiveCess: "0%" },
  { code: "8528", type: "HSN", category: "Electronics & IT", description: "Monitors and projectors, not incorporating television reception apparatus; computer displays", gstRate: 18, effectiveCess: "0%" },
  { code: "8443", type: "HSN", category: "Electronics & IT", description: "Printing machinery used for printing by means of plates, cylinders; inkjet and laser printers", gstRate: 18, effectiveCess: "0%" },

  // Legal, Accounting & Auditing Services
  { code: "998221", type: "SAC", category: "Legal & Professional", description: "Legal advisory, representation and documentation services by advocates or law firms", gstRate: 18, effectiveCess: "0%" },
  { code: "998222", type: "SAC", category: "Legal & Professional", description: "Accounting, bookkeeping, auditing services and financial statement preparation", gstRate: 18, effectiveCess: "0%" },
  { code: "998231", type: "SAC", category: "Legal & Professional", description: "Business consulting, management advisory and strategic planning services", gstRate: 18, effectiveCess: "0%" },

  // Additional High-Frequency Commercial Goods & Services
  { code: "5208", type: "HSN", category: "Textiles & Apparel", description: "Woven fabrics of cotton, containing 85% or more by weight of cotton", gstRate: 5, effectiveCess: "0%" },
  { code: "6109", type: "HSN", category: "Textiles & Apparel", description: "T-shirts, singlets and other vests, knitted or crocheted", gstRate: 5, effectiveCess: "0%" },
  { code: "998311", type: "SAC", category: "IT & Software", description: "Information technology (IT) consulting and computer support services", gstRate: 18, effectiveCess: "0%" },
  { code: "998313", type: "SAC", category: "IT & Software", description: "Hosting and IT infrastructure provisioning services, cloud computing", gstRate: 18, effectiveCess: "0%" },
  { code: "998511", type: "SAC", category: "Business Support", description: "Combined office administrative support and secretarial services", gstRate: 18, effectiveCess: "0%" },
  { code: "998731", type: "SAC", category: "Maintenance & Repair", description: "Maintenance and repair services of office machinery, computers and IT hardware", gstRate: 18, effectiveCess: "0%" },
  { code: "996712", type: "SAC", category: "Courier & Logistics", description: "Freight forwarding and cargo handling brokerage services", gstRate: 18, effectiveCess: "0%" },
  { code: "1006", type: "HSN", category: "Food & Agri", description: "Rice (paddy, husked, semi-milled or wholly milled rice)", gstRate: 0, effectiveCess: "0%" },
  { code: "0402", type: "HSN", category: "Food & Agri", description: "Milk and cream, concentrated or containing added sugar or other sweetening matter", gstRate: 5, effectiveCess: "0%" },
  { code: "2106", type: "HSN", category: "Food & Agri", description: "Food preparations not elsewhere specified or included (protein supplements, health drink mixes)", gstRate: 18, effectiveCess: "0%" },
  { code: "3004", type: "HSN", category: "Healthcare & Pharma", description: "Medicaments consisting of mixed or unmixed products for therapeutic or prophylactic uses (medicines)", gstRate: 12, effectiveCess: "0%" },
  { code: "999312", type: "SAC", category: "Healthcare & Pharma", description: "Healthcare and hospital services provided by clinical establishments", gstRate: 0, effectiveCess: "0%" },
  { code: "996331", type: "SAC", category: "Hospitality & Travel", description: "Accommodation and hotel lodging services", gstRate: 12, effectiveCess: "0%" },
  { code: "996321", type: "SAC", category: "Hospitality & Travel", description: "Restaurant, catering and food serving services without air conditioning", gstRate: 5, effectiveCess: "0%" },
  { code: "996322", type: "SAC", category: "Hospitality & Travel", description: "Air-conditioned restaurant and outdoor catering services", gstRate: 18, effectiveCess: "0%" },
  { code: "996411", type: "SAC", category: "Hospitality & Travel", description: "Passenger transport services by railways, air or taxi/cab aggregators", gstRate: 5, effectiveCess: "0%" }
];
