import Image from "next/image";
import logoImage from "@/assets/logo.svg";

export function Header() {
  return (
    <header
      className="w-full max-w-5xl flex justify-center my-0 mx-auto"
    >
      <div className="w-full flex justify-between items-center py-4 px-2">
        <div className="flex items-center">
          <h1 className="ml-2 text-2xl font-bold">
            <Image src={logoImage} alt="Logo" />
          </h1>
        </div>
        <div className="flex items-center">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <span>Juniel Filappi</span>
          </a>
        </div>
      </div>
    </header>
  );
}
