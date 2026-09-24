import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Resend client
let resendClient: Resend | null = null;
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 'MY_RESEND_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'MY_RESEND_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

// API Route: Send Tour / B2B Inquiry Email via Resend
app.post('/api/inquiry', async (req, res) => {
  try {
    const data = req.body;
    
    // Basic validation
    if (!data.fullName || !data.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: fullName and email are required.' 
      });
    }

    const referenceNumber = data.referenceNumber || ('TR-BAOBAB-' + Math.floor(1000 + Math.random() * 9000));
    const recipientEmail = process.env.INQUIRY_RECEIVER_EMAIL || 'tolgakinas@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Baobab DMC Inquiries <onboarding@resend.dev>';
    const isB2B = data.formMode === 'b2b-partner';

    const subject = isB2B 
      ? `[B2B Partner Registration] ${data.companyOrAgency || data.fullName} - Ref: ${referenceNumber}`
      : `[New Tour Proposal Inquiry] ${data.selectedTripTitle || data.tripType || 'Custom Tour'} - ${data.fullName} (Ref: ${referenceNumber})`;

    // Generate clean HTML template for internal DMC operations team
    const internalEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb; margin: 0; padding: 20px; }
          .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #121316; color: #ffffff; padding: 24px; border-bottom: 3px solid #f05a28; }
          .badge { display: inline-block; background: rgba(240, 90, 40, 0.2); color: #f05a28; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.05em; }
          .title { margin: 10px 0 0 0; font-size: 20px; font-weight: bold; color: #ffffff; }
          .content { padding: 24px; }
          .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #f05a28; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; }
          .table td { padding: 8px 10px; border-bottom: 1px solid #f3f4f6; }
          .table td.label { font-weight: bold; color: #6b7280; width: 38%; }
          .table td.val { color: #111827; }
          .highlight-box { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 6px; padding: 14px; margin: 16px 0; font-size: 14px; color: #292524; }
          .tag { display: inline-block; background: #f3f4f6; color: #374151; font-size: 12px; padding: 3px 8px; border-radius: 4px; margin: 2px 4px 2px 0; font-weight: 500; }
          .footer { background: #f9fafb; padding: 16px 24px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">${isB2B ? 'B2B Trade Onboarding' : 'Direct Ground Tour Inquiry'}</span>
            <div class="title">${isB2B ? 'New B2B Partner Registration' : 'New Tour Proposal Request'}</div>
            <div style="font-size: 13px; color: #9ca3af; margin-top: 4px;">Reference ID: <strong style="color: #ffffff;">${referenceNumber}</strong></div>
          </div>
          
          <div class="content">
            <div class="section-title">1. Contact & Agency Information</div>
            <table class="table">
              <tr>
                <td class="label">Full Name</td>
                <td class="val"><strong>${data.fullName || '-'}</strong></td>
              </tr>
              <tr>
                <td class="label">Company / Agency</td>
                <td class="val">${data.companyOrAgency || '-'}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="val"><a href="mailto:${data.email}" style="color: #f05a28; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="val">${data.phone || '-'}</td>
              </tr>
              <tr>
                <td class="label">Country of Operation</td>
                <td class="val">${data.country || '-'}</td>
              </tr>
              <tr>
                <td class="label">Role / Partner Type</td>
                <td class="val">${data.role || data.partnerType || '-'}</td>
              </tr>
              ${data.website ? `<tr><td class="label">Website</td><td class="val"><a href="${data.website}" target="_blank" style="color: #f05a28;">${data.website}</a></td></tr>` : ''}
              ${data.primaryMarketsServed ? `<tr><td class="label">Primary Markets</td><td class="val">${data.primaryMarketsServed}</td></tr>` : ''}
            </table>

            <div class="section-title">2. Tour / Program Specifications</div>
            <table class="table">
              ${data.selectedTripTitle ? `<tr><td class="label">Regarded Tour Program</td><td class="val"><strong style="color: #f05a28;">${data.selectedTripTitle}</strong></td></tr>` : ''}
              <tr>
                <td class="label">Tour Type</td>
                <td class="val">${data.tripType || '-'}</td>
              </tr>
              <tr>
                <td class="label">Target Travel Season</td>
                <td class="val"><strong>${data.estimatedDate || 'Not specified'}</strong></td>
              </tr>
              <tr>
                <td class="label">Group Size</td>
                <td class="val">${data.guestCount || '-'} Guests</td>
              </tr>
              <tr>
                <td class="label">Duration</td>
                <td class="val">${data.selectedTripDuration || (data.durationDays ? `${data.durationDays} Days` : '-')}</td>
              </tr>
              <tr>
                <td class="label">Accommodation Standard</td>
                <td class="val">${data.budgetTier || '-'}</td>
              </tr>
            </table>

            ${data.destinations && data.destinations.length > 0 ? `
              <div class="section-title">3. Requested Regions in Turkey</div>
              <div style="margin-bottom: 16px;">
                ${data.destinations.map((d: string) => `<span class="tag">${d}</span>`).join('')}
              </div>
            ` : ''}

            ${data.preferredExperiences && data.preferredExperiences.length > 0 ? `
              <div class="section-title">4. Preferred Signature Experiences / Services</div>
              <div style="margin-bottom: 16px;">
                ${data.preferredExperiences.map((e: string) => `<span class="tag">${e}</span>`).join('')}
              </div>
            ` : ''}

            ${data.specialRequests ? `
              <div class="section-title">5. Special Notes & Client Requests</div>
              <div class="highlight-box">
                ${data.specialRequests.replace(/\n/g, '<br/>')}
              </div>
            ` : ''}
          </div>

          <div class="footer">
            Baobab Destination Management Company (DMC) • Sisli, Istanbul, Turkey • TURSAB Licensed #A-15764
          </div>
        </div>
      </body>
      </html>
    `;

    // Generate traveler / partner auto-confirmation HTML
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
          .header { background: #121316; color: #ffffff; padding: 28px 24px; text-align: center; border-bottom: 3px solid #f05a28; }
          .title { margin: 10px 0 0 0; font-size: 22px; font-weight: bold; color: #ffffff; }
          .content { padding: 28px 24px; }
          .ref-box { background: #fff7ed; border: 1px solid #ffedd5; border-radius: 6px; padding: 16px; margin: 20px 0; text-align: center; }
          .ref-title { font-size: 11px; text-transform: uppercase; font-weight: bold; color: #c2410c; letter-spacing: 0.05em; }
          .ref-number { font-size: 20px; font-weight: bold; color: #9a3412; font-family: monospace; margin-top: 4px; }
          .footer { background: #f9fafb; padding: 20px 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="font-size: 12px; color: #f05a28; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Baobab DMC Turkey</div>
            <div class="title">Thank You for Your Proposal Request</div>
          </div>

          <div class="content">
            <p>Dear <strong>${data.fullName}</strong>,</p>
            <p>We have successfully received your proposal request for <strong>${data.selectedTripTitle || data.tripType || 'Turkey Tour Itinerary'}</strong>.</p>
            
            <div class="ref-box">
              <div class="ref-title">Your Proposal Reference Number</div>
              <div class="ref-number">${referenceNumber}</div>
            </div>

            <p>Our Senior Destination Operations Team in Istanbul is currently reviewing your requested routing, accommodation standards, and group preferences. We will deliver your complete day-by-day proposal and confidential wholesale tariff sheet within <strong>24 business hours</strong>.</p>

            <p>If you have urgent questions or need to connect directly with our ground operations desk, feel free to contact us:</p>
            <ul>
              <li><strong>Email:</strong> ops@baobabdmc.com</li>
              <li><strong>Telephone:</strong> +90 850 309 31 63</li>
              <li><strong>WhatsApp Desk:</strong> +90 544 836 28 45</li>
            </ul>

            <p style="margin-top: 24px;">Warm regards from Istanbul,<br/><strong>Baobab DMC Operations Team</strong></p>
          </div>

          <div class="footer">
            Baobab Destination Management Company • Sisli, Istanbul, Turkey<br/>
            TURSAB Licensed Grade-A Travel Operator #15764
          </div>
        </div>
      </body>
      </html>
    `;

    const resend = getResendClient();

    if (!resend) {
      console.log(`[Resend Notice] RESEND_API_KEY not configured. Simulated email delivery for Reference ${referenceNumber} to ${recipientEmail}`);
      return res.json({
        success: true,
        simulated: true,
        referenceNumber,
        message: 'Inquiry received. Note: To send live emails, configure RESEND_API_KEY in your environment.',
      });
    }

    // Send internal operations notification email
    const internalResult = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: data.email,
      subject: subject,
      html: internalEmailHtml,
    });

    // Send customer auto-acknowledgement email
    let clientResult = null;
    try {
      clientResult = await resend.emails.send({
        from: fromEmail,
        to: [data.email],
        subject: `Your Turkey Proposal Request Confirmation (Ref: ${referenceNumber})`,
        html: confirmationEmailHtml,
      });
    } catch (err: any) {
      console.warn('[Resend Client Confirmation Warning]:', err?.message || err);
    }

    return res.json({
      success: true,
      simulated: false,
      referenceNumber,
      internalEmailId: internalResult?.data?.id,
      clientEmailId: clientResult?.data?.id,
      message: 'Inquiry email successfully dispatched via Resend.',
    });
  } catch (error: any) {
    console.error('[Resend Error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to dispatch inquiry email via Resend.',
    });
  }
});

// API Route: Travel Consultant / Advisor Confirmed Customer Booking
app.post('/api/consultant-booking', async (req, res) => {
  try {
    const data = req.body;

    // Validation
    if (!data.consultantName || !data.consultantEmail || !data.leadCustomerName || !data.tripTitle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required booking parameters: consultant info, customer name, and trip title are required.',
      });
    }

    const bookingReference = data.bookingReference || ('BAOBAB-ADV-' + Math.floor(100000 + Math.random() * 900000));
    const recipientEmail = process.env.INQUIRY_RECEIVER_EMAIL || 'tolgakinas@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Baobab DMC Trade Bookings <onboarding@resend.dev>';

    const guestCount = Number(data.guestCount) || 1;
    const retailPricePerPax = Number(data.retailPricePerPax) || 0;
    const netPricePerPax = Number(data.netPricePerPax) || Math.round(retailPricePerPax * 0.75);
    const totalGrossRetail = Number(data.totalGrossRetail) || (retailPricePerPax * guestCount);
    const totalNetPayable = Number(data.totalNetPayable) || (netPricePerPax * guestCount);
    const advisorCommission = Number(data.advisorCommission) || (totalGrossRetail - totalNetPayable);

    const subject = `[CONFIRMED TRADE BOOKING] ${data.agencyName || data.consultantName} - For ${data.leadCustomerName} (${data.tripTitle}) - Ref: ${bookingReference}`;

    // Internal Email for DMC Operations & Management
    const internalBookingHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f3f4f6; margin: 0; padding: 24px; }
          .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); }
          .header { background: #121316; color: #ffffff; padding: 28px 32px; border-bottom: 4px solid #f05a28; }
          .status-badge { display: inline-block; background: #10b981; color: #ffffff; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.05em; }
          .title { margin: 12px 0 4px 0; font-size: 22px; font-weight: bold; color: #ffffff; }
          .ref { font-size: 14px; color: #f05a28; font-weight: bold; font-family: monospace; letter-spacing: 0.05em; }
          .content { padding: 32px; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em; color: #f05a28; margin-bottom: 12px; border-bottom: 2px solid #fef3c7; padding-bottom: 4px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 13.5px; }
          .table td { padding: 9px 12px; border-bottom: 1px solid #f3f4f6; }
          .table td.lbl { font-weight: 600; color: #6b7280; width: 38%; }
          .table td.val { color: #111827; }
          .highlight-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 12px 0; }
          .footer { background: #f9fafb; padding: 20px 32px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="status-badge">Confirmed Trade Booking</span>
            <div class="title">New Travel Advisor Customer Booking</div>
            <div class="ref">Ref: ${bookingReference} • 25% Advisor Net Tariff Applied</div>
          </div>
          
          <div class="content">
            <!-- 1. Advisor Info -->
            <div class="section">
              <div class="section-title">1. Travel Consultant / Advisor Profile</div>
              <table class="table">
                <tr><td class="lbl">Consultant Name</td><td class="val"><strong>${data.consultantName}</strong></td></tr>
                <tr><td class="lbl">Agency / Consortium</td><td class="val"><strong>${data.agencyName || 'Independent Travel Advisor'}</strong></td></tr>
                <tr><td class="lbl">Advisor Email</td><td class="val"><a href="mailto:${data.consultantEmail}">${data.consultantEmail}</a></td></tr>
                <tr><td class="lbl">Advisor Phone</td><td class="val">${data.consultantPhone || 'Not provided'}</td></tr>
                <tr><td class="lbl">IATA / CLIA / TRUE #</td><td class="val">${data.iataOrClia || 'Trade Registered'}</td></tr>
              </table>
            </div>

            <!-- 2. Customer & Itinerary Details -->
            <div class="section">
              <div class="section-title">2. Customer & Itinerary Information</div>
              <table class="table">
                <tr><td class="lbl">Lead Passenger</td><td class="val"><strong>${data.leadCustomerName}</strong></td></tr>
                <tr><td class="lbl">Customer Email</td><td class="val">${data.customerEmail || 'C/O Travel Advisor'}</td></tr>
                <tr><td class="lbl">Customer Phone</td><td class="val">${data.customerPhone || 'C/O Travel Advisor'}</td></tr>
                <tr><td class="lbl">Tour / Excursion Booked</td><td class="val"><strong style="color: #f05a28;">${data.tripTitle}</strong></td></tr>
                <tr><td class="lbl">Category & Style</td><td class="val">${data.category || 'Curated Guided Experience'}</td></tr>
                <tr><td class="lbl">Travel / Departure Date</td><td class="val"><strong>${data.travelDate || 'Open / As Requested'}</strong></td></tr>
                <tr><td class="lbl">Duration</td><td class="val">${data.duration || '-'}</td></tr>
                <tr><td class="lbl">Total Guests (Pax)</td><td class="val"><strong>${guestCount} Guest(s)</strong></td></tr>
                <tr><td class="lbl">Room / Setup Type</td><td class="val">${data.roomType || 'Double / Twin Luxury'}</td></tr>
              </table>
            </div>

            <!-- 3. Financial & 25% Discount Breakdown -->
            <div class="section">
              <div class="section-title">3. Net Trade Financial Breakdown (25% Advisor Tariff)</div>
              <div class="highlight-card">
                <table class="table" style="margin: 0;">
                  <tr><td class="lbl">Retail Public Price (RRP / Pax)</td><td class="val">$${retailPricePerPax.toLocaleString()} USD</td></tr>
                  <tr><td class="lbl">Advisor 25% Net Rate / Pax</td><td class="val" style="color: #059669; font-weight: bold;">$${netPricePerPax.toLocaleString()} USD (-25%)</td></tr>
                  <tr><td class="lbl">Total Gross Retail Value</td><td class="val">$${totalGrossRetail.toLocaleString()} USD</td></tr>
                  <tr><td class="lbl"><strong>Total Net Payable to Baobab DMC</strong></td><td class="val"><strong style="font-size: 16px; color: #f05a28;">$${totalNetPayable.toLocaleString()} USD</strong></td></tr>
                  <tr><td class="lbl"><strong>Advisor Retained Commission (25%)</strong></td><td class="val"><strong style="font-size: 15px; color: #059669;">+$${advisorCommission.toLocaleString()} USD</strong></td></tr>
                </table>
              </div>
            </div>

            ${data.specialRequests ? `
              <div class="section">
                <div class="section-title">4. Special Client Requests & Dietary Needs</div>
                <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 6px; padding: 14px; font-size: 13.5px; color: #292524;">
                  ${data.specialRequests.replace(/\n/g, '<br/>')}
                </div>
              </div>
            ` : ''}

            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #065f46;">
              ✓ <strong>Action Required by Operations:</strong> Verify ground availability, confirm vehicle and licensed guide allocations, and issue official B2B VAT Invoice to <em>${data.consultantEmail}</em>.
            </div>
          </div>

          <div class="footer">
            Baobab Destination Management Company (DMC) • Sisli, Istanbul, Turkey • TURSAB License #A-15764<br/>
            24/7 Operations Desk: +90 850 309 31 63 • WhatsApp: +90 544 836 28 45
          </div>
        </div>
      </body>
      </html>
    `;

    // Confirmation Email dispatched to the Travel Advisor
    const advisorVoucherHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #121316; color: #ffffff; padding: 28px; text-align: center; border-bottom: 4px solid #f05a28; }
          .brand { font-size: 12px; color: #f05a28; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; }
          .title { margin: 8px 0 0 0; font-size: 22px; font-weight: bold; color: #ffffff; }
          .content { padding: 28px; }
          .ref-banner { background: #fff7ed; border: 1px solid #ffedd5; border-radius: 8px; padding: 16px; margin: 18px 0; text-align: center; }
          .ref-title { font-size: 11px; text-transform: uppercase; font-weight: bold; color: #c2410c; letter-spacing: 0.05em; }
          .ref-num { font-size: 22px; font-weight: bold; color: #9a3412; font-family: monospace; margin-top: 4px; }
          .details-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13.5px; }
          .details-table td { padding: 8px 10px; border-bottom: 1px solid #f3f4f6; }
          .footer { background: #f9fafb; padding: 20px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">Baobab DMC Turkey • Travel Advisor Trade Desk</div>
            <div class="title">Booking Confirmation Voucher</div>
          </div>

          <div class="content">
            <p>Dear <strong>${data.consultantName}</strong> (${data.agencyName || 'Travel Advisor'}),</p>
            <p>Thank you for booking with <strong>Baobab DMC Turkey</strong>. Your client reservation for <strong>${data.leadCustomerName}</strong> is confirmed under our <strong>25% Wholesale Trade Tariff</strong>.</p>

            <div class="ref-banner">
              <div class="ref-title">Trade Booking Confirmation Reference</div>
              <div class="ref-num">${bookingReference}</div>
            </div>

            <table class="details-table">
              <tr><td><strong>Tour / Excursion:</strong></td><td>${data.tripTitle}</td></tr>
              <tr><td><strong>Travel Date:</strong></td><td>${data.travelDate || 'Confirmed Date'}</td></tr>
              <tr><td><strong>Lead Passenger:</strong></td><td>${data.leadCustomerName} (${guestCount} Guests)</td></tr>
              <tr><td><strong>Retail Value:</strong></td><td>$${totalGrossRetail.toLocaleString()} USD</td></tr>
              <tr><td><strong>25% Net Payable to DMC:</strong></td><td><strong style="color: #f05a28;">$${totalNetPayable.toLocaleString()} USD</strong></td></tr>
              <tr><td><strong>Advisor Commission Earned:</strong></td><td><strong style="color: #059669;">+$${advisorCommission.toLocaleString()} USD</strong></td></tr>
            </table>

            <p>Our ground operations desk in Istanbul is preparing the final service vouchers and VIP arrival welcome pack. Your dedicated B2B Account Manager will be in touch shortly.</p>

            <p><strong>Emergency 24/7 Operations Desk:</strong><br/>
            Phone: +90 850 309 31 63<br/>
            WhatsApp: +90 544 836 28 45<br/>
            Email: trade@baobabdmc.com</p>

            <p style="margin-top: 24px;">Warm regards,<br/><strong>Baobab DMC Ground Operations Team</strong></p>
          </div>

          <div class="footer">
            Baobab Destination Management Company • Sisli, Istanbul, Turkey<br/>
            TURSAB Grade-A Licensed Tour Operator #15764
          </div>
        </div>
      </body>
      </html>
    `;

    const resend = getResendClient();

    if (!resend) {
      console.log(`[Resend Notice] RESEND_API_KEY not configured. Simulated Trade Booking email delivery for Ref ${bookingReference} to ${recipientEmail} and ${data.consultantEmail}`);
      return res.json({
        success: true,
        simulated: true,
        bookingReference,
        message: 'Booking confirmed and recorded. Configure RESEND_API_KEY for live delivery.',
      });
    }

    // Send internal email to DMC management
    const internalResult = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: data.consultantEmail,
      subject: subject,
      html: internalBookingHtml,
    });

    // Send advisor confirmation copy
    let advisorResult = null;
    try {
      advisorResult = await resend.emails.send({
        from: fromEmail,
        to: [data.consultantEmail],
        subject: `Booking Confirmed: ${data.tripTitle} for ${data.leadCustomerName} (Ref: ${bookingReference})`,
        html: advisorVoucherHtml,
      });
    } catch (err: any) {
      console.warn('[Resend Advisor Copy Warning]:', err?.message || err);
    }

    return res.json({
      success: true,
      simulated: false,
      bookingReference,
      internalEmailId: internalResult?.data?.id,
      advisorEmailId: advisorResult?.data?.id,
      message: 'Booking confirmation emails successfully dispatched via Resend.',
    });
  } catch (error: any) {
    console.error('[Resend Booking Dispatch Error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to dispatch booking confirmation email.',
    });
  }
});

// Vite middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
