import { notFound } from "next/navigation";
import {
  fetchJobById,
  fetchJobTypes,
  fetchSkills,
  fetchExperience,
  fetchProvinces,
  fetchDistricts,
} from "@/lib/api";

type all = {
  code: number;
  name: string;
};

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await fetchJobById(params.id);
  if (!job) return notFound();

  // Fetch mapping data
  const [jobtypes, skills, experience, provinces] = await Promise.all([
    fetchJobTypes(),
    fetchSkills(),
    fetchExperience(),
    fetchProvinces(),
  ]);

  // Lấy quận huyện từ mã tỉnh
  const districts = await fetchDistricts(job.province);

  const getNameByCode = (list: all[], code: number) =>
    list.find((item) => item.code === Number(code))?.name || "Không xác định";

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600">{job.job_title}</h1>
      <p className="text-xl font-semibold mb-1">{job.company}</p>
      <p className="text-sm text-gray-600 mb-4">
        {getNameByCode(provinces, job.province)} -{" "}
        {getNameByCode(districts, job.district)}
      </p>

      <div className="space-y-2 text-base">
        <p>
          <strong>Loại công việc:</strong>{" "}
          {getNameByCode(jobtypes, job.job_type)}
        </p>
        <p>
          <strong>Kỹ năng:</strong> {getNameByCode(skills, job.skill)}
        </p>
        <p>
          <strong>Kinh nghiệm:</strong>{" "}
          {getNameByCode(experience, job.experience)}
        </p>
        <p>
          <strong>Lương:</strong> {job.salary}
        </p>
        <p>
          <strong>Mô tả công việc:</strong>
        </p>
        <p>{job.description}</p>
        <p>
          <strong>Lý do nên ứng tuyển:</strong>
        </p>
        <p>{job.interest}</p>
      </div>
    </div>
  );
}
