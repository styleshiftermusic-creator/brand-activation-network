import ResultsClient from "./ResultsClient";

export const metadata = {
  title: "Success Stories & Results",
  description: "See the math behind the system and read the case studies of founders who successfully engineered their own leverage.",
  alternates: {
    canonical: "/results",
  },
  openGraph: {
    title: "Success Stories & Results | Brand Activation Network",
    description: "See the math behind the system and read case studies of founders who successfully engineered their own leverage.",
    url: "https://brandactivationnetwork.com/results",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ResultsPage() {
  return <ResultsClient />;
}
