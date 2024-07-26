import './style.css'
import hallpassLogo from '/hallpass.png'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${hallpassLogo}" class="logo" alt="Hallpass logo" />
    </a>
    <h1>Advanced Typescript Series</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Getting Started
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
