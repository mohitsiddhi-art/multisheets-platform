import fs from "fs/promises";
import path from "path";

type PincodeRecord = {
  pincode: string;
  office_name: string;
  district: string;
  state: string;
  delivery: string;
  office_type: string;
  circle: string;
  region?: string;
  division?: string;
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
  contact?: string;
  [key: string]: any;
};

// In-process cache (cleared per cold start in serverless environments)
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

// ── Field-access helpers (normalise varied key names in source data) ──────────
const getPincode = (r: any) => r.pincode || r.Pincode || r.pin;
const getIfsc = (r: any) => r.ifsc || r.IFSC || r.ifsc_code;
const getBank = (r: any) => r.bank || r.Bank || r.BANK_NAME || r.bank_name;
const getBranch = (r: any) => r.branch || r.Branch || r.branch_name;

// ── Slug helpers ──────────────────────────────────────────────────────────────
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function fromSlug(slug: string): string {
  // Convert slug back to title-case for display
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Typed return shapes ───────────────────────────────────────────────────────
export interface NormalisedPincode {
  pincode: string;
  office_name: string;
  district: string;
  state: string;
  delivery_status: string;
  office_type: string;
  circle: string;
  region: string;
  division: string;
}

export interface NormalisedIfsc {
  ifsc: string;
  bank_name: string;
  branch: string;
  address: string;
  city: string;
  state: string;
  micr: string;
  contact: string;
}

// ── State directory ───────────────────────────────────────────────────────────

/**
 * Returns every state name present in the pincode dataset alongside its slug
 * and total count. Sorted by entry count descending.
 */
export async function getAllStates(): Promise<
  { state: string; slug: string; count: number }[]
> {
  await loadData();
  const map = new Map<string, number>();
  for (const r of pincodes!) {
    const s = r.state || "";
    if (s) map.set(s, (map.get(s) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([state, count]) => ({ state, slug: toSlug(state), count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns all pincodes for a given state slug, paginated.
 * Also returns the canonical state name and the list of districts.
 */
export async function getPincodesByState(
  stateSlug: string,
  page: number = 1,
  limit: number = 25
): Promise<{
  stateLabel: string;
  total: number;
  records: NormalisedPincode[];
  districts: { district: string; count: number }[];
  page: number;
  totalPages: number;
} | null> {
  await loadData();

  // Find canonical state name by matching slug
  const matched: PincodeRecord[] = pincodes!.filter(
    (r) => r.state && toSlug(r.state) === stateSlug
  );

  if (matched.length === 0) return null;

  const stateLabel = matched[0].state;

  // Build district frequency map
  const districtMap = new Map<string, number>();
  for (const r of matched) {
    const d = r.district || "";
    if (d) districtMap.set(d, (districtMap.get(d) ?? 0) + 1);
  }
  const districts = Array.from(districtMap.entries())
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count);

  const total = matched.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const records: NormalisedPincode[] = matched
    .slice(offset, offset + limit)
    .map((r) => ({
      pincode: getPincode(r) || "",
      office_name: r.office_name || "",
      district: r.district || "",
      state: r.state || "",
      delivery_status: r.delivery || "",
      office_type: r.office_type || "",
      circle: r.circle || "",
      region: r.region || "",
      division: r.division || "",
    }));

  return { stateLabel, total, records, districts, page, totalPages };
}

// ── Bank directory ────────────────────────────────────────────────────────────

/** Returns the top N distinct banks by branch count. */
export async function getTopBanks(
  limit: number = 20
): Promise<{ bank: string; slug: string; count: number }[]> {
  await loadData();
  const map = new Map<string, number>();
  for (const r of ifscs!) {
    const b = getBank(r) || "";
    if (b) map.set(b, (map.get(b) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([bank, count]) => ({ bank, slug: toSlug(bank), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Returns all IFSC branches belonging to a given bank slug, paginated.
 * Also returns the canonical bank name and a state-wise branch breakdown.
 */
export async function getIfscsByBank(
  bankSlug: string,
  page: number = 1,
  limit: number = 30
): Promise<{
  bankLabel: string;
  total: number;
  records: NormalisedIfsc[];
  states: { state: string; count: number }[];
  page: number;
  totalPages: number;
} | null> {
  await loadData();

  const matched: IfscRecord[] = ifscs!.filter((r) => getBank(r) && toSlug(getBank(r)!) === bankSlug);

  if (matched.length === 0) return null;

  const bankLabel = matched[0].bank_name || matched[0].bank || "Bank";

  const stateMap = new Map<string, number>();
  for (const r of matched) {
    const s = r.state || "Not Specified";
    stateMap.set(s, (stateMap.get(s) ?? 0) + 1);
  }
  const states = Array.from(stateMap.entries())
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count);

  const total = matched.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const records: NormalisedIfsc[] = matched
    .slice(offset, offset + limit)
    .map((r) => ({
      ifsc: getIfsc(r) || "",
      bank_name: getBank(r) || "",
      branch: getBranch(r) || "",
      address: r.address || "",
      city: r.city || "",
      state: r.state || "",
      micr: r.micr || "N/A",
      contact: r.contact || "N/A",
    }));

  return { bankLabel, total, records, states, page, totalPages };
}

// ── Individual lookups ────────────────────────────────────────────────────────

export async function getPincodeByCode(
  code: string
): Promise<NormalisedPincode | null> {
  await loadData();
  const r = pincodes!.find((r) => getPincode(r) === code);
  if (!r) return null;
  return {
    pincode: getPincode(r) || "",
    office_name: r.office_name || "",
    district: r.district || "",
    state: r.state || "",
    delivery_status: r.delivery || "",
    office_type: r.office_type || "",
    circle: r.circle || "",
    region: r.region || "",
    division: r.division || "",
  };
}

export async function getIfscByCode(
  code: string
): Promise<NormalisedIfsc | null> {
  await loadData();
  const r = ifscs!.find((r) => getIfsc(r) === code);
  if (!r) return null;
  return {
    ifsc: getIfsc(r) || "",
    bank_name: getBank(r) || "",
    branch: getBranch(r) || "",
    address: r.address || "",
    city: r.city || "",
    state: r.state || "",
    micr: r.micr || "N/A",
    contact: r.contact || "N/A",
  };
}

export async function searchDirectories(
  query: string,
  limit: number = 5
) {
  await loadData();
  const q = query.toLowerCase();

  const getScore = (code: string, text: string) => {
    if (code.toLowerCase() === q) return 100;
    if (code.toLowerCase().startsWith(q)) return 80;
    if (text.toLowerCase().includes(q)) return 50;
    return 0;
  };

  const pResults = pincodes!.map((r) => {
    const code = getPincode(r) || "";
    const name = r.office_name || "";
    return {
      ...r,
      code,
      type: "pincode" as const,
      score: getScore(code, name),
      title: `${code} — ${name}`,
      subtitle: `${r.district}, ${r.state}`,
      url: `/pincode/${code}`,
    };
  }).filter((r) => r.score > 0);

  const iResults = ifscs!.map((r) => {
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
      url: `/ifsc/${code}`,
    };
  }).filter((r) => r.score > 0);

  return [...pResults, ...iResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export async function getAllPincodes(page: number = 1, limit: number = 20) {
  await loadData();
  return pincodes!.slice((page - 1) * limit, page * limit).map((r) => ({
    pincode: getPincode(r) || "",
    office_name: r.office_name || "",
    district: r.district || "",
    state: r.state || "",
    delivery_status: r.delivery || "",
    office_type: r.office_type || "",
    circle: r.circle || "",
    region: r.region || "",
    division: r.division || "",
  }));
}

export async function getAllIfsc(page: number = 1, limit: number = 20) {
  await loadData();
  return ifscs!.slice((page - 1) * limit, page * limit).map((r) => ({
    ifsc: getIfsc(r) || "",
    bank_name: getBank(r) || "",
    branch: getBranch(r) || "",
    address: r.address || "",
    city: r.city || "",
    state: r.state || "",
    micr: r.micr || "N/A",
    contact: r.contact || "N/A",
  }));
}
