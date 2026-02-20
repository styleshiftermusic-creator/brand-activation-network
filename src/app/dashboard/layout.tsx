import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Course Dashboard | AI Workshop Engine",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
