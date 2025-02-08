import axios, { AxiosInstance } from "axios";
import { ApiError, NetworkError } from "./Error.js";
import { Options } from "../types/types.js";

export class BaseService {
  private http: AxiosInstance;
  private options?: Options;

  constructor(baseUrl: string, apiKey: string, options?: Options) {
    this.http = axios.create({
      baseURL: `${baseUrl}/api/v3`,
      headers: { "X-Api-Key": apiKey },
    });
    this.options = options;
  }

  get optionsConfigured() {
    return this.options !== undefined && this.options !== null;
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      if (error.response) {
        // Response error (non-2xx status code)
        const statusCode = error.response.status;
        const errorMessage =
          error.response.data.message || `Error ${statusCode}`;
        throw new ApiError(statusCode, errorMessage);
      } else if (error.request) {
        // Request error (no response received)
        throw new NetworkError("No response received from the server.");
      } else {
        // Other Axios-related errors
        throw new NetworkError(
          error.message || "An error occurred while setting up the request."
        );
      }
    } else {
      // Unknown error type
      throw new Error("An unexpected error occurred.");
    }
  }

  private validateOptions(options: Options): boolean {
    return (
      typeof options.rootFolderPath === "string" &&
      typeof options.qualityProfile === "number" &&
      typeof options.searchOnAdd === "boolean" &&
      Array.isArray(options.tags)
    );
  }

  private ensureOptionsConfigured(): void {
    if (!this.optionsConfigured) {
      throw new Error("Options have not been configured properly");
    }
  }

  setOptions(options: Options): void {
    if (this.validateOptions(options)) {
      this.options = options;
    } else {
      throw new Error("Invalid options configuration");
    }
  }

  async request<T>(
    method: "get" | "post" | "put" | "delete",
    endpoint: string,
    data?: object
  ): Promise<T> {
    try {
      const config = data ? data : undefined;
      const response = await this.http[method]<T>(endpoint, config, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async add<T>(endpoint: string, data: object): Promise<T> {
    this.ensureOptionsConfigured();
    try {
      const response = await this.http["post"]<T>(endpoint, {
        ...data,
        rootFolderPath: this.options?.rootFolderPath,
        qualityProfileId: this.options?.qualityProfile,
        addOptions: {
          searchForMovie: this.options?.searchOnAdd,
        },
        tags: this.options?.tags,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
}
