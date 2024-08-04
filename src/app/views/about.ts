import { IRouteProps } from "../routing/route.model";
import { advisorRepo } from "../series/advisor.repo";

export function AboutView(_props: IRouteProps) {

return `
    <h1>About</h1>
    <div class="hero">
      <kpc-unsplash-image key="row-of-oxford-flats"></kpc-unsplash-image>
    </div>

    <div style="margin: 4rem 0; padding-top: 1rem; border-top: solid 1px lightgrey;">
      <h3 class="with-space">Advisors</h3>
      ${advisorRepo.map(advisor => (`
        <a href="${advisor.href}" style="margin: 0.5rem 0; display: flex; flex-direction: column;">
          <span style="font-size: 1.4rem;">Dr. ${advisor.name}</span>
          <span class="text-accent">Dept. of ${advisor.dept}</span>
        </a>
        `)).join('')}
    </div>
  `;
}