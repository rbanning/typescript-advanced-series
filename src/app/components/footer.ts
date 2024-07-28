import styles from './footer.module.css';

import hallpassLogo from '../../assets/hallpass.png';
import viteLogo from '../../assets/vite.svg';

export function footer() {
  return `
    <footer class="${styles.primary}">
      <section>
        <img src="${hallpassLogo}" class="logo mini vanilla" alt="Hallpass logo" />
        <a href="https://academy.hallpassandfriends.com" target="_blank">Created by Hallpass</a>
      </section>
      <section>
        <img src="${viteLogo}" class="logo mini vanilla" alt="Vite logo" />
        <a href="https://vitejs.dev" target="_blank">Powered by Vite</a>
      </section>
    </footer>
  `
}