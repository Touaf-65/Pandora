import type { Metadata } from "next";
import { GenomeOnboarding } from "@/components/onboarding/GenomeOnboarding";

export const metadata: Metadata = { title: "Votre génome culturel" };

export default function OnboardingPage() {
  return <GenomeOnboarding />;
}
