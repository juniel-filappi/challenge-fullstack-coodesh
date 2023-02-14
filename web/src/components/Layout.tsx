import Head from "next/head";
import { ReactElement } from "react";
import { Header } from "./Header";

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
      <Header />
      <div className="p-8">{children}</div>
    </>
  );
}
