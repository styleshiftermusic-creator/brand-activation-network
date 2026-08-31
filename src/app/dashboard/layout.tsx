
import { ProtectedRoute } from "@/components/dashboard/ProtectedRoute";

export const metadata = {
    title: "Course Dashboard",
    description: "Access your premium master course and system blueprints.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
