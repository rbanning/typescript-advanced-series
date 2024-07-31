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

  const generator = `<kpc-code-block>one</kcp-code-block>`; 
//   `<kpc-code-block>function idBadgeGenerator(student: any) {
//   return "...";
// }</kcp-code-block>`;

  const sampleInput = `<kpc-code-block>const input = ${idBadgeInputExampleString};</kcp-code-block>`;

  return `
    <h3>Introduction</h3>
    <p>
    Before we can do anything, you need to get your ID Badge.  Unfortunately, there is a problem
    with the badge generator.  It was developed by an <code>any</code loving coder who had not
    embraced the "Type" part of Typescript.
    </p>
    <p>
    What we need you to do is to develop a <code>Type</code> or <code>interface</code> that we 
    can use in our badge generator.
    </p>

    <h3 style="margin-top: 2rem;">Generator</h3>
    ${sampleInput}

    <h3 style="margin-top: 2rem;">Sample Input</h3>
    ${sampleInput}
  `
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
