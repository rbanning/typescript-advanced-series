export type Gender = 'he/him' | 'she/her' | 'they/them' | 'prefer not to say';

export type Student = {
  name: string;
  gradYr: number;
  school: string;
  gender: Gender;
  profile: string;
}

export function idBadgeParser(input: string) {
  const parts = input.split(',').map(m => m.trim());
  if (parts.length === 4) {
    return {
      name: parts[0],
      gradYr: parseInt(parts[1]),
      school: parts[2],
      gender: parts[3] as Gender,
      profile: parts[4],
     } as Student;
  }
  //else
  console.warn("invalid Id Badge input line", input);
  throw new Error("invalid Id Badge input");
}