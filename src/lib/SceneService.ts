import { BaseService } from "./BaseService.js";
import {
  CommandResource,
  LookupSceneResponse,
  WhisparrScene,
} from "../types/types.js";

const encode = encodeURIComponent;

export class SceneService {
  constructor(private base: BaseService) {}

  async moviesSearch(ids: number[]): Promise<CommandResource> {
    return this.base.request<CommandResource>("post", "/command", {
      name: "MoviesSearch",
      movieIds: ids,
    });
  }

  async add(stashId: string): Promise<WhisparrScene> {
    return this.base
      .request<LookupSceneResponse[]>(
        "get",
        `/lookup/scene?term=stash:${encode(stashId)}`
      )
      .then((response) => response[0].movie)
      .then((scene) => {
        return this.base.add<WhisparrScene>("/movie", {
          title: scene.title,
          foreignId: scene.foreignId,
          monitored: true,
        });
      });
  }

  addAll(stashIds: string[]): Promise<WhisparrScene>[] {
    return stashIds.map(async (stashId) => {
      return this.add(stashId);
    });
  }

  async get(stashId: string): Promise<WhisparrScene> {
    return this.base
      .request<WhisparrScene[]>("get", `/movie?stashId=${encode(stashId)}`)
      .then((res) => {
        const scene = res.pop();
        if (scene !== undefined) return scene;
        throw Error(stashId + " does not exist in Whisparr.");
      });
  }

  async delete(id: number): Promise<void> {
    return this.base.request("delete", `/movie/${id}`);
  }
}
