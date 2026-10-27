import { getAllIfsc } from "@/lib/dataService";
import ClientIfscDirectory from "./ClientIfscDirectory";

const PER_PAGE = 20;

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
}

export default async function IfscDirectoryPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const page = Math.max(1, parseInt(sp.page || "1", 10));
  const branches = await getAllIfsc(page, PER_PAGE);

  const formattedBranches = branches.map(b => ({
    ...b,
    url: `/ifsc/${b.ifsc}`
  }));

  const totalPages = Math.ceil(150000 / PER_PAGE);

  return (
    <ClientIfscDirectory
      initialBranches={formattedBranches}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
