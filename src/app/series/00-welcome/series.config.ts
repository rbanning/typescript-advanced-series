import { ISeriesConfig } from "../series.types";

export const welcomeConfig: ISeriesConfig = {
  id: 'welcome',
  ordinal: 0,
  title: 'Welcome',
  subtitle: 'Series Introduction',
  introduction: `
    <p>
    <strong>Congratulations!</strong> <br /> 
    It is with great pleasure to inform you that you 
    have been accepted into Hallpass School of Advanced Typescript Studies.
    </p>
    <p>
    We have included below our Welcome Packet so you can familiarize 
    yourself with the campus and the opportunities that await you as
    you begin your journey.
    </p>
  `,
  objectives: [
    {
      id: "series-organization",
      title: "Series Organization",
      description: "You will understand how the series is laid out."
    },
    {
      id: "problem-based=learning",
      title: "Problem-based Learning",
      description: "You will understand what is meant by problem based learning and why we use it in this series."
    },
    {
      id: "need-help",
      title: "Need Help",
      description: "You will understand how to use problem set hints and where to turn for help if needed."
    },
  ]
}