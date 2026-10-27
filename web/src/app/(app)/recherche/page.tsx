import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchExperience } from "@/components/search/SearchExperience";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { getSearchIndex } from "@/lib/data/search";

export const metadata: Metadata = { title: "Recherche" };

export default async function SearchPage() {
  const index = await getSearchIndex();

  // The query comes from the URL, only known in the browser: the results stream in.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchExperience index={index} />
    </Suspense>
  );
}
