import styles from  './header.module.css';

import academyLogo from '../../../assets/academy-logo.svg';

export function Header() {
  return `
    <header class="${styles.primary}">
      <a href="/">
        <img src="${academyLogo}" class="logo ${styles.logo}" alt="Hallpass Academy logo" />
      </a>
      <div class="${styles.brand}">Advanced Typescript Series</div>
      <nav>
        <a href="./">Home</a>
        <a href="./about">About</a>
        <a href="./contact">Contact</a>
      </nav>
    </header>
  `
}