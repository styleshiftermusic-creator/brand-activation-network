import { AuthScreen } from "@/components/dashboard/AuthScreen";

export const metadata = {
    title: "Login",
    description: "Secure access terminal for the Brand Activation Network dashboard.",
    alternates: {
        canonical: "/login",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginPage() {
    return <AuthScreen />;
}
