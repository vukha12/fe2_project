export type JobType = "full-time" | "part-time";

export interface IJob {
  employer_id: Types.ObjectId;
  title: string;
  description: string;
  requirements: string;
  location: string;
  jobType: JobType;
  experienceRequired: number;
  status: "active" | "inactive";
  salaryMin: number;
  salaryMax: number;
}
