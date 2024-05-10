import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeartScript",
  description: "HeartScript is your personal emotional journal and diary. Write down your thoughts, experiences, and feelings, and see them come to life on the page. With HeartScript, every entry is a reflection of your heart's journey. Through its intuitive interface, HeartScript helps you explore the depths of your emotions and understand your innermost feelings. Begin your emotional journey with HeartScript today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
