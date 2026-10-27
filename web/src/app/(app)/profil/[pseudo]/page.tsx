import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Layers, Library, MapPin, MessageSquare, Settings } from "lucide-react";
import { FollowButton } from "@/components/home/FollowButton";
import { GenomeCard } from "@/components/profile/GenomeCard";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Tabs, type Tab } from "@/components/ui/Tabs";
import { Cover } from "@/components/works/Cover";
import { WorkCard } from "@/components/works/WorkCard";
import { domains } from "@/lib/domains";
import { getProfile, getProfilePseudos, type Profile } from "@/lib/data/profiles";

const count = new Intl.NumberFormat("fr-FR");

export async function generateStaticParams() {
  return (await getProfilePseudos()).map((pseudo) => ({ pseudo }));
}

export async function generateMetadata({ params }: PageProps<"/profil/[pseudo]">): Promise<Metadata> {
  const profile = await getProfile((await params).pseudo);
  return { title: profile ? profile.name : "Profil introuvable" };
}

export default function ProfilePage({ params }: PageProps<"/profil/[pseudo]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProfileDetails params={params} />
    </Suspense>
  );
}

async function ProfileDetails({ params }: { params: PageProps<"/profil/[pseudo]">["params"] }) {
  const profile = await getProfile((await params).pseudo);
  if (!profile) notFound();

  const { soft, text } = domains[profile.domain];
  const initials = profile.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  const stats = [
    { label: profile.followers > 1 ? "abonnés" : "abonné", value: profile.followers },
    { label: profile.following > 1 ? "abonnements" : "abonnement", value: profile.following },
    ...(profile.works.length > 0
      ? [{ label: profile.works.length > 1 ? "œuvres" : "œuvre", value: profile.works.length }]
      : []),
  ];

  const tabs: Tab[] = [
    ...(profile.works.length > 0
      ? [{ id: "oeuvres", label: `Œuvres (${profile.works.length})`, content: <WorksPanel profile={profile} /> }]
      : []),
    { id: "activite", label: "Activité", content: <ActivityPanel profile={profile} /> },
    { id: "collections", label: `Collections (${profile.collections.length})`, content: <CollectionsPanel profile={profile} /> },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
        <span className={`flex size-28 shrink-0 items-center justify-center rounded-full text-4xl font-bold ${soft} ${text}`}>
          {initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${soft} ${text}`}>
            {profile.isMe ? `${profile.role} · vous` : profile.role}
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{profile.name}</h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" aria-hidden />
              Membre depuis {profile.joined}
            </span>
          </p>
          <p className="max-w-2xl text-sm leading-relaxed">{profile.bio}</p>
          <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-row-reverse items-baseline gap-1.5">
                <dt className="text-muted">{s.label}</dt>
                <dd className="font-semibold">{count.format(s.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-stretch">
          {profile.isMe ? (
            <>
              <Link href="/compte" className={buttonClasses("secondary")}>
                <Settings className="size-4" aria-hidden />
                Modifier le profil
              </Link>
              <Link href="/bibliotheque" className={buttonClasses("ghost")}>
                <Library className="size-4" aria-hidden />
                Ma bibliothèque
              </Link>
            </>
          ) : (
            <>
              <FollowButton name={profile.name} size="md" />
              <Link href="/messages" className={buttonClasses("secondary")}>
                <MessageSquare className="size-4" aria-hidden />
                Message
              </Link>
            </>
          )}
        </div>
      </Card>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <Tabs tabs={tabs} label={`Contenu du profil de ${profile.name}`} />
        </div>

        <aside className="flex w-full flex-col gap-6 lg:w-80">
          <GenomeCard
            genome={profile.genome}
            genres={profile.topGenres}
            title={profile.isMe ? "Mon génome culturel" : "Génome culturel"}
          />
          {profile.collaborations.length > 0 && (
            <Card className="flex flex-col gap-3">
              <h2 className="text-base font-semibold">Collaborations cross-média</h2>
              <ul className="flex flex-col gap-2">
                {profile.collaborations.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="flex items-center gap-2 text-sm font-medium text-accent-hover hover:underline">
                      <Layers className="size-4 shrink-0" aria-hidden />
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}

function WorksPanel({ profile }: { profile: Profile }) {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
      {profile.works.map((w) => (
        <li key={`${w.domain}-${w.id}`}>
          <WorkCard work={w} />
        </li>
      ))}
    </ul>
  );
}

function ActivityPanel({ profile }: { profile: Profile }) {
  const subject = profile.isMe ? "Vous avez" : `${profile.name} a`;
  return (
    <ol className="flex flex-col gap-3">
      {profile.activity.map((a) => {
        const { icon: Icon, soft, text } = domains[a.domain];
        return (
          <li key={a.action}>
            <Link href={a.href} className="glass group flex items-center gap-4 rounded-card p-4 transition-shadow hover:shadow-lg">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${soft} ${text}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="min-w-0 flex-1 text-sm">
                <span className="font-semibold">{subject}</span>{" "}
                <span className="group-hover:text-accent-hover">{a.action}</span>
              </p>
              <span className="shrink-0 text-xs text-muted">{a.when}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function CollectionsPanel({ profile }: { profile: Profile }) {
  if (profile.collections.length === 0) {
    return <p className="text-sm text-muted">Aucune collection publique pour l’instant.</p>;
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {profile.collections.map((c) => (
        <li key={c.title}>
          <Link href={c.href} className="glass group flex items-center gap-3 rounded-card p-3 transition-shadow hover:shadow-lg">
            <Cover domain={c.domain} className="size-14 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{c.title}</p>
              <p className="text-xs text-muted">
                {c.count} élément{c.count > 1 ? "s" : ""} · {domains[c.domain].label}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
