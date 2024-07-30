import { slugify } from "../utils";


export interface IAdvisorBase {
  id: string;
  name: string;
  dept: string;
  passion: string;
  profile: string;  
}

export interface IAdvisor extends IAdvisorBase {
  href: string;
}


const _repo: IAdvisorBase[] = [
  { 
    id: 'duru',
    name: 'Duru',
    dept: 'Data Science',
    passion: 'surfing',
    profile: `
      <p>
      Dr. Duru is a distinguished Data Science professor renowned for his groundbreaking research in machine learning and big data analytics. When he's not in the classroom or the lab, Duru can be found riding the waves of Teahupo'o as a professional surfer, skillfully balancing his dual passions for academia and the ocean. His unique blend of analytical precision and adventurous spirit inspires both his students and peers, making him a dynamic and influential figure in both the classroom and the lineup.
      </p>
    `
  },
  {
    id: 'makatisi',
    name: 'Makatisi',
    dept: 'Modern Literature',
    passion: 'long distance running',
    profile: `
    <p>
    Dr. Makatisi is a distinguished modern literature professor known for her non-orthodox teaching methods that blend literary analysis with the discipline of long-distance running. With a passion for exploring the parallels between the endurance required in both literature and athletics, she inspires her students to find deeper connections and insights through active engagement. Makatisi's unique approach not only enriches her students' understanding of modern literature but also promotes a holistic lifestyle that values both words and the runner's high.
    </p>
    `
  },
  {
    id: 'prevot',
    name: 'Prevot',
    dept: 'Applied Mathematics',
    passion: 'mountain bike riding',
    profile: `
      <p>
      Dr. Prevot is an innovative Applied Mathematics professor known for her unique teaching methodology that fuses the precision of mathematics with the adventurous spirit of mountain biking. With a passion for making complex mathematical concepts accessible and engaging, Prevot takes her students beyond the traditional classroom setting, using the dynamic environment of mountain trails to illustrate mathematical principles in real-time. This hands-on approach helps students find the <em>flow</em> even when tackling Control Theory in a rock garden.
      </p>
    `
  },
  {
    id: 'woojin',
    name: 'Woojin',
    dept: 'Marine Biology',
    passion: 'archery',
    profile: `
    <p>
    Dr. Woojin is a renowned Marine Biology professor known for his innovative approach to education that uniquely combines the study of marine ecosystems with the precision and discipline of archery. With a passion for both the underwater world and the art of the bow, Dr. Woojin inspires students to develop a keen eye for detail and a deep appreciation for the natural world. His interdisciplinary methods hit the mark, instilling students with the skills of focus, patience, and Robinhood.
    </p>
    `
  },
];


export const advisorRepo: IAdvisor[] = _repo.map(m => {
  return {
    ...m,
    href: './' + slugify(`Advisor Dr ${m.name}`)
  }
});