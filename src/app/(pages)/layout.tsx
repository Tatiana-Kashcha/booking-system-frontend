import { Header } from "../ui/components/Header/Header";
import { Footer } from "../ui/components/Footer/Footer";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
