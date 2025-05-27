export interface IJob {
  employer_id: Types.ObjectId;
  job_title: string;
  company: string;
  province: number;
  district: number;
  job_type: number;
  skill: number;
  experience: number;
  salary: string;
  description: string;
  interest: string;
}
