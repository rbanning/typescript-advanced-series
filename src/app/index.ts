import '../style.css'
import academyLogo from '../assets/academy-logo.svg';
import hallpassLogo from '../assets/hallpass.png';
import viteLogo from '../assets/vite.svg';
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://academy.hallpassandfriends.com" target="_blank">
      <img src="${academyLogo}" class="logo" alt="Hallpass Academy logo" />
    </a>
    <h1>Advanced Typescript Series</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Getting Started
    </p>
    <footer>
      <section>
        <img src="${hallpassLogo}" class="logo mini vanilla" alt="Hallpass logo" />
        <a href="https://academy.hallpassandfriends.com" target="_blank">Created by Hallpass</a>
      </section>
      <section>
        <img src="${viteLogo}" class="logo mini vanilla" alt="Vite logo" />
        <a href="https://vitejs.dev" target="_blank">Powered by Vite</a>
      </section>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
