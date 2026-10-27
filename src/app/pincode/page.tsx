import { getAllPincodes } from "@/lib/dataService";
import ClientPincodeDirectory from "./ClientPincodeDirectory";

const PER_PAGE = 20;

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
}

export default async function PincodeDirectoryPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const page = Math.max(1, parseInt(sp.page || "1", 10));
  const pincodes = await getAllPincodes(page, PER_PAGE);

  const formattedPincodes = pincodes.map(pc => ({
    ...pc,
    url: `/pincode/${pc.pincode}`
  }));

  const totalPages = Math.ceil(2000 / PER_PAGE);

  return (
    <ClientPincodeDirectory
      initialPincodes={formattedPincodes}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
