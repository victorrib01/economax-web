import { Inter } from "next/font/google";
import Menu from "./_components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Economax Web",
  description: "Financial app",
};

export default function PrivateLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex items-center justify-center max-w-full">
          <main className="min-h-screen h-screen w-full max-w-[512px] p-8 bg-slate-50">
            <div
              className="
                flex flex-col items-center justify-between h-full
                "
            >
              <div className="h-[92%] w-full">{children}</div>
              <Menu />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
