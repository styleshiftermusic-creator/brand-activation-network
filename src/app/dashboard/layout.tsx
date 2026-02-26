import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/dashboard/ProtectedRoute";

export const metadata: Metadata = {
    title: "Course Dashboard | AI Workshop Engine",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
