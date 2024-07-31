import { IProblemSet, ISeriesConfigExtended } from "../../series.types";

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
  return `
    <h3>The Problem</h3>
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
