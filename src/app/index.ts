import '../style.css'
import { Container, Footer, Header } from './components'
import { activateRouter } from './routing/router.ts';
import { defineOurWebComponents } from './web-components/index.ts';

defineOurWebComponents(); //first thing!
activateRouter();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header()}
  ${Container(`
    <main id="root"></main>
  `)}
  ${Footer()}
`
