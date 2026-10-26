import type { Metadata } from "next";
import { CreatorCard } from "@/components/home/CreatorCard";
import { DailyTrilogy } from "@/components/home/DailyTrilogy";
import { ResumeCard } from "@/components/home/ResumeCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/works/WorkCard";
import { getHomeFeed } from "@/lib/data/home";

export const metadata: Metadata = { title: "Ma journée culturelle" };

export default async function HomePage() {
  const feed = await getHomeFeed();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <DailyTrilogy moods={feed.moods} trilogies={feed.trilogies} />

      <section className="flex flex-col gap-4">
        <SectionHeader title="Reprendre" href="/bibliotheque" />
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {feed.resume.map((item) => (
            <li key={item.id}>
              <ResumeCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      {feed.rows.map((row) => (
        <section key={row.domain} className="flex flex-col gap-4">
          <SectionHeader title={row.title} href={row.href} linkLabel="Explorer" />
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {row.items.map((work) => (
              <li key={work.id}>
                <WorkCard work={work} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="flex flex-col gap-4">
        <SectionHeader title="Créateurs émergents à suivre" href="/explorer" />
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {feed.creators.map((creator) => (
            <li key={creator.pseudo}>
              <CreatorCard creator={creator} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
