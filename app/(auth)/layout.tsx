import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Auge Motos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
