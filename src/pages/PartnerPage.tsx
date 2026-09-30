import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { PartnerWithUsSection } from '../components/PartnerWithUsSection';
import { InquiryForm } from '../components/InquiryForm';
import { Handshake, Calendar, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/dmcData';

interface PartnerPageProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
  onNavigateHome: () => void;
}

export const PartnerPage: React.FC<PartnerPageProps> = ({
  onOpenInquiry,
  onOpenCalendly,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Partner With Baobab DMC Turkey"
        subtitle="Exclusive B2B inbound partnerships for international tour operators, travel advisors, and wholesale agencies. Guaranteed net rates, white-label proposals, and 24/7 on-the-ground support."
        categoryBadge="B2B Travel Trade Partnership"
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Partner With Us' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: 'Submit B2B RFP',
          onClick: () => onOpenInquiry({ source: 'Partner Page' }),
          icon: <Handshake className="w-4 h-4" />
        }}
        secondaryButton={onOpenCalendly ? {
          label: 'Schedule Discovery Call',
          onClick: () => onOpenCalendly('b2b-discovery')
        } : undefined}
      />

      <div className="py-6">
        <PartnerWithUsSection
          onOpenInquiry={() => onOpenInquiry({ source: 'Partner Page' })}
          onOpenCalendly={() => onOpenCalendly?.('b2b-discovery')}
        />

        {/* Direct Contact Cards */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <Mail className="w-5 h-5 text-[#F05A28]" />
              <h3 className="font-bold text-neutral-900 text-sm">Direct B2B Email</h3>
              <p className="text-xs text-neutral-500">24-hour turnaround for tailored quotes</p>
              <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-xs font-semibold text-[#F05A28] hover:underline block pt-1">
                {COMPANY_CONTACT.email}
              </a>
            </div>

            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <Phone className="w-5 h-5 text-[#F05A28]" />
              <h3 className="font-bold text-neutral-900 text-sm">Phone & WhatsApp</h3>
              <p className="text-xs text-neutral-500">Direct operator & operations concierge</p>
              <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="text-xs font-semibold text-[#F05A28] hover:underline block pt-1">
                {COMPANY_CONTACT.phone}
              </a>
            </div>

            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <MapPin className="w-5 h-5 text-[#F05A28]" />
              <h3 className="font-bold text-neutral-900 text-sm">Istanbul Headquarters</h3>
              <p className="text-xs text-neutral-500">TURSAB License #12458</p>
              <span className="text-xs text-neutral-700 block pt-1">
                {COMPANY_CONTACT.address}
              </span>
            </div>
          </div>
        </div>

        {/* RFP Inquiry Form */}
        <div id="contact-form">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
};
