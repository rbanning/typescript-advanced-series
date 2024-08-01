import { IProblemSet, ISeriesConfigExtended } from "../../series.types";
import { idBadgeInputExampleString } from "./id-badge.input";

export const idBadgeProblemSet: IProblemSet = {
  id: "id-badge",
  ordinal: 1,
  title: "ID Badge",
  subtitle: "Smile - It is time for your ID Badge",

  problem: theProblem,
  hints: [hintA, hintB, hintC],
  solution: theSolution,
}


function theProblem(_series: ISeriesConfigExtended): string {

  const generator = `function idBadgeGenerator(student: <span class="warning">any</span>) {
    const { name, gradYr, school, pronouns, profile } = student;
    //... work ...
    return "...";
}`;

  const sampleInput = `const input = ${idBadgeInputExampleString};`;

  const html = `
    <h3>Introduction</h3>
    <div class="w-lg">
      <p>
      Before we can do anything, you need to get your ID Badge.  Unfortunately, there is a problem
      with the badge generator.  It was developed by an <code>any</code loving coder who had not
      embraced the "Type" part of Typescript.
      </p>
      <p>
      What we need you to do is to develop a <code>Type</code> or <code>interface</code> that we 
      can use in our badge generator.
      </p>
    </div>

    <h3 style="margin-top: 2rem;">Generator</h3>
    <kpc-code-block>${generator}</kpc-code-block>
    <p class="w-lg">
    Don't worry about how the id is generated.  You are only concerned with replacing the <code>any</code> with a type or interface.
    Below is a sample of how the input is configured.  Notice that it includes a header row.
    </p>
    <h3 style="margin-top: 2rem;">Sample Input</h3>
    <kpc-code-block>${sampleInput}</kpc-code-block>
    <p class="w-lg">
    This really isn't a tough problem.  
    We are starting with a nice warm up so you can get used to the style of our problem sets.
    This is to say... don't over think this one!
    </p>
    

  `;

  console.log("html", {html})
  return html; 
}

function theSolution(_series: ISeriesConfigExtended): string {
  return `
    <h3>The Solution</h3>
  `
}

function hintA(_series: ISeriesConfigExtended): string {
  return `
    <h3>Hint A</h3>
  `
}
function hintB(_series: ISeriesConfigExtended): string {
  return `
    <h3>Hint B</h3>
  `
}
function hintC(_series: ISeriesConfigExtended): string {
  return `
    <h3>Hint C</h3>
  `
}