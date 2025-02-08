import { WhisparrPerformer } from "../types/types.js";
import { BaseService } from "./BaseService.js";

const encode = encodeURIComponent;

export class PerformerService {
  constructor(private base: BaseService) {}

  async add(stashId: string): Promise<WhisparrPerformer> {
    return this.base.add<WhisparrPerformer>("/performer", {
      foreignId: stashId,
      monitored: false,
    });
  }

  async get(stashId: string): Promise<WhisparrPerformer> {
    return this.base
      .request<
        WhisparrPerformer[]
      >("get", `/performer?stashId=${encode(stashId)}`)
      .then((res) => {
        const performer = res.pop();
        if (performer !== undefined) return performer;
        throw Error(stashId + " does not exist in Whisparr.");
      });
  }

  async update(performer: WhisparrPerformer): Promise<WhisparrPerformer> {
    return this.base
      .request<
        WhisparrPerformer[]
      >("put", `/performer/${performer.id}`, performer)
      .then((updatedPerformer) => {
        return updatedPerformer.length ? updatedPerformer[0] : performer;
      });
  }

  async delete(id: number): Promise<void> {
    return this.base.request("delete", `/performer/${id}`);
  }
}
