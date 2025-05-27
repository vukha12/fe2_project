export async function fetchDistricts(provinceCode: number) {
  const url = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Lỗi khi tải quận/huyện");
  const data = await res.json();
  return data.districts || [];
}
