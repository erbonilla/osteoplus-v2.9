import type {
  Appointment,
  BookingConfirmationData,
  DayData,
  Practitioner,
  Service,
  TimeSlotData,
} from "./types";

export const CLINIC_ADDRESS = "Carrer de Verdí, 12, 08012 Barcelona";
export const CLINIC_PHONE = "+34 93 123 45 67";
export const CLINIC_WHATSAPP = "+34 600 00 00 00";

export const services: Service[] = [
  {
    id: "osteo-general",
    titleKey: "services.osteoGeneral",
    descriptionKey: "services.osteoGeneralDesc",
    durationMinutes: 60,
    priceEur: 65,
    category: "osteopathy",
    icon: "Bone",
  },
  {
    id: "physio-recovery",
    titleKey: "services.physioRecovery",
    descriptionKey: "services.physioRecoveryDesc",
    durationMinutes: 45,
    priceEur: 55,
    category: "physiotherapy",
    icon: "Activity",
  },
  {
    id: "rehab-postop",
    titleKey: "services.rehabPostop",
    descriptionKey: "services.rehabPostopDesc",
    durationMinutes: 60,
    priceEur: 70,
    category: "rehabilitation",
    icon: "HeartPulse",
  },
  {
    id: "osteo-cranial",
    titleKey: "services.osteoCranial",
    descriptionKey: "services.osteoCranialDesc",
    durationMinutes: 50,
    priceEur: 60,
    category: "osteopathy",
    icon: "Brain",
  },
  {
    id: "physio-sport",
    titleKey: "services.physioSport",
    descriptionKey: "services.physioSportDesc",
    durationMinutes: 45,
    priceEur: 55,
    category: "physiotherapy",
    icon: "Zap",
  },
];

export const practitioners: Practitioner[] = [
  {
    id: "dr-garcia",
    name: "Dra. María García",
    role: "Fisioterapeuta",
    imageUrl: "/images/team/physiotherapist.png",
    specialties: ["physiotherapy", "rehabilitation"],
  },
  {
    id: "dr-araya",
    name: "Dr. Michael Araya",
    role: "Osteópata",
    imageUrl: "/images/team/osteopathy.png",
    specialties: ["osteopathy"],
  },
  {
    id: "dr-johnson",
    name: "Dra. Sophia Johnson",
    role: "Rehabilitación",
    imageUrl: "/images/team/rehabilitation.png",
    specialties: ["rehabilitation", "physiotherapy"],
  },
];

function generateTimeSlots(date: string): TimeSlotData[] {
  const base: TimeSlotData[] = [
    { id: `${date}-0900`, time: "09:00", timeOfDay: "morning", available: true },
    { id: `${date}-0945`, time: "09:45", timeOfDay: "morning", available: true },
    { id: `${date}-1030`, time: "10:30", timeOfDay: "morning", available: false },
    { id: `${date}-1115`, time: "11:15", timeOfDay: "morning", available: true },
    { id: `${date}-1200`, time: "12:00", timeOfDay: "morning", available: true },
    { id: `${date}-1400`, time: "14:00", timeOfDay: "afternoon", available: true },
    { id: `${date}-1445`, time: "14:45", timeOfDay: "afternoon", available: true },
    { id: `${date}-1530`, time: "15:30", timeOfDay: "afternoon", available: false },
    { id: `${date}-1615`, time: "16:15", timeOfDay: "afternoon", available: true },
    { id: `${date}-1700`, time: "17:00", timeOfDay: "evening", available: true },
    { id: `${date}-1745`, time: "17:45", timeOfDay: "evening", available: true },
  ];
  return base;
}

export function generateWeekDays(startDate: Date): DayData[] {
  const days: DayData[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const isoDate = d.toISOString().split("T")[0] ?? "";
    const isSunday = d.getDay() === 0;
    days.push({
      date: isoDate,
      available: !isSunday,
      slots: isSunday ? [] : generateTimeSlots(isoDate),
    });
  }
  return days;
}

export const sampleConfirmation: BookingConfirmationData = {
  bookingCode: "OST-2026-A1B2",
  serviceName: "Osteopatía general",
  practitionerName: "Dr. Michael Araya",
  date: "2026-05-15",
  time: "10:30",
  durationMinutes: 60,
  location: CLINIC_ADDRESS,
  priceEur: 65,
};

export const sampleAppointments: Appointment[] = [
  {
    id: "apt-001",
    status: "confirmed",
    serviceName: "Osteopatía general",
    practitionerName: "Dr. Michael Araya",
    date: "2026-05-20",
    time: "10:30",
    durationMinutes: 60,
    location: CLINIC_ADDRESS,
    priceEur: 65,
    bookingCode: "OST-2026-C3D4",
  },
  {
    id: "apt-002",
    status: "confirmed",
    serviceName: "Fisioterapia deportiva",
    practitionerName: "Dra. María García",
    date: "2026-05-25",
    time: "14:00",
    durationMinutes: 45,
    location: CLINIC_ADDRESS,
    priceEur: 55,
    bookingCode: "OST-2026-E5F6",
  },
  {
    id: "apt-003",
    status: "completed",
    serviceName: "Rehabilitación postoperatoria",
    practitionerName: "Dra. Sophia Johnson",
    date: "2026-04-10",
    time: "09:00",
    durationMinutes: 60,
    location: CLINIC_ADDRESS,
    priceEur: 70,
    bookingCode: "OST-2026-G7H8",
  },
  {
    id: "apt-004",
    status: "cancelled",
    serviceName: "Osteopatía craneal",
    practitionerName: "Dr. Michael Araya",
    date: "2026-04-05",
    time: "11:15",
    durationMinutes: 50,
    location: CLINIC_ADDRESS,
    priceEur: 60,
    bookingCode: "OST-2026-I9J0",
  },
];
