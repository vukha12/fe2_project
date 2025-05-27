export interface IApplication {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  cvUrl: string;
  coverLetter?: string;
}
