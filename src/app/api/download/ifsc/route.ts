import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/bank_branches.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    const records = JSON.parse(rawData);

    // CSV Headers
    const headers = ["IFSC", "Bank Name", "Branch", "MICR", "City", "State", "Address", "Contact"];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = records.map((r: any) => [
      escapeCsv(r.ifsc || r.IFSC || r.ifsc_code),
      escapeCsv(r.bank || r.Bank || r.BANK_NAME || r.bank_name),
      escapeCsv(r.branch || r.Branch || r.branch_name || ""),
      escapeCsv(r.micr || ""),
      escapeCsv(r.city || ""),
      escapeCsv(r.state || ""),
      escapeCsv(r.address || ""),
      escapeCsv(r.contact || "")
    ].join(","));

    const csvContent = "﻿" + [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="multisheets-all-india-bank-ifsc.csv"',
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Failed to generate IFSC CSV:", error);
    return new NextResponse("Failed to generate CSV", { status: 500 });
  }
}
