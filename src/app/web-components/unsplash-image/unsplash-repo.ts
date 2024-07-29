import { IUnsplash } from "./unsplash.type";

import oxfordDoorFront from '../../../assets/unsplash/oxford-door-front.jpg';
import studentReadingBook from '../../../assets/unsplash/student-reading-book.jpg';
import oxfordBicyclesParked from '../../../assets/unsplash/oxford-bicycles-parked.jpg';
import purpleYarn from '../../../assets/unsplash/purple-yarn.jpg';

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
    /* cspell: disable-next-line */
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
  {
    /* cspell: disable-next-line */
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