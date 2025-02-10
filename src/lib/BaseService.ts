import axios, { AxiosInstance } from "axios";
import { ApiError, NetworkError } from "./Error.js";
import { Options } from "../types/types.js";

export class BaseService {
  private http: AxiosInstance;
  private options?: Options;

  /**
   * Initializes the BaseService with a base URL, API key, and optional configuration options.
   * @param baseUrl - The base URL for the API.
   * @param apiKey - The API key for authentication.
   * @param options - Optional configuration settings for requests.
   */
  constructor(baseUrl: string, apiKey: string, options?: Options) {
    this.http = axios.create({
      baseURL: `${baseUrl}/api/v3`,
      headers: { "X-Api-Key": apiKey },
    });
    this.options = options;
  }

  /**
   * Checks if the options are properly configured.
   * @returns A boolean indicating whether the options are set.
   */
  get optionsConfigured() {
    return this.options !== undefined && this.options !== null;
  }

  /**
   * Handles errors that occur during HTTP requests.
   * Differentiates between API errors, network errors, and unknown errors.
   * @param error - The error object thrown by Axios or other unknown sources.
   * @throws {ApiError | NetworkError | Error} - Throws an appropriate error type.
   */
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

  /**
   * Validates the provided options object.
   * @param options - The options to validate.
   * @returns A boolean indicating whether the options are valid.
   */
  private validateOptions(options: Options): boolean {
    return (
      typeof options.rootFolderPath === "string" &&
      typeof options.qualityProfile === "number" &&
      typeof options.searchOnAdd === "boolean" &&
      Array.isArray(options.tags)
    );
  }

  /**
   * Ensures that options have been properly configured before proceeding with an operation.
   * @throws {Error} - Throws an error if options are not set.
   */
  private ensureOptionsConfigured(): void {
    if (!this.optionsConfigured) {
      throw new Error("Options have not been configured properly");
    }
  }

  /**
   * Sets new configuration options after validating them.
   * @param options - The options to set.
   * @throws {Error} - Throws an error if the options are invalid.
   */
  setOptions(options: Options): void {
    if (this.validateOptions(options)) {
      this.options = options;
    } else {
      throw new Error("Invalid options configuration");
    }
  }

  /**
   * Makes an HTTP request using the configured Axios instance.
   * @param method - The HTTP method (GET, POST, PUT, DELETE).
   * @param endpoint - The API endpoint to request.
   * @param data - Optional request payload for POST/PUT requests.
   * @returns A promise resolving to the response data.
   * @throws {ApiError | NetworkError | Error} - Throws an error if the request fails.
   */
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

  /**
   * Sends a POST request to add a new item to the API, ensuring required options are set.
   * @param endpoint - The API endpoint to send the request to.
   * @param data - The data to be sent in the request body.
   * @returns A promise resolving to the response data.
   * @throws {ApiError | NetworkError | Error} - Throws an error if the request fails.
   */
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
