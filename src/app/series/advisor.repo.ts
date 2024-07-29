

export interface IAdvisor {
  id: string;
  name: string;
  dept: string;
  passion: string;
  profile: string;
}


export const advisorRepo: IAdvisor[] = [
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
  }
];
