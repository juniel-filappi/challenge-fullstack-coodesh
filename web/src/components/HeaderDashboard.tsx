import Image from "next/image";
import nookies from "nookies";
import logoImage from "@/assets/logo.svg";
import { IUser } from "@/interfaces/IUser";
import { useEffect, useState } from "react";
import { getAuthUser } from "@/services/auth";
import { useRouter } from "next/router";

export function HeaderDashboard() {
  const { push } = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      const user = await getAuthUser();

      if (user) {
        setUser(user.payload);
      }
    }

    loadUser();
  }, []);

  const handleLogout = () => {
    nookies.destroy(null, "token");
    push("/login");
  };

  return (
    <header className="w-full flex justify-center my-0 mx-auto">
      <div className="w-full flex justify-between items-center py-4 px-2">
        <div className="flex items-center">
          <h1 className="ml-2 text-2xl font-bold">
            <Image src={logoImage} alt="Logo" />
          </h1>
        </div>
        <div className="flex items-center">
          {user?.name}
          <button className="px-5 text-red-500" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
