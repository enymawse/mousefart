import { Studio } from "../types/types.js";
import { BaseService } from "./BaseService.js";

const encode = encodeURIComponent;

/**
 * Service for managing studios in Whisparr.
 * Provides methods to add, retrieve, update, and delete studio records.
 */
export class StudioService {
  /**
   * Initializes a new instance of the StudioService.
   * @param base - The base service used for making API requests.
   */
  constructor(private base: BaseService) {}

  /**
   * Adds a new studio to Whisparr using its stashId.
   * @param stashId - The unique foreign ID of the studio.
   * @returns The added WhisparrStudio object.
   */
  async add(stashId: string): Promise<Studio> {
    return this.base.add<Studio>("/studio", {
      foreignId: stashId,
      monitored: false,
    });
  }

  /**
   * Retrieves a studio from Whisparr using its stashId.
   * @param stashId - The unique foreign ID of the studio.
   * @returns The corresponding WhisparrStudio object.
   * @throws An error if the studio does not exist.
   */
  async get(stashId: string): Promise<Studio> {
    return this.base
      .request<Studio[]>("get", `/studio?stashId=${encode(stashId)}`)
      .then((res) => {
        const studio = res.pop();
        if (studio !== undefined) return studio;
        throw Error(stashId + " does not exist in Whisparr.");
      });
  }

  /**
   * Updates an existing studio in Whisparr.
   * @param studio - The updated WhisparrStudio object.
   * @returns The updated WhisparrStudio object.
   */
  async update(studio: Studio): Promise<Studio> {
    return this.base
      .request<Studio[]>("put", `/studio/${studio.id}`, studio)
      .then((updatedStudio) => {
        return updatedStudio.length ? updatedStudio[0] : studio;
      });
  }

  /**
   * Deletes a studio from Whisparr by its ID.
   * @param id - The ID of the studio to delete.
   */
  async delete(id: number): Promise<void> {
    return this.base.request("delete", `/studio/${id}`);
  }
}
