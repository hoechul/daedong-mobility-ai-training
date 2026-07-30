import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import ToolCompare from "@/components/ToolCompare";
import Curriculum from "@/components/Curriculum";
import Practice from "@/components/Practice";
import Tips from "@/components/Tips";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Overview />
        <ToolCompare />
        <Curriculum />
        <Practice />
        <Tips />
        <Resources />
      </main>
      <Footer />
    </>
  );
}
