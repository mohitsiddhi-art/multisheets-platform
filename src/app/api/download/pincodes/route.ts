import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/pincodes.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    const records = JSON.parse(rawData);

    // CSV Headers
    const headers = ["Pincode", "Office Name", "District", "State", "Delivery Status", "Office Type", "Circle"];

    // Convert to CSV
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = records.map((r: any) => [
      escapeCsv(r.pincode || r.Pincode || r.pin),
      escapeCsv(r.office_name || r.officename),
      escapeCsv(r.district || ""),
      escapeCsv(r.state || ""),
      escapeCsv(r.delivery || r.delivery_status || ""),
      escapeCsv(r.office_type || ""),
      escapeCsv(r.circle || "")
    ].join(","));

    const csvContent = "﻿" + [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="multisheets-all-india-pincodes.csv"',
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Failed to generate pincodes CSV:", error);
    return new NextResponse("Failed to generate CSV", { status: 500 });
  }
}
