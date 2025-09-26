"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavigationList.module.css";

const links = [
  { href: "/profile", label: "My profile" },
  { href: "/appointments", label: "My appointments" },
  { href: "/business", label: "Business list" },
];

export const NavigationList = () => {
  const pathname = usePathname();

  return (
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
  );
};
