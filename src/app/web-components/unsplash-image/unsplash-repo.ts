import { IUnsplash } from "./unsplash.type";

import oxfordDoorFront from '../../../assets/unsplash/oxford-door-front.jpg';
import studentReadingBook from '../../../assets/unsplash/student-reading-book.jpg';
import oxfordBicyclesParked from '../../../assets/unsplash/oxford-bicycles-parked.jpg';
import purpleYarn from '../../../assets/unsplash/purple-yarn.jpg';

import seriesWelcome from '../../../assets/unsplash/series/00-welcome.jpg';
import seriesOnboarding from '../../../assets/unsplash/series/01-onboarding.jpg';
import seriesAdvisor from '../../../assets/unsplash/series/02-advisor.jpg';

export const unsplashRepo: IUnsplash[] = [
  {
    id: "oxford-door-front",
    src: oxfordDoorFront,
    description: "photo of a door front in Oxford, UK with bike in front of window",
    credit: {
      url: "https://unsplash.com/photos/black-fixie-bike-near-white-wooden-door-Q5qclU0qAz0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      photographer: {
        /* cspell: disable-next-line */
        name: "Dmitrij Paskevic",
        portfolio: "https://unsplash.com/@zeak",
      },
    },
    tags: ["oxford", "door", "window", "bike"]
  },

  {
    id: "student-reading-book",
    src: studentReadingBook,
    description: "Student leaning against a stone building reading a book with cup of coffee next to him",
    credit: {
      url: "https://unsplash.com/photos/man-sitting-beside-cup-of-coffee-x7h5HLsBYwo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      photographer: {
        /* cspell: disable-next-line */
        name: "Viktor Forgacs",
        portfolio: "https://unsplash.com/@sonance",
      },
    },
    tags: ["oxford", "student", "reading"]
  },

  {
    id: "oxford-bicycles-parked",
    src: oxfordBicyclesParked,
    description: "a lot of bicycles parked along a walkway in Oxford UK",
    credit: {
      url: "https://unsplash.com/photos/a-group-of-bicycles-parked-on-a-sidewalk-5L3pSNduedw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      photographer: {
        name: "Benjamin Elliott",
        portfolio: "https://unsplash.com/@benjaminelliott",
      },
    },
    tags: ["oxford", "bike", "sidewalk"]
  },

  {
    id: "purple-yarn",
    src: purpleYarn,
    description: "cross hatch of yarn of various purple hues",
    credit: {
      url: "https://unsplash.com/photos/a-close-up-of-a-purple-and-purple-yarn-OQrZQ80eNM4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      photographer: {
        /* cspell: disable-next-line */
        name: "Mick Haupt",
        portfolio: "https://unsplash.com/@rocinante_11?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      },
    },
    tags: []
  },

  {
    id: "welcome",
    src: seriesWelcome,
    description: "'Welcome' in a variety of languages",
    credit: {
      url: "https://unsplash.com/photos/a-group-of-wooden-signs-hanging-from-a-metal-gate-9bivU7sTcmo",
      photographer: {
        /* cspell: disable-next-line */
        name: "Dana Light",
        portfolio: "https://unsplash.com/@dreamcatchlight",
      },
    },
    tags: []
  },

  {
    id: "onboarding",
    src: seriesOnboarding,
    description: "Ben getting on board on the first train to Kandy",
    credit: {
      url: "https://unsplash.com/photos/woman-in-black-top-and-gray-pants-holding-on-blue-train-LHtFRAsNWSc?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      photographer: {
        /* cspell: disable-next-line */
        name: "Etienne Boulanger",
        portfolio: "https://unsplash.com/@etienneblg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      },
    },
    tags: []
  },


  {
    id: "advisor",
    src: seriesAdvisor,
    description: "racoon in a swamp forest",
    credit: {
      url: "https://unsplash.com/photos/a-raccoon-standing-on-a-wooden-platform-next-to-a-tree-AM-BoEyHFy8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      photographer: {
        /* cspell: disable-next-line */
        name: "",
        portfolio: "https://unsplash.com/@leob_photography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
      },
    },
    tags: []
  },

  {
    id: "",
    src: "",
    description: "",
    credit: {
      url: "https://unsplash.com/",
      photographer: {
        /* cspell: disable-next-line */
        name: "Leo Bayard",
        portfolio: "https://unsplash.com/@",
      },
    },
    tags: []
  },

  {
    id: "",
    src: "",
    description: "",
    credit: {
      url: "https://unsplash.com/",
      photographer: {
        /* cspell: disable-next-line */
        name: "",
        portfolio: "https://unsplash.com/@",
      },
    },
    tags: []
  },

]