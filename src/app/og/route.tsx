import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'MultiSheets Compliance & Utility Portal';
    const subtitle = searchParams.get('subtitle') || 'Official RBI, India Post, and GST Statutory Verification Hub';
    const category = searchParams.get('category') || 'Enterprise Tool';
    const badge = searchParams.get('badge') || '2026 Verified';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b, #042f2e)',
            padding: '60px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '24px',
                  boxShadow: '0 10px 25px -5px rgba(13, 148, 136, 0.4)',
                }}
              >
                MS
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em' }}>
                MultiSheets
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                style={{
                  backgroundColor: 'rgba(13, 148, 136, 0.2)',
                  border: '1px solid rgba(13, 148, 136, 0.4)',
                  color: '#2dd4bf',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {category}
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#e2e8f0',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {badge}
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '40px 0' }}>
            <h1
              style={{
                fontSize: title.length > 50 ? '42px' : '52px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                maxHeight: '180px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                lineHeight: 1.4,
                maxWidth: '900px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '30px',
              width: '100%',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#2dd4bf' }}>
              multisheets.com
            </span>
            <span style={{ fontSize: '14px', color: '#64748b' }}>
              Statutory Compliance &amp; Regulatory Lookup Desk
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
