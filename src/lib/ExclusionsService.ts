import { BaseService } from "./BaseService.js";
import { Exclusion, ExclusionList, ExclusionMap } from "../types/types.js";

export class ExclusionsService {
  constructor(private base: BaseService) {}
  async getMap(): Promise<ExclusionMap> {
    return this.base
      .request<ExclusionList>("get", "/exclusions")
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

  async remove(id: number): Promise<void> {
    return this.base.request<void>("delete", `/exclusions/${id}`);
  }

  async add(stashId: string, title: string, year: number): Promise<Exclusion> {
    return this.base.request<Exclusion>("post", "/exclusions", {
      foreignId: stashId,
      movieTitle: title,
      movieYear: year,
    });
  }
}
