import DashboardLoginLayout from "./login/DashboardLoginLayout";

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return <DashboardLoginLayout>{children}</DashboardLoginLayout>;
}
