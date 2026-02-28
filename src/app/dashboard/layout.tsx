import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/dashboard/ProtectedRoute";

export const metadata = {
    title: "Course Dashboard | Brand Activation Network",
    description: "Access your premium master course and system blueprints.",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
