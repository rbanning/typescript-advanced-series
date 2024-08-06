import { Nullable } from "../../utils";
import { seriesRepository } from "../../series";
import { ISeriesConfigExtended } from "../../series/series.types";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

//helper types
type ParseAttributeResult = {
  resolved: boolean;            //true if attribute name was resolved 
  requiresRefresh: boolean;     //true if the component needs to be rebuilt
}
type ComponentState = 'pending' | 'ready' | 'refreshing';

export class SeriesBaseComponent extends BaseWebComponent {
  protected key: Nullable<string | number>;
  protected config: Nullable<ISeriesConfigExtended>;

  protected state: ComponentState = 'pending';

  static observedAttributes = ["key"]

  constructor(key?: Nullable<string | number>) {
    super();
    this.key = key;
    if (key) {
      this.loadConfig();
    }
  }

  connectedCallback() {
    this.buildComponent();
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
        console.warn(`${SeriesBaseComponent.TAG} - unsupported attribute: ${name}`);
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
      case "key": 
        //key can be an index (number) or id (string)
        this.key = parseInt(newValue ?? '');
        if (isNaN(this.key)) {
          this.key = newValue;
        }
        this.loadConfig();
        requiresRefresh = requiresRefresh && (newValue !== oldValue);
        resolved = true;     
        break;
    }

    return {
      requiresRefresh,
      resolved
    }
  }


  protected loadConfig() {
    this.config = seriesRepository.get(this.key);
  }


  static TAG = `${PREFIX}-series-base-component`; //this is used as a generic tag


}