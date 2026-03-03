import { redirect } from "next/navigation";

export const metadata = {
    title: "Login | Brand Activation Network",
};

export default function LoginPage() {
    redirect("/dashboard");
}
