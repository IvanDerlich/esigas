'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navBar.module.css';
import logo from '@/images/logo.png';

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
};

export default function Navbar({ links }: NavbarProps) {
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

        <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
        <label htmlFor="menu-toggle" className={styles.menuIcon}>
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav className={styles.nav}>
          {links.map(({ label, href }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
