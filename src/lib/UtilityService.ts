import { BaseService } from "./BaseService.js";
import {
  HealthCheck,
  QualityProfile,
  RootFolder,
  SystemStatus,
  Tag,
} from "../types/types.js";

/**
 * Service for utility operations in the system.
 * Provides methods to check system status, health, and fetch various resources.
 */
export class UtilityService {
  /**
   * Initializes a new instance of the UtilityService.
   * @param base - The base service used for making API requests.
   */
  constructor(private base: BaseService) {}

  /**
   * Retrieves the current system status.
   * @returns The current system status object.
   */
  async status(): Promise<SystemStatus> {
    return this.base.request<SystemStatus>("get", "/system/status");
  }

  /**
   * Performs a health check on the system.
   * @returns The health check result, which includes the status of the system.
   */
  async health(): Promise<HealthCheck> {
    return this.base.request<HealthCheck>("get", "/health");
  }

  /**
   * Retrieves the list of quality profiles available in the system.
   * @returns An array of QualityProfile objects.
   */
  async qualityProfiles(): Promise<QualityProfile[]> {
    return this.base.request<QualityProfile[]>("get", "/qualityProfile");
  }

  /**
   * Retrieves the list of root folders in the system.
   * @returns An array of RootFolder objects.
   */
  async rootFolders(): Promise<RootFolder[]> {
    return this.base.request<RootFolder[]>("get", "/rootFolder");
  }

  /**
   * Retrieves the list of tags in the system.
   * @returns An array of Tag objects.
   */
  async tags(): Promise<Tag[]> {
    return this.base.request<Tag[]>("get", "/tag");
  }
}
