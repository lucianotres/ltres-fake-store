import type { Metadata, Viewport } from "next";
import NavMenu from "@components/NavMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "LTres Fake Store",
  description: "App de teste para API Fake Store",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <div className="sidebar">
            <NavMenu />
          </div>
          <main>
            <div className="top-row px-4 auth">
              {/* todo: Falta logout e escolha de cotação aqui */}
            </div>
            <article className="content px-4">
              {children}
            </article>
          </main>
        </div>        
      </body>
    </html>
  );
}
