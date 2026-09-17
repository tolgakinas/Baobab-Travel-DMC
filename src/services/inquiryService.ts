import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseErrors';

export interface InquiryRecord {
  id?: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  companyOrAgency?: string;
  country?: string;
  role?: string;
  tripType?: string;
  selectedTripTitle?: string;
  guestCount?: string;
  budgetTier?: string;
  estimatedDate?: string;
  destinations?: string[];
  preferredExperiences?: string[];
  specialRequests?: string;
  formMode?: string;
  status?: 'new' | 'in_review' | 'proposal_sent' | 'confirmed' | 'archived';
  createdAt: string;
  userId?: string;
}

export async function saveInquiryToFirestore(inquiry: InquiryRecord): Promise<string> {
  const inquiryId = inquiry.referenceNumber.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' + Date.now();
  const path = `inquiries/${inquiryId}`;

  const cleanPayload: Record<string, any> = {
    id: inquiryId,
    referenceNumber: inquiry.referenceNumber,
    fullName: inquiry.fullName.slice(0, 120),
    email: inquiry.email.slice(0, 150),
    createdAt: inquiry.createdAt || new Date().toISOString(),
    status: 'new',
  };

  if (inquiry.phone) cleanPayload.phone = inquiry.phone.slice(0, 60);
  if (inquiry.companyOrAgency) cleanPayload.companyOrAgency = inquiry.companyOrAgency.slice(0, 150);
  if (inquiry.country) cleanPayload.country = inquiry.country.slice(0, 80);
  if (inquiry.tripType) cleanPayload.tripType = inquiry.tripType.slice(0, 100);
  if (inquiry.selectedTripTitle) cleanPayload.selectedTripTitle = inquiry.selectedTripTitle.slice(0, 150);
  if (inquiry.guestCount) cleanPayload.guestCount = inquiry.guestCount.slice(0, 40);
  if (inquiry.budgetTier) cleanPayload.budgetTier = inquiry.budgetTier.slice(0, 80);
  if (inquiry.estimatedDate) cleanPayload.estimatedDate = inquiry.estimatedDate.slice(0, 80);
  if (inquiry.destinations && Array.isArray(inquiry.destinations)) {
    cleanPayload.destinations = inquiry.destinations.slice(0, 20);
  }
  if (inquiry.preferredExperiences && Array.isArray(inquiry.preferredExperiences)) {
    cleanPayload.preferredExperiences = inquiry.preferredExperiences.slice(0, 20);
  }
  if (inquiry.specialRequests) cleanPayload.specialRequests = inquiry.specialRequests.slice(0, 2000);
  if (inquiry.formMode) cleanPayload.formMode = inquiry.formMode.slice(0, 50);
  if (auth.currentUser?.uid) cleanPayload.userId = auth.currentUser.uid;

  try {
    await setDoc(doc(db, 'inquiries', inquiryId), cleanPayload);
    console.log(`[Firestore] Inquiry ${inquiry.referenceNumber} persisted successfully.`);
    return inquiryId;
  } catch (error) {
    console.warn(`[Firestore Notice] Could not persist to Firestore directly:`, error);
    try {
      handleFirestoreError(error, OperationType.CREATE, path);
    } catch {
      // Non-fatal if offline
    }
    return inquiryId;
  }
}
