import { AtlasTrip, SampleItinerary } from '../types';
import { parseItineraryDayDetails } from './itineraryHelper';

/**
 * Generates an executive, print-ready HTML document and opens a clean print window
 * which automatically triggers the system print dialog (allowing user to "Save as PDF"
 * or directly print a branded B2B itinerary sheet).
 */
export function exportItineraryToPdf(trip: AtlasTrip): void {
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert('Please allow popups for this site to export the PDF itinerary.');
    return;
  }

  const daysHtml = (trip.itinerary || []).map((day) => {
    const parsed = parseItineraryDayDetails(day.title, day.description);
    
    return `
      <div class="day-card">
        <div class="day-header">
          <div class="day-badge">Day ${day.dayNumber}</div>
          <div class="day-title">${escapeHtml(day.title)}</div>
        </div>
        
        <p class="day-desc">${escapeHtml(parsed.cleanDescription)}</p>

        <div class="day-meta-row">
          ${parsed.accommodation ? `
            <span class="meta-tag stay">
              <strong>Stay:</strong> ${escapeHtml(parsed.accommodation)}
            </span>
          ` : ''}
          ${parsed.meals.length > 0 ? `
            <span class="meta-tag meal">
              <strong>Meals:</strong> ${escapeHtml(parsed.meals.join(' • '))}
            </span>
          ` : ''}
          ${parsed.activityType ? `
            <span class="meta-tag activity">
              <strong>Activity:</strong> ${escapeHtml(parsed.activityType)}
            </span>
          ` : ''}
          ${parsed.distance ? `
            <span class="meta-tag distance">
              <strong>Distance:</strong> ${escapeHtml(parsed.distance)}
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  const inclusionsHtml = (trip.includes || []).map(inc => `<li>${escapeHtml(inc)}</li>`).join('');
  const exclusionsHtml = (trip.excludes || []).map(exc => `<li>${escapeHtml(exc)}</li>`).join('');
  const highlightsHtml = (trip.highlights || []).map(hl => `<li>${escapeHtml(hl)}</li>`).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(trip.title)} - Official Itinerary | Baobab DMC Turkey</title>
      <style>
        @page {
          size: A4;
          margin: 16mm 14mm 16mm 14mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #1a1a1a;
          line-height: 1.5;
          margin: 0;
          padding: 24px;
          background: #ffffff;
          font-size: 13px;
        }
        .header {
          border-bottom: 2px solid #F05A28;
          padding-bottom: 16px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #111111;
        }
        .brand-sub {
          font-size: 11px;
          color: #F05A28;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          margin-top: 2px;
        }
        .doc-tag {
          text-align: right;
          font-size: 11px;
          color: #666;
        }
        .doc-tag strong {
          display: block;
          color: #111;
          font-size: 12px;
        }
        .trip-title {
          font-size: 22px;
          font-weight: 700;
          color: #111111;
          margin: 0 0 8px 0;
          line-height: 1.25;
        }
        .meta-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .badge {
          display: inline-block;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 3px;
          background: #f0f0f0;
          color: #333;
        }
        .badge-primary {
          background: #F05A28;
          color: #ffffff;
        }
        .badge-dark {
          background: #111111;
          color: #ffffff;
        }
        .destinations-line {
          font-size: 12px;
          color: #555;
          margin-bottom: 16px;
          padding: 8px 12px;
          background: #fbfbfb;
          border-left: 3px solid #F05A28;
          border-radius: 2px;
        }
        .section-heading {
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #F05A28;
          border-bottom: 1px solid #eee;
          padding-bottom: 4px;
          margin: 20px 0 12px 0;
        }
        .overview-text {
          font-size: 13px;
          color: #333;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .day-card {
          margin-bottom: 14px;
          padding: 12px 14px;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          page-break-inside: avoid;
        }
        .day-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .day-badge {
          background: #111;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .day-title {
          font-weight: 700;
          font-size: 13.5px;
          color: #111;
        }
        .day-desc {
          margin: 6px 0 8px 0;
          font-size: 12.5px;
          color: #444;
          line-height: 1.55;
        }
        .day-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px dashed #ddd;
        }
        .meta-tag {
          font-size: 11px;
          padding: 2px 7px;
          border-radius: 3px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .meta-tag.stay {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }
        .meta-tag.meal {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        .meta-tag.activity {
          background: #e0f2fe;
          color: #075985;
          border: 1px solid #bae6fd;
        }
        .meta-tag.distance {
          background: #f4f4f5;
          color: #27272a;
          border: 1px solid #e4e4e7;
        }
        .two-col {
          display: flex;
          gap: 20px;
          margin-top: 16px;
          page-break-inside: avoid;
        }
        .col {
          flex: 1;
          background: #fafafa;
          padding: 12px 16px;
          border-radius: 4px;
          border: 1px solid #e8e8e8;
        }
        .col h4 {
          margin: 0 0 8px 0;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .col.inclusions h4 { color: #065f46; }
        .col.exclusions h4 { color: #854d0e; }
        .col ul {
          margin: 0;
          padding-left: 18px;
          font-size: 11.5px;
          color: #444;
          line-height: 1.6;
        }
        .footer {
          margin-top: 28px;
          padding-top: 12px;
          border-top: 1px solid #ddd;
          font-size: 10.5px;
          color: #777;
          display: flex;
          justify-content: space-between;
          align-items: center;
          page-break-inside: avoid;
        }
        .print-btn-bar {
          background: #111;
          color: #fff;
          padding: 10px 16px;
          border-radius: 6px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .print-btn {
          background: #F05A28;
          color: #fff;
          border: none;
          padding: 8px 16px;
          font-weight: 700;
          font-size: 12px;
          border-radius: 4px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        @media print {
          .print-btn-bar {
            display: none !important;
          }
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="print-btn-bar">
        <span><strong>B2B Confidential Itinerary Export:</strong> Press print or save as PDF</span>
        <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
      </div>

      <div class="header">
        <div>
          <img src="${typeof window !== 'undefined' ? window.location.origin : ''}/baobab-logo.png" style="height: 38px; max-width: 170px; object-fit: contain; margin-bottom: 4px; display: block;" alt="Baobab Destination Management Company" onerror="this.style.display='none'" />
          <div class="brand-sub">Wholesale Inbound Tour Operator & MICE Ground Handler</div>
        </div>
        <div class="doc-tag">
          <strong>CONFIDENTIAL PROPOSAL</strong>
          TURSAB Licensed #10848
          <br />Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      <h1 class="trip-title">${escapeHtml(trip.title)}</h1>

      <div class="meta-strip">
        <span class="badge badge-primary">${escapeHtml(trip.category)}</span>
        <span class="badge badge-dark">${escapeHtml(trip.duration)}</span>
        <span class="badge">${escapeHtml(trip.groupSize)}</span>
        <span class="badge">Guaranteed Private Departure</span>
      </div>

      <div class="destinations-line">
        <strong>Destinations Covered:</strong> ${escapeHtml(trip.destinations.join(' • '))}
      </div>

      <div class="section-heading">Executive Program Summary</div>
      <p class="overview-text">${escapeHtml(trip.description)}</p>

      ${highlightsHtml ? `
        <div class="section-heading">Key Program Highlights</div>
        <ul style="padding-left: 18px; margin: 0 0 16px 0; font-size: 12px; line-height: 1.6; color: #333;">
          ${highlightsHtml}
        </ul>
      ` : ''}

      <div class="section-heading">Day-by-Day Comprehensive Itinerary Flow</div>
      <div class="days-container">
        ${daysHtml}
      </div>

      <div class="two-col">
        <div class="col inclusions">
          <h4>Included in Wholesale Package</h4>
          ${inclusionsHtml ? `<ul>${inclusionsHtml}</ul>` : '<p style="font-size:11px; margin:0;">All luxury boutique stays, private AC motorcoach, certified scholar guides, museum admissions, and daily breakfast.</p>'}
        </div>
        <div class="col exclusions">
          <h4>Not Included</h4>
          ${exclusionsHtml ? `<ul>${exclusionsHtml}</ul>` : '<p style="font-size:11px; margin:0;">International flights, discretionary gratuities, and personal travel insurance.</p>'}
        </div>
      </div>

      <div class="footer">
        <div>
          <strong>Baobab DMC Turkey Ground Operations</strong> | Istanbul • Cappadocia • Antalya • Bodrum
          <br />B2B Wholesale Inquiries: operations@baobabdmc.com | +90 212 555 0199
        </div>
        <div>
          Page 1 • White-Label Ready
        </div>
      </div>

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 400);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Export sample itinerary from ItinerariesSection to PDF as well
 */
export function exportSampleItineraryToPdf(itin: SampleItinerary): void {
  const pseudoTrip: AtlasTrip = {
    id: itin.id,
    atlasId: 0,
    title: itin.title,
    slug: itin.id,
    category: itin.category,
    duration: itin.duration,
    daysCount: itin.days.length,
    groupSize: itin.idealGroupSize,
    image: itin.coverImage,
    destinations: itin.destinations,
    description: itin.overview,
    itinerary: itin.days.map(d => ({
      dayNumber: d.day,
      title: `${d.location}: ${d.title}`,
      description: `${d.description} Highlights: ${d.highlights.join(', ')}`
    })),
    includes: itin.includedHighlights,
    excludes: [
      'International airfares',
      'Personal travel insurance',
      'Discretionary guide & driver gratuities'
    ],
    highlights: itin.includedHighlights,
    originalUrl: ''
  };

  exportItineraryToPdf(pseudoTrip);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
