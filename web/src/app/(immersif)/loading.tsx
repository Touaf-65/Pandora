import { PageSkeleton } from "@/components/ui/PageSkeleton";

export default function Loading() {
  return (
    <div className="px-4 py-8 md:px-8">
      <PageSkeleton />
    </div>
  );
}
