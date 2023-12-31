"use client";

import { usePathname } from "next/navigation";

import Nav from "./nav";
import HomeNav from './homenav';

export default function Header() {
  const pathname = usePathname();

  return (
    <div>
      {pathname === "/game" ? (
        <nav>
          <Nav />
        </nav>
      ) : <HomeNav />}
    </div>
  );
}
