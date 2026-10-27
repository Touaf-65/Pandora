import { Suspense } from "react";
import type { Metadata } from "next";
import { Literata } from "next/font/google";
import { notFound } from "next/navigation";
import { Reader } from "@/components/reader/Reader";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { getWork, getWorkSlugs, readerHref } from "@/lib/data/literature";
import { chapterTrackId, getTrack } from "@/lib/data/music";

const literata = Literata({ subsets: ["latin"], variable: "--font-literata" });

export async function generateStaticParams() {
  const slugs = await getWorkSlugs();
  const works = await Promise.all(slugs.map(getWork));
  return works.flatMap((work) =>
    work ? work.chapters.map((c) => ({ slug: work.slug, chapitre: String(c.number) })) : [],
  );
}

async function load(params: PageProps<"/lire/[slug]/[chapitre]">["params"]) {
  const { slug, chapitre } = await params;
  const work = await getWork(slug);
  const index = work?.chapters.findIndex((c) => String(c.number) === chapitre) ?? -1;
  return work && index >= 0 ? { work, index } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/lire/[slug]/[chapitre]">): Promise<Metadata> {
  const found = await load(params);
  if (!found) return { title: "Chapitre introuvable" };
  const chapter = found.work.chapters[found.index];
  return { title: `${chapter.title} — ${found.work.title}` };
}

export default function ReaderPage({ params }: PageProps<"/lire/[slug]/[chapitre]">) {
  // The chapter streams in, so navigations show the skeleton instantly.
  return (
    <Suspense
      fallback={
        <div className="px-4 py-8 md:px-8">
          <PageSkeleton />
        </div>
      }
    >
      <ChapterReader params={params} />
    </Suspense>
  );
}

async function ChapterReader({ params }: { params: PageProps<"/lire/[slug]/[chapitre]">["params"] }) {
  const found = await load(params);
  if (!found) notFound();

  const { work, index } = found;
  const chapter = work.chapters[index];
  const prev = work.chapters[index - 1];
  const next = work.chapters[index + 1];
  const soundtrack = await getTrack(chapterTrackId(work.slug, chapter.number));

  return (
    <div className={literata.variable}>
      <Reader
        workTitle={work.title}
        workHref={`/litterature/${work.slug}`}
        publicDomain={work.license === "Domaine public"}
        chapter={chapter}
        soundtrack={soundtrack}
        chapterCount={work.chapters.length}
        prevHref={prev && readerHref(work.slug, prev.number)}
        nextHref={next && readerHref(work.slug, next.number)}
      />
    </div>
  );
}
