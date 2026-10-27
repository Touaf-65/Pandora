import Link from "next/link";
import { Lock, Music } from "lucide-react";
import { readerHref, type LiteraryWork } from "@/lib/data/literature";

function chapterStatus(work: LiteraryWork, number: number, premium: boolean) {
  const progress = work.progress;
  if (progress && number < progress.chapter) return { label: "Lu", className: "bg-success-soft text-success" };
  if (progress && number === progress.chapter)
    return { label: `En cours · ${progress.percent} %`, className: "bg-accent-soft text-accent-hover" };
  if (premium) return { label: "Premium", className: "bg-lit-soft text-lit" };
  return { label: "Gratuit", className: "bg-surface-muted text-muted" };
}

export function ChapterList({ work }: { work: LiteraryWork }) {
  return (
    <ol className="flex flex-col gap-2">
      {work.chapters.map((chapter) => {
        const premium = chapter.access === "premium";
        const status = chapterStatus(work, chapter.number, premium);
        return (
          <li key={chapter.number}>
            <Link
              href={readerHref(work.slug, chapter.number)}
              className="glass group flex items-center gap-4 rounded-card px-4 py-3.5 transition-shadow hover:shadow-lg"
            >
              <span className="w-8 shrink-0 text-sm font-semibold tabular-nums text-muted">
                {String(chapter.number).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold group-hover:text-accent-hover">{chapter.title}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  {chapter.minutes} min
                  {chapter.soundtrack && (
                    <>
                      <span aria-hidden>·</span>
                      <Music className="size-3.5 text-mus" aria-hidden />
                      bande-son incluse
                    </>
                  )}
                </span>
              </div>
              <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                {premium && status.label === "Premium" && <Lock className="size-3" aria-hidden />}
                {status.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
