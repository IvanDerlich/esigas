'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navBarTwo.module.css';
import logo from '@/images/logo.png';
import { Montserrat } from 'next/font/google';
import { useRef, useState } from 'react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
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

  const [activeLink, setActiveLink] = useState<string>('');

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
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

        <nav className={`${montserrat.className} ${styles.nav}`}>
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => handleLinkClick(href)}
              className={activeLink === href ? styles.active : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
