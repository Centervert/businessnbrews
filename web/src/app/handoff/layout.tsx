import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Handoff | Business & Brews",
  description: "Handoff document for the Business & Brews website and coordinator dashboard.",
  robots: "noindex, nofollow",
};

export default function HandoffLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `.handoff-root h1, .handoff-root h2, .handoff-root h3, .handoff-root h4, .handoff-root h5, .handoff-root h6 { font-family: inherit; }` }} />
      <div className="handoff-root">{children}</div>
    </>
  );
}
