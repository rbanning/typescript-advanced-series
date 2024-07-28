import '../style.css'
import { Container, Footer, Header } from './components'

import { activateRouter } from './routing/router.ts';
activateRouter();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header()}
  ${Container(`
    <main id="root"></main>
  `)}
  ${Footer()}
`
