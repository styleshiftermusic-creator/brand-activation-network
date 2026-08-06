import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories & Results | Brand Activation Network",
  description: "See the math behind the system and read the case studies of founders who successfully engineered their own leverage.",
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
