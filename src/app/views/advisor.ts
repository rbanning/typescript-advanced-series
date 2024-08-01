import { IRouteProps } from "../routing/route.model";
import { advisorRepo, IAdvisor } from "../series/advisor.repo";
import { NotFoundView } from "./not-found";


export function AdvisorView(arg: string | IAdvisor) {
  
  const advisor = typeof(arg) === 'string' ? advisorRepo.find(m => m.href = arg) : arg;


  return (_props: IRouteProps) => {
    if (advisor) {
      return `        
        <h1 style="margin-top: 2rem;">Dr. ${advisor.name}</h1>
        <div style="flex; justify-content: center;">
          <kpc-unsplash-image key="${advisor.id}" size="400"></kpc-unsplash-image>
        </div>
        <h3 style="text-align: center;">Department of ${advisor.dept}</h3>
        <div style="margin: 2rem auto; max-width: var(--width-md);">
          ${advisor.profile}
        </div>
      `
    }

    //else
    return NotFoundView(_props);

  }
}