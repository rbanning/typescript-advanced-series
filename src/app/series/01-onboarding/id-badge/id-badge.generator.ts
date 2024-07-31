import { Student } from "./id-badge.parser";

export function idBadgeGenerator(student: Student) {
  return `
    <kpc-id-badge 
      name="${student.name}"
      gradYr="${student.gradYr}"
      gender="${student.gender}"
      profile="${student.profile}"
    </kpc-id-badge>
  `;
}