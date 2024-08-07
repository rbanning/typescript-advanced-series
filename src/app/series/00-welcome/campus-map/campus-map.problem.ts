import { IProblemSet, ISeriesConfigExtended } from "../../series.types";

export const campusMap: IProblemSet = {
  id: "campus-map",
  ordinal: 1,
  title: "Campus Map",
  subtitle: "",

  problem: theProblem,
  hints: [hintA, hintB, hintC],
  solution: theSolution,
}


function theProblem(_series: ISeriesConfigExtended): string {

  const html = `
    <h3>Introduction</h3>
    <div class="w-lg">
      <p>
      Our campus is equipped with amazing resources designed to enhance the learning experience for all students. State-of-the-art laboratories, outfitted with the latest technology and equipment, support advanced research and experimentation. The library offers a vast digital archive and access to a multitude of online resources, ensuring that students have the most up-to-date information at their fingertips. Collaborative spaces, including innovation hubs and makerspaces, encourage creativity and interdisciplinary projects. Additionally, our campus features modern recreational facilities and a wellness centers, promoting a balanced and holistic educational environment.      
      </p>
    </div>
  `;
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