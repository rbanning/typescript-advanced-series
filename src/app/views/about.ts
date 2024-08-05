import { IRouteProps } from "../routing/route.model";
import { advisorRepo } from "../series/advisor.repo";

export function AboutView(_props: IRouteProps) {

return `
    <h1>About</h1>
    <div class="hero">
      <kpc-unsplash-image key="row-of-oxford-flats"></kpc-unsplash-image>
    </div>

    <div style="margin: 4rem 0;">
      <kpc-tabs-horizontal format="button">
        <kpc-tab-label label-for="one" active="true">One</kpc-tab-label>
        <kpc-tab-view id="one">
          <h2>One</h2>
          <p>This is the content that will appear in a tab.</p>
          <p>Another paragraph of content</p>
        </kpc-tab-view>

        <kpc-tab-label label-for="two">Two</kpc-tab-label>
        <kpc-tab-view id="two">
          <h2>Two</h2>
          <p>This is the content that will appear in a tab.</p>
          <p>Another paragraph of content</p>
        </kpc-tab-view>

        <kpc-tab-label label-for="three">Three</kpc-tab-label>
        <kpc-tab-view id="three">
          <h2>Three</h2>
          <p>This is the content that will appear in a tab.</p>
          <p>Another paragraph of content</p>
        </kpc-tab-view>

        <kpc-tab-label label-for="four">Four</kpc-tab-label>
        <kpc-tab-view id="four">
          <h2>Four</h2>
          <p>This is the content that will appear in a tab.</p>
          <p>Another paragraph of content</p>
        </kpc-tab-view>

      </kpc-tabs-horizontal>
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