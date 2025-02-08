import { WhisparrStudio } from "../types/types.js";
import { BaseService } from "./BaseService.js";

const encode = encodeURIComponent;

export class StudioService {
  constructor(private base: BaseService) {}

  async add(stashId: string): Promise<WhisparrStudio> {
    return this.base.add<WhisparrStudio>("/studio", {
      foreignId: stashId,
      monitored: false,
    });
  }

  async get(stashId: string): Promise<WhisparrStudio> {
    return this.base
      .request<WhisparrStudio[]>("get", `/studio?stashId=${encode(stashId)}`)
      .then((res) => {
        const studio = res.pop();
        if (studio !== undefined) return studio;
        throw Error(stashId + " does not exist in Whisparr.");
      });
  }

  async update(studio: WhisparrStudio): Promise<WhisparrStudio> {
    return this.base
      .request<WhisparrStudio[]>("put", `/studio/${studio.id}`, studio)
      .then((updatedStudio) => {
        return updatedStudio.length ? updatedStudio[0] : studio;
      });
  }

  async delete(id: number): Promise<void> {
    return this.base.request("delete", `/studio/${id}`);
  }
}
