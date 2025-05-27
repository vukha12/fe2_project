export interface IEmployer {
  userId: Types.ObjectId;
  company_name: string;
  province: string;
  district: string;
  company_website?: string;
  company_logo?: string;
  description?: string;
  number_phone: string;
  status: "pending" | "approved";
}
