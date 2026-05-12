export type PatientType = "new" | "returning";

export type VisitType = "in-person" | "video";

export type ServiceBrowseMode = "specialist" | "symptom";

export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export type Service = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  durationMinutes: number;
  priceEur: number;
  category: "osteopathy" | "physiotherapy" | "rehabilitation";
  icon: string;
};

export type Practitioner = {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  specialties: string[];
};

export type TimeSlotData = {
  id: string;
  time: string;
  timeOfDay: TimeOfDay;
  available: boolean;
};

export type DayData = {
  date: string;
  available: boolean;
  slots: TimeSlotData[];
};

export type BookingFormValues = {
  patientType: PatientType | null;
  visitType: VisitType | null;
  serviceId: string | null;
  practitionerId: string | null;
  date: string | null;
  timeSlotId: string | null;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
};

export type BookingConfirmationData = {
  bookingCode: string;
  serviceName: string;
  practitionerName: string;
  date: string;
  time: string;
  durationMinutes: number;
  location: string;
  priceEur: number;
};

export type Appointment = {
  id: string;
  status: AppointmentStatus;
  serviceName: string;
  practitionerName: string;
  date: string;
  time: string;
  durationMinutes: number;
  location: string;
  priceEur: number;
  bookingCode: string;
};
