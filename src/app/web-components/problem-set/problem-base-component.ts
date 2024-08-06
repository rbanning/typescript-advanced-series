import { isNotNullish, Nullable } from "../../utils";
import { IProblemSet, ISeriesConfigExtended } from "../../series/series.types";
import { BaseWebComponent } from "../base-web-component";
import { seriesRepository } from "../../series";
import { PREFIX } from "../web-components.config";

//helper types
type ParseAttributeResult = {
  resolved: boolean;
  requiresRefresh: boolean;
}

type ComponentState = 'pending' | 'ready' | 'refreshing';

export class ProblemBaseComponent extends BaseWebComponent {
  protected config: Nullable<ISeriesConfigExtended>;
  protected problemSet: Nullable<IProblemSet>;
  protected key: Nullable<string | number>;

  protected state: ComponentState = 'pending';

  // These are the "base" attributes used to get the config and problemSet
  // To extend these in YourComponent ...
  //    static observedAttributes = [...ProblemBaseComponent.observableAttribute, "color", "size"]; 
  static observedAttributes = ["series", "key"]; 

  constructor() {
    super();
  }


  protected buildComponent(): void {
    this.state = 'refreshing';
    this.reset();         //clear the 
    
    //add your custom build in customBuild !!
    this.customBuild();

    //done    
    this.state = 'ready'; //be sure to flag that the component has been built at the end
  }

  // This is the basic attributeChangedCallback.  If you add more attributes (see observableAttributes) you need to do this...
  //  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
  //    let { requiresRefresh, resolved } = this.parseAttributeChanges(name, oldValue, newValue);
  //    if (!resolved) {
  //      ... add your code 
  //    }
  //  
  //    if (requiresRefresh) {
  //      this.buildComponent();
  //    }
  //  }
  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
      let { requiresRefresh, resolved } = this.parseAttributeChanges(name, oldValue, newValue);
      
      if (!resolved) {
        console.warn(`${ProblemBaseComponent.TAG} - unsupported attribute: ${name}`);
        requiresRefresh = false;
      }

      if (requiresRefresh) {
        this.buildComponent();
      }

  }


  //#region >>> HELPERS <<<

  protected customBuild() {
    //place your build code here and leave this.buildComponent() as is
  }

  protected parseAttributeChanges(name: string, oldValue: Nullable<string>, newValue: Nullable<string>): ParseAttributeResult {
    let requiresRefresh = this.state !== 'pending';
    let resolved = false;

    switch (name) {
      case "series":        
        const config = seriesRepository.find(m => m.id === newValue);
        if (config) {
          this.config = config;
          requiresRefresh = requiresRefresh && (newValue !== oldValue);
        } else {
          requiresRefresh = false;
        }   
        resolved = true;     
        break;
      case "key": 
        this.key = parseInt(newValue ?? '');
        if (isNaN(this.key)) {
          this.key = newValue;
        }
        this.resolveProblemSet();
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        resolved = true;     
        break;
    }

    return {
      requiresRefresh,
      resolved
    }
  }


  protected resolveProblemSet() {
    if (this.config?.problems && isNotNullish<string|number>(this.key)) {
      this.problemSet = typeof(this.key) === 'number' 
          ? this.config.problems[this.key]
          : this.config.problems.find(m => m.id === this.key);
    }
  }

  //#endregion
  
  static TAG = `${PREFIX}-problem-component`; //this is used as a generic tag
}