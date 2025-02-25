import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLIMB",
  description: "Career Ladder Improvement & Management Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-full">
        <Sidebar/>
        <div className="flex-1 overflow-hidden">
        {children}
        </div>

      </body>
    </html>
  );
}
