import { Options } from "../types/types.js";
import { BaseService } from "./BaseService.js";
import { ExclusionsService } from "./ExclusionsService.js";
import { PerformerService } from "./PerformerService.js";
import { SceneService } from "./SceneService.js";
import { StudioService } from "./StudioService.js";
import { UtilityService } from "./UtilityService.js";

export class MouseFart {
  private client: BaseService;
  public scenes: SceneService;
  public exclusions: ExclusionsService;
  public utils: UtilityService;
  public performers: PerformerService;
  public studios: StudioService;

  constructor(baseUrl: string, apiKey: string) {
    this.client = new BaseService(baseUrl, apiKey);
    this.scenes = new SceneService(this.client);
    this.exclusions = new ExclusionsService(this.client);
    this.utils = new UtilityService(this.client);
    this.performers = new PerformerService(this.client);
    this.studios = new StudioService(this.client);
  }

  setOptions(options: Options) {
    this.client.setOptions(options);
  }
}
