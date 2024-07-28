import '../style.css'
import { footer, header } from './components'

import { activateRouter } from './routing/router.ts';
activateRouter();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${header()}
  <main id="root"></main>
  ${footer()}
`
