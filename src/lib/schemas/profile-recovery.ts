import { z } from "zod";

export const recoveryGoalStatusSchema = z.enum(["onTrack", "pending", "needsReview", "complete"]);

export const recoveryGoalSchema = z.object({
  id: z.string(),
  title: z.string(),
  targetDate: z.string(),
  status: recoveryGoalStatusSchema,
  progress: z.number().int().min(0).max(100),
});

export const treatmentPlanSummarySchema = z.object({
  adherenceCompleted: z.number().int().min(0),
  adherenceTotal: z.number().int().min(1),
  nextMilestone: z.string(),
  nextMilestoneEta: z.string(),
});

export const activeProgramSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  durationMinutes: z.number().int().min(1),
  exerciseCount: z.number().int().min(1),
  practitionerName: z.string(),
  currentDayLabel: z.string(),
});

export const recentRehabSessionStatusSchema = z.enum(["completed", "paused", "skipped"]);

export const recentRehabSessionSchema = z.object({
  id: z.string(),
  date: z.string(),
  programTitle: z.string(),
  durationMinutes: z.number().int().min(0).optional(),
  painBefore: z.number().int().min(0).max(10).optional(),
  painAfter: z.number().int().min(0).max(10).optional(),
  status: recentRehabSessionStatusSchema,
});

export type RecoveryGoalStatus = z.infer<typeof recoveryGoalStatusSchema>;
export type RecoveryGoal = z.infer<typeof recoveryGoalSchema>;
export type TreatmentPlanSummary = z.infer<typeof treatmentPlanSummarySchema>;
export type ActiveProgramSummary = z.infer<typeof activeProgramSummarySchema>;
export type RecentRehabSessionStatus = z.infer<typeof recentRehabSessionStatusSchema>;
export type RecentRehabSession = z.infer<typeof recentRehabSessionSchema>;

export type RecoveryData = {
  goals: RecoveryGoal[];
  treatmentPlan: TreatmentPlanSummary | null;
  activeProgram: ActiveProgramSummary | null;
  recentSessions: RecentRehabSession[];
};
