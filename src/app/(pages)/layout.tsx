import { Header } from "../ui/components/Header/Header";
import { Footer } from "../ui/components/Footer/Footer";
import AuthProvider from "../ui/components/AuthProvider";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
    </>
  );
}
