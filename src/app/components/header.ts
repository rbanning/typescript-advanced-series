import styles from  './header.module.css';

import academyLogo from '../../assets/academy-logo.svg';

export function header() {
  return `
    <header class="${styles.primary}">
      <a href="/">
        <img src="${academyLogo}" class="logo ${styles.logo}" alt="Hallpass Academy logo" />
      </a>
      <h1>Advanced Typescript Series</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact A</a>
      </nav>
    </header>
  `
}