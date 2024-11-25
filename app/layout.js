import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Crud API",
  description: "Felipe Grego Struchel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-700">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}