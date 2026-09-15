import React from 'react';
import { InquiryForm } from './InquiryForm';
import { InquiryFormData } from '../types';
import { X } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<InquiryFormData>;
  onOpenCalendly?: (eventTypeId?: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onOpenCalendly,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-5xl rounded-md shadow-2xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header with Close */}
        <div className="px-6 py-4 bg-[#121316] text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F05A28]">
              {initialData?.formMode === 'b2b-partner'
                ? 'B2B Trade Partnership & Agency Desk'
                : initialData?.selectedTripTitle
                ? 'Direct Trip Inquiry Desk'
                : 'Incoming Turkey Travel Operations'}
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
              {initialData?.formMode === 'b2b-partner'
                ? 'Partner With Us — B2B Trade Registration'
                : initialData?.selectedTripTitle
                ? `Inquiry for ${initialData.selectedTripTitle}`
                : 'Tour Planning & Wholesale Tariff Inquiry'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto flex-1">
          <InquiryForm
            isModal={true}
            initialData={initialData}
            onClose={onClose}
            onOpenCalendly={onOpenCalendly}
          />
        </div>
      </div>
    </div>
  );
};
