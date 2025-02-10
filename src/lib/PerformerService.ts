import { Performer } from "../types/types.js";
import { BaseService } from "./BaseService.js";

const encode = encodeURIComponent;

/**
 * Service for interacting with Whisparr performers.
 * Provides methods to add, retrieve, update, and delete performer records.
 */
export class PerformerService {
  /**
   * Initializes a new instance of the PerformerService.
   * @param base - The base service used for making API requests.
   */
  constructor(private base: BaseService) {}

  /**
   * Adds a new performer to Whisparr.
   * @param stashId - The unique foreign ID of the performer.
   * @returns The created WhisparrPerformer object.
   */
  async add(stashId: string): Promise<Performer> {
    return this.base.add<Performer>("/performer", {
      foreignId: stashId,
      monitored: false,
    });
  }

  /**
   * Retrieves a performer from Whisparr by their stashId.
   * @param stashId - The unique foreign ID of the performer.
   * @returns The corresponding WhisparrPerformer object.
   * @throws An error if the performer does not exist.
   */
  async get(stashId: string): Promise<Performer> {
    return this.base
      .request<Performer[]>("get", `/performer?stashId=${encode(stashId)}`)
      .then((res) => {
        const performer = res.pop();
        if (performer !== undefined) return performer;
        throw Error(stashId + " does not exist in Whisparr.");
      });
  }

  /**
   * Updates an existing performer in Whisparr.
   * @param performer - The updated performer object.
   * @returns The updated WhisparrPerformer object.
   */
  async update(performer: Performer): Promise<Performer> {
    return this.base
      .request<Performer[]>("put", `/performer/${performer.id}`, performer)
      .then((updatedPerformer) => {
        return updatedPerformer.length ? updatedPerformer[0] : performer;
      });
  }

  /**
   * Deletes a performer from Whisparr by their ID.
   * @param id - The ID of the performer to delete.
   */
  async delete(id: number): Promise<void> {
    return this.base.request("delete", `/performer/${id}`);
  }
}
