"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/actions/auth";
import styles from "./Header.module.css";

const links = [
  { href: "/profile", label: "My profile" },
  { href: "/appointments", label: "My appointments" },
  { href: "/business", label: "Business list" },
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          {links.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                className={`${styles.button_nav} ${
                  isActive ? styles.activeLink : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          className={styles.button_logout}
          type="button"
          onClick={handleLogout}
        >
          Logout {"[-->"}
        </button>
      </div>
    </header>
  );
};
