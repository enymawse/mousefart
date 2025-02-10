import { BaseService } from "./BaseService.js";
import { CommandResource, LookupSceneResponse, Scene } from "../types/types.js";

const encode = encodeURIComponent;

/**
 * Service for interacting with scenes (movies) in Whisparr.
 * Provides methods to search, add, retrieve, and delete scene records.
 */
export class SceneService {
  /**
   * Initializes a new instance of the SceneService.
   * @param base - The base service used for making API requests.
   */
  constructor(private base: BaseService) {}

  /**
   * Triggers a movie search command in Whisparr for the given movie IDs.
   * @param ids - An array of movie IDs to search.
   * @returns A command resource representing the search operation.
   */
  async moviesSearch(ids: number[]): Promise<CommandResource> {
    return this.base.request<CommandResource>("post", "/command", {
      name: "MoviesSearch",
      movieIds: ids,
    });
  }

  /**
   * Adds a scene (movie) to Whisparr using its stashId.
   * First, it looks up the scene and then adds it to the database.
   * @param stashId - The unique foreign ID of the scene.
   * @returns The added Scene object.
   */
  async add(stashId: string): Promise<Scene> {
    return this.base
      .request<LookupSceneResponse[]>(
        "get",
        `/lookup/scene?term=stash:${encode(stashId)}`
      )
      .then((response) => response[0].movie)
      .then((scene) => {
        return this.base.add<Scene>("/movie", {
          title: scene.title,
          foreignId: scene.foreignId,
          monitored: true,
        });
      });
  }

  /**
   * Adds multiple scenes to Whisparr using an array of stashIds.
   * @param stashIds - An array of foreign IDs representing scenes.
   * @returns An array of promises resolving to Scene objects.
   */
  addAll(stashIds: string[]): Promise<Scene>[] {
    return stashIds.map(async (stashId) => {
      return this.add(stashId);
    });
  }

  /**
   * Retrieves a scene from Whisparr using its stashId.
   * @param stashId - The unique foreign ID of the scene.
   * @returns The corresponding Scene object.
   * @throws An error if the scene does not exist.
   */
  async get(stashId: string): Promise<Scene> {
    return this.base
      .request<Scene[]>("get", `/movie?stashId=${encode(stashId)}`)
      .then((res) => {
        const scene = res.pop();
        if (scene !== undefined) return scene;
        throw Error(stashId + " does not exist in Whisparr.");
      });
  }

  /**
   * Deletes a scene from Whisparr by its ID.
   * @param id - The ID of the scene to delete.
   */
  async delete(id: number): Promise<void> {
    return this.base.request("delete", `/movie/${id}`);
  }
}
