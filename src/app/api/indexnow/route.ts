import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'a1b2c3d4e5f678901234567890abcdef';
const HOST = 'multisheets.com';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

const URL_LIST = [
  `https://${HOST}`,
  `https://${HOST}/bank-holidays`,
  `https://${HOST}/tools/pps-cheque`,
  `https://${HOST}/tools/speedpost-calculator`,
  `https://${HOST}/ifsc`,
  `https://${HOST}/pincode`,
  `https://${HOST}/guides`,
  `https://${HOST}/guides/rbi-positive-pay-system-guide`,
  `https://${HOST}/guides/india-post-speed-post-charges-guide`,
  `https://${HOST}/guides/verify-bank-ifsc-micr-code-guide`,
  `https://${HOST}/guides/rbi-cheque-return-reason-codes-guide`,
  `https://${HOST}/guides/cyber-fraud-money-recovery-guide`,
  `https://${HOST}/tools/cyber-fraud-recovery`
];

export async function POST(req: NextRequest) {
  try {
    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: HOST,
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: URL_LIST,
      }),
    });

    if (response.status === 200 || response.status === 202) {
      return NextResponse.json({ message: 'Submission accepted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Submission failed', status: response.status }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
