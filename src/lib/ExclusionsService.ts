import { BaseService } from "./BaseService.js";
import { Exclusion, ExclusionMap } from "../types/types.js";

/**
 * Service for managing exclusions via the API.
 */
export class ExclusionsService {
  /**
   * Creates an instance of ExclusionsService.
   * @param base - An instance of BaseService for making API requests.
   */
  constructor(private base: BaseService) {}

  /**
   * Retrieves the exclusion list and maps it by `foreignId`.
   * @returns A Promise that resolves to an ExclusionMap.
   */
  async getMap(): Promise<ExclusionMap> {
    return this.base
      .request<Exclusion[]>("get", "/exclusions")
      .then((exclusionList) => {
        let map: ExclusionMap = new Map();
        if (exclusionList.length > 0) {
          map = exclusionList.reduce((acc, item) => {
            return acc.set(item.foreignId, item);
          }, new Map());
        }
        return map;
      });
  }

  /**
   * Removes an exclusion by its ID.
   * @param id - The ID of the exclusion to remove.
   * @returns A Promise that resolves when the exclusion is removed.
   */
  async remove(id: number): Promise<void> {
    return this.base.request<void>("delete", `/exclusions/${id}`);
  }

  /**
   * Adds a new exclusion to the list.
   * @param stashId - The foreign ID of the movie.
   * @param title - The title of the movie.
   * @param year - The release year of the movie.
   * @returns A Promise that resolves to the created Exclusion.
   */
  async add(stashId: string, title: string, year: number): Promise<Exclusion> {
    return this.base.request<Exclusion>("post", "/exclusions", {
      foreignId: stashId,
      movieTitle: title,
      movieYear: year,
    });
  }
}
