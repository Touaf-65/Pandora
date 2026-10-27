/** Full-screen modes without the app shell: reader and chapter editor. */
export default function ImmersiveLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
