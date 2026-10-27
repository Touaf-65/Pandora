import type { Metadata } from "next";
import Link from "next/link";
import { Compass, TrendingUp } from "lucide-react";
import { MoodExplorer } from "@/components/explore/MoodExplorer";
import { ResultCard, Thumbnail } from "@/components/search/ResultCard";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { domains, type Domain } from "@/lib/domains";
import { getExploreContent } from "@/lib/data/explore";

export const metadata: Metadata = { title: "Explorer" };

const DOMAIN_ORDER: Domain[] = ["lit", "mus", "art"];

export default async function ExplorePage() {
  const { works, themes, trends } = await getExploreContent();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <header className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-hover">
          <Compass className="size-7" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Explorer</h1>
          <p className="text-base text-muted">Parcourir la culture par humeur, par thème et par tendance, en mêlant les trois arts.</p>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Explorer par humeur" />
        <MoodExplorer works={works} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Collections thématiques" />
        <ul className="flex flex-col gap-6">
          {themes.map((theme) => (
            <li key={theme.id}>
              <Card className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{theme.title}</h3>
                    <p className="text-sm text-muted">{theme.description}</p>
                  </div>
                  <ul className="flex shrink-0 flex-wrap gap-1.5" aria-label="Répartition par domaine">
                    {DOMAIN_ORDER.map((d) => {
                      const n = theme.items.filter((i) => i.domain === d).length;
                      if (n === 0) return null;
                      return (
                        <li key={d} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${domains[d].soft} ${domains[d].text}`}>
                          {n} · {domains[d].label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* A swipeable row on phones, a grid from tablets up. */}
                <ul className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
                  {theme.items.map((item) => (
                    <li key={item.id} className="w-36 shrink-0 snap-start sm:w-auto">
                      <ResultCard item={item} />
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Tendances de la semaine" />
        <Card className="p-2 sm:p-3">
          <ol className="flex flex-col">
            {trends.map(({ item, change, reason }, i) => (
              <li key={item.id}>
                <Link href={item.href} className="group flex items-center gap-4 rounded-xl p-2.5 hover:bg-white/70">
                  <span className="w-6 shrink-0 text-center text-lg font-bold text-muted">{i + 1}</span>
                  <div className="w-12 shrink-0">
                    <Thumbnail item={item} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{item.title}</p>
                    <p className="truncate text-xs text-muted">
                      {domains[item.domain].label} · {reason}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-success">
                    <TrendingUp className="size-3.5" aria-hidden />
                    {change}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </div>
  );
}
