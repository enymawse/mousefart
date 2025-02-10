import { Options } from "../types/types.js";
import { BaseService } from "./BaseService.js";
import { ExclusionsService } from "./ExclusionsService.js";
import { PerformerService } from "./PerformerService.js";
import { SceneService } from "./SceneService.js";
import { StudioService } from "./StudioService.js";
import { UtilityService } from "./UtilityService.js";

/**
 * The main entry point for interacting with the MouseFart API client.
 * This class provides access to various services such as scenes, exclusions,
 * performers, studios, and utility functions.
 */
export class MouseFart {
  private client: BaseService;
  public scenes: SceneService;
  public exclusions: ExclusionsService;
  public utils: UtilityService;
  public performers: PerformerService;
  public studios: StudioService;

  /**
   * Initializes a new instance of the MouseFart API client.
   * @param baseUrl - The base URL of the API.
   * @param apiKey - The API key for authentication.
   * @param options - Optional configuration settings for requests, becomes
   * required for adding a scene, performer, or studio.
   */
  constructor(baseUrl: string, apiKey: string, options?: Options) {
    this.client = new BaseService(baseUrl, apiKey);
    if (options) this.setOptions(options);
    this.scenes = new SceneService(this.client);
    this.exclusions = new ExclusionsService(this.client);
    this.utils = new UtilityService(this.client);
    this.performers = new PerformerService(this.client);
    this.studios = new StudioService(this.client);
  }

  /**
   * Sets configuration options for the API client.
   * @param options - The options to configure.
   */
  setOptions(options: Options) {
    this.client.setOptions(options);
  }
}
