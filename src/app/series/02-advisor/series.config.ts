import { getAdvisor } from "../advisor.generator";
import { ISeriesConfig } from "../series.types";

export const advisorConfig: ISeriesConfig = {
  id: 'advisor',
  ordinal: 1,
  title: 'Your Advisor',
  subtitle: 'Tour the Campus with ${getAdvisor().name}',
  introduction: `
    <p>
    <strong>Great to See You!</strong> <br/>
    I am ${getAdvisor().name}, and I will be your advisor. 
    I am a professor in the Department of ${getAdvisor().dept},
    but my true passion is ${getAdvisor().passion} and Typescript.
    </p>
    <p>
    My role is to provide you with guidance outside your formal instruction.
    I am NOT your instructor but can provide help if you get stuck or
    want a different view on the problem.
    </p>
    <p>
    While my doors are rarely open and I never have office hours,
    you may contact me -- except if you need money, are in trouble with the law,
    or are going through some serious shit.
    <br/>
    <a href="./dr-${getAdvisor().id}">Dr. ${getAdvisor().name}'s Profile Page</a>
    </p>
    <p>
      Today, we are going on a walking trip of the campus and the surrounding area.
    </p>

  `
}