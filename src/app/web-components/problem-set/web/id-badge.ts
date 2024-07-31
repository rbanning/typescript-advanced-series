import { Gender, Student } from '../../../series/01-onboarding/id-badge/id-badge.parser';
import { BaseWebComponent } from '../../base-web-component';
import { PREFIX } from '../../web-components.config';

import styles from './id-badge.module.css';

export class IdBadge extends BaseWebComponent {
  student: Student = {
    name: '',
    gradYr: 0,
    school: '',
    gender: 'prefer not to say',
    profile: ''
  };
  
  static observedAttributes = ["name", "gradYr", "school", "gender", "profile"]; 

  constructor() {
    super();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    let requiresRefresh = this.childElementCount > 0;

    switch (name) {
      case "name":        
        this.student.name = newValue ?? this.student.name;
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        break;
      case "gradYr": 
        const gradYr = parseInt(newValue ?? '');
        if (!isNaN(gradYr)) {
          this.student.gradYr = gradYr;
        }
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        break;
      case "school":        
        this.student.school = newValue ?? this.student.school;
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        break;
      case "gender":        
        this.student.gender = (newValue as Gender) ?? this.student.gender;
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        break;
      case "profile":        
        this.student.profile = newValue ?? this.student.profile;
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        break;
      default: 
        console.warn(`${IdBadge.TAG} - unsupported attribute: ${name}`);
        requiresRefresh = false;
      }

    if (requiresRefresh) {
      this.buildComponent();
    }
  }

  protected buildComponent(): void {
      this.reset();

      this.classList.add(styles[".id-badge"]);

      const img = this.createElement('img') as HTMLImageElement;
      img.src = this.student.profile;
      img.alt = this.student.name;
      this.appendChild(img);

      const content = this.createElement('div', styles["content"]);
      this.appendChild(content);

      const name = this.createElement('div', styles['name']);
      name.innerText = this.student.name;
      content.appendChild(name);

      const gender = this.createElement('div', styles['gender']);
      gender.innerText = this.student.gender;
      content.appendChild(gender);

      const school = this.createElement('div', styles['school']);
      school.innerText = this.student.school;
      content.appendChild(school);

      const gradYr = this.createElement('div', styles['gradYr']);
      school.innerText = `Class of ${this.student.gradYr}`;
      content.appendChild(gradYr);

  }

  static readonly TAG = `${PREFIX}-id-badge`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, IdBadge);
    }
  }

}