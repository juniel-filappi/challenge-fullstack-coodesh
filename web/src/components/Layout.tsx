import Head from "next/head";
import { ReactElement } from "react";
import { HeaderDashboard } from "./HeaderDashboard";

interface LayoutProps {
  title: string;
  children?: ReactElement[] | ReactElement;
}

export function Layout({ children, title }: LayoutProps) {
  const titleWithPrefix = title ? `${title} - Coodesh` : "Coodesh";
  return (
    <>
      <Head>
        <title>{titleWithPrefix}</title>
      </Head>
      <HeaderDashboard />
      <div className="p-8">{children}</div>
    </>
  );
}
