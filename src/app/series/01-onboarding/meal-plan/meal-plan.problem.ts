import { IProblemSet, ISeriesConfigExtended } from "../../series.types";

export const mealPlanProblemSet: IProblemSet = {
  id: "meal-plan",
  ordinal: 2,
  title: "Meal Plan",
  subtitle: "Time to choose a meal plan!",

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
