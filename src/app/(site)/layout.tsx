import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Everything in the (site) group gets the real chrome. The coming-soon
 * page lives outside it, so it renders on a bare page.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
