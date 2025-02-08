import { BaseService } from "./BaseService.js";
import {
  HealthCheck,
  QualityProfile,
  RootFolder,
  SystemStatus,
  Tag,
} from "../types/types.js";

export class UtilityService {
  constructor(private base: BaseService) {}
  async status(): Promise<SystemStatus> {
    return this.base.request<SystemStatus>("get", "/system/status");
  }

  async health(): Promise<HealthCheck> {
    return this.base.request<HealthCheck>("get", "/health");
  }

  async qualityProfiles(): Promise<QualityProfile[]> {
    return this.base.request<QualityProfile[]>("get", "/qualityProfile");
  }

  async rootFolders(): Promise<RootFolder[]> {
    return this.base.request<RootFolder[]>("get", "/rootFolder");
  }

  async tags(): Promise<Tag[]> {
    return this.base.request<Tag[]>("get", "/tag");
  }
}
