import type { RecoveryData } from "@/lib/schemas/profile-recovery";

export const MOCK_RECOVERY_DATA: RecoveryData = {
  goals: [
    {
      id: "g1",
      title: "Reducir dolor lumbar a 3/10",
      targetDate: "2026-06-15",
      status: "onTrack",
      progress: 60,
    },
    {
      id: "g2",
      title: "Recuperar movilidad cervical completa",
      targetDate: "2026-07-01",
      status: "onTrack",
      progress: 80,
    },
    {
      id: "g3",
      title: "Fortalecer musculatura core",
      targetDate: "2026-08-01",
      status: "pending",
      progress: 40,
    },
  ],
  treatmentPlan: {
    adherenceCompleted: 8,
    adherenceTotal: 12,
    nextMilestone: "Evaluación intermedia",
    nextMilestoneEta: "2026-05-28",
  },
  activeProgram: {
    id: "prog-1",
    title: "Estabilización lumbar fase 2",
    category: "Rehabilitación",
    durationMinutes: 25,
    exerciseCount: 6,
    practitionerName: "Dra. María García",
    currentDayLabel: "3 de 5",
  },
  recentSessions: [
    {
      id: "s1",
      date: "2026-05-10",
      programTitle: "Estabilización lumbar fase 2",
      durationMinutes: 22,
      painBefore: 5,
      painAfter: 3,
      status: "completed",
    },
    {
      id: "s2",
      date: "2026-05-08",
      programTitle: "Estabilización lumbar fase 2",
      durationMinutes: 18,
      painBefore: 6,
      painAfter: 4,
      status: "completed",
    },
    {
      id: "s3",
      date: "2026-05-06",
      programTitle: "Movilidad cervical",
      status: "skipped",
    },
  ],
};
