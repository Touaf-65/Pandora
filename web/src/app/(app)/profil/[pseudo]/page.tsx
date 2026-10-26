import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Profil" };

export default function Page({ params }: PageProps<"/profil/[pseudo]">) {
  return (
    <PagePlaceholder
      title="Profil"
      phase={1}
      description="Le profil public d'un lecteur ou d'un créateur."
      sections={[
        "En-tête : avatar, rôle, suivre, message",
        "Œuvres",
        "Collaborations",
        "Activité et collections",
        "Génome culturel public",
      ]}
      detail={params.then(({ pseudo }) => pseudo)}
    />
  );
}
