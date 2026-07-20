import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Work from "@/components/home/Work";
import OpenSourceSection from "@/components/home/OpenSourceSection";
import RecentLog from "@/components/home/RecentLog";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="max-w-maxw mx-auto w-full flex-1 px-4 sm:px-8 md:px-14 xl:px-60 2xl:px-80"
      >
        <Hero />
        <About />
        <Work />
        <OpenSourceSection />
        <RecentLog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
