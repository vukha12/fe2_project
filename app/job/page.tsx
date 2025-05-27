"use client";

import { Separator } from "@/components/ui/separator";
import {
  fetchExperience,
  fetchJobTypes,
  fetchSkills,
  fetchProvinces,
  fetchDistricts,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { FaBriefcase, FaMoneyCheckAlt } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import Link from "next/link";

type Job = {
  _id: string;
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
};

type all = {
  code: number;
  name: string;
};

export default function JobPage() {
  const [provinces, setProvinces] = useState<all[]>([]);
  const [districts, setDistricts] = useState<all[]>([]);
  const [jobtypes, setJobtypes] = useState<all[]>([]);
  const [skills, setSkills] = useState<all[]>([]);
  const [experience, setExperience] = useState<all[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const getNameByCode = (
    list: { code: number; name: string }[],
    code: number | string
  ) => {
    return (
      list.find((item) => item.code === Number(code))?.name || "Không xác định"
    );
  };

  useEffect(() => {
    fetchProvinces().then(setProvinces);
    fetchJobTypes().then(setJobtypes);
    fetchSkills().then(setSkills);
    fetchExperience().then(setExperience);
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/job");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const firstProvinceCode = provinces[0]?.code;
    if (firstProvinceCode) {
      fetchDistricts(firstProvinceCode).then(setDistricts);
    }
  }, [provinces]);
  if (loading) return <p>Đang tải danh sách công việc...</p>;
  return (
    <div className="w-full min-h-screen ">
      <div className="flex flex-col justify-center items-center line mt-1">
        <div className="flex rounded-lg flex-col space-y-1">
          {jobs.map((job) => (
            <Link href={`/job/${job._id}`} key={job._id}>
              <div className=" flex flex-col space-y-0.5 bg-white  p-2 rounded border-1 border-gray-300 hover:shadow-md">
                <div className="flex">
                  <div className="flex justify-center items-center bg-stone-100 rounded-xl mr-2 w-20 h-20">
                    <RiShoppingBag4Line size={66} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-blue-500 ">
                      {job.job_title}
                    </h1>
                    <p className="font-semibold">{job.company}</p>
                    <div>
                      <span className="text-stone-600 font-light">
                        {getNameByCode(provinces, job.province)}
                        {" - "}
                        {getNameByCode(districts, job.district)}
                      </span>
                    </div>
                  </div>
                </div>
                <Separator className="bg-gray-400 mt-2 mb-2" />

                <div className=" flex space-x-4 justify-between">
                  <div className="flex">
                    <div className="flex justify-center w-10 bg-stone-100 items-center rounded mr-1 text-gray-500">
                      <FaBriefcase size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs">Công việc:</span>
                      <span className="font-semibold bg-stone-100 px-2 rounded-full mt-1 font-[sx]">
                        {getNameByCode(jobtypes, job.job_type)}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex justify-center w-10 bg-stone-100 items-center rounded mr-1 text-gray-500">
                      <IoTimeOutline size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs">Kinh nghiệm:</span>
                      <span className="font-semibold bg-stone-100 px-2 rounded-full mt-1 font-[sx]">
                        {getNameByCode(experience, job.experience)}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex justify-center w-10 bg-stone-100 items-center rounded mr-1 text-gray-500">
                      <HiDocumentText size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs">Kỹ năng:</span>
                      <span className="font-semibold bg-stone-100 px-2 rounded-full mt-1 font-[sx]">
                        {getNameByCode(skills, job.skill)}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex justify-center w-10 bg-stone-100 items-center rounded mr-1 text-gray-500">
                      <FaMoneyCheckAlt size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs">Mức lương:</span>
                      <span className="font-semibold bg-stone-100 px-2 rounded-full mt-1 font-[sx] uppercase">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
