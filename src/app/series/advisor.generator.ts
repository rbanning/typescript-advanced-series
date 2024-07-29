import { advisorRepo } from "./advisor.repo";

const KEY = "advisor"

export function getAdvisor() {
  
  if ('localStorage' in window) {
    const id = window.localStorage.getItem(KEY);
    const advisor = advisorRepo.find(m => m.id === id);
    if (advisor) { return advisor; }
  }

  //not found
  const result = advisorRepo[Math.floor(Math.random() * advisorRepo.length)];
  
  //save
  if ('localStorage' in window) {
    window.localStorage.setItem(KEY, result.id);
  }

  return result;
}