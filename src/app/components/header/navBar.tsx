'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navBar.module.css';
import logo from '@/images/logo.png';
import { Abyssinica_SIL } from 'next/font/google';
import { useRef } from 'react';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
};

export default function Navbar({ links }: NavbarProps) {
  const menuToggleRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Image
          src={logo}
          alt="Logo"
          width={130}
          height={60}
          className={styles.logo}
        />

        <input
          type="checkbox"
          id="menu-toggle"
          className={styles.menuToggle}
          ref={menuToggleRef}
        />
        <label htmlFor="menu-toggle" className={styles.menuIcon}>
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav className={`${abyssinica.className} ${styles.nav}`}>
          {links.map(({ label, href }) => (
            <Link key={label} href={href} onClick={handleLinkClick}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
