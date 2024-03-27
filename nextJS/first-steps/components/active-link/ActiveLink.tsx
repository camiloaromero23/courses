"use client";

import Link from "next/link";
import styles from "./ActiveLink.module.css";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  text: string;
}

export const ActiveLink: React.FC<Props> = ({ path, text }) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`${styles.link} ${pathName === path ? styles.activeLink : ""}`}
    >
      {text}
    </Link>
  );
};
