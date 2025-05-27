export async function fetchDistricts(provinceCode: number) {
  const url = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Lỗi khi tải quận/huyện");
  const data = await res.json();
  return data.districts || [];
}

export async function fetchJobTypes() {
  const url = "/api/jobtypes";
  const res = await fetch(url);

  if (!res.ok) {
    console.error("Lỗi response từ API:", res.status);
    throw new Error("Lỗi khi tải loại công việc");
  }

  const data = await res.json();
  return data;
}

export async function fetchExperience() {
  const url = "/api/experience";
  const res = await fetch(url);

  if (!res.ok) {
    console.error("Lỗi response từ API:", res.status);
    throw new Error("Lỗi khi tải loại công việc");
  }

  const data = await res.json();
  return data;
}

export async function fetchSkills() {
  const url = "/api/skill";
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Lỗi response từ API:", res.status);
    throw new Error("Lỗi khi tải kỹ năng");
  }

  const data = await res.json();
  return data;
}

export async function fetchProvinces() {
  const url = "/api/province";
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Lỗi response từ API:", res.status);
    throw new Error("Lỗi khi tải tỉnh/thành phố");
  }
  const data = await res.json();
  return data;
}

export async function fetchJobById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Lỗi khi fetch job theo id:", err);
    return null;
  }
}
