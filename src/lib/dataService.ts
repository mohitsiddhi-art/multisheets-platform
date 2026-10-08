import fs from "fs/promises";
import path from "path";

type PincodeRecord = {
  pincode: string;
  office_name: string;
  district: string;
  state: string;
  delivery_status: "Delivery" | "Non-delivery";
  [key: string]: any;
};

type IfscRecord = {
  ifsc: string;
  bank_name: string;
  branch?: string;
  micr?: string;
  address?: string;
  city?: string;
  state?: string;
  [key: string]: any;
};

// Caching
let pincodes: PincodeRecord[] | null = null;
let ifscs: IfscRecord[] | null = null;

async function loadData() {
  if (!pincodes) {
    const pPath = path.join(process.cwd(), "src/data/pincodes.json");
    pincodes = JSON.parse(await fs.readFile(pPath, "utf-8"));
  }
  if (!ifscs) {
    const iPath = path.join(process.cwd(), "src/data/bank_branches.json");
    ifscs = JSON.parse(await fs.readFile(iPath, "utf-8"));
  }
}

// Helpers for normalized access
const getPincode = (r: any) => r.pincode || r.Pincode || r.pin;
const getIfsc = (r: any) => r.ifsc || r.IFSC || r.ifsc_code;
const getBank = (r: any) => r.bank || r.Bank || r.BANK_NAME || r.bank_name;
const getBranch = (r: any) => r.branch || r.Branch || r.branch_name;

export async function getPincodeByCode(code: string) {
  await loadData();
  const r = pincodes!.find((r) => getPincode(r) === code);
  if (!r) return null;
  return {
    ...r,
    pincode: getPincode(r),
    office_name: r.office_name,
    district: r.district || "",
    state: r.state || "",
    delivery_status: r.delivery || "",
    office_type: r.office_type || "",
    circle: r.circle || "",
    region: r.region || "",
    division: r.division || ""
  };
}

export async function getIfscByCode(code: string) {
  await loadData();
  const r = ifscs!.find((r) => getIfsc(r) === code);
  if (!r) return null;
  return {
    ...r,
    ifsc: getIfsc(r),
    bank_name: getBank(r),
    branch: getBranch(r),
    address: r.address || "",
    city: r.city || "",
    state: r.state || "",
    micr: r.micr || "N/A",
    contact: r.contact || "N/A"
  };
}

export async function searchDirectories(query: string, limit: number = 5) {
  await loadData();
  const q = query.toLowerCase();

  const getScore = (code: string, text: string) => {
    if (code.toLowerCase() === q) return 100;
    if (code.toLowerCase().startsWith(q)) return 80;
    if (text.toLowerCase().includes(q)) return 50;
    return 0;
  };

  const pResults = pincodes!.map(r => {
    const code = getPincode(r) || "";
    const name = r.office_name || "";
    return {
      ...r,
      code,
      type: "pincode" as const,
      score: getScore(code, name),
      title: `${code} — ${name}`,
      subtitle: `${r.district}, ${r.state}`,
      url: `/pincode/${code}`
    };
  }).filter(r => r.score > 0);

  const iResults = ifscs!.map(r => {
    const code = getIfsc(r) || "";
    const bank = getBank(r) || "";
    const branch = getBranch(r) || "";
    return {
      ...r,
      code,
      type: "ifsc" as const,
      score: getScore(code, `${bank} ${branch}`),
      title: `${code} — ${bank}`,
      subtitle: `${branch}, ${r.city || ""}`,
      url: `/ifsc/${code}`
    };
  }).filter(r => r.score > 0);

  return [...pResults, ...iResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export async function getAllPincodes(page: number = 1, limit: number = 20) {
  await loadData();
  return pincodes!.slice((page - 1) * limit, page * limit);
}

export async function getAllIfsc(page: number = 1, limit: number = 20) {
  await loadData();
  return ifscs!.slice((page - 1) * limit, page * limit);
}
