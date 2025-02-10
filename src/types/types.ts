// types.ts - Contains type definitions for various entities in the Whisparr application.

// Define an ExclusionMap type, a map of strings to Exclusion objects.
type ExclusionMap = Map<string, Exclusion>;

// Define options for adding a movie or studio, including root folder path, quality profile, and tags.
type Options = {
  rootFolderPath: string;
  qualityProfile: number;
  searchOnAdd: boolean;
  tags: number[];
};

// Define the structure of the OriginalLanguage object.
type OriginalLanguage = {
  id: number;
  name: string;
};

// Define the structure of an Image, including its type, URL, and remote URL.
type Image = {
  coverType: string;
  url: string;
  remoteUrl: string;
};

// Define the structure of a LookupSceneResponse, which contains movie data.
type LookupSceneResponse = {
  foreignId: string;
  movie: Scene;
  id: number;
};

// Define the structure of a Scene, which represents a scene in Whisparr.
type Scene = {
  title: string;
  sortTitle: string;
  sizeOnDisk: number;
  status: string;
  overview: string;
  releaseDate: string;
  year: number;
  studioTitle: string;
  studioForeignId: string;
  path: string;
  qualityProfileId: number;
  hasFile: boolean;
  monitored: boolean;
  isAvailable: true;
  folderName: string;
  runtime: number;
  stashId: string;
  titleSlug: string;
  rootFolderPath: string;
  genres: string[];
  tags: Tag[];
  added: string;
  foreignId: string;
  id: number;
};

// Define the structure of a CommandResponse, which contains data about a command in Whisparr.
type CommandResponse = {
  name: string;
  commandName: string;
  message: string;
  body: {
    movieIds: number[];
    sendUpdatesToClient: boolean;
    updateScheduledTask: boolean;
    completionMessage: string;
    requiresDiskAccess: boolean;
    isExclusive: boolean;
    isTypeExclusive: boolean;
    isLongRunning: boolean;
    name: string;
    trigger: string;
    suppressMessages: boolean;
  };
  priority: string;
  status: string;
  result: string;
  queued: string;
  started: string;
  trigger: string;
  stateChangeTime: string;
  sendUpdatesToClient: boolean;
  updateScheduledTask: boolean;
  id: number;
};

// Define the structure of a Quality object, representing quality attributes for media.
type Quality = {
  id: number;
  name: string;
  source: string;
  resolution: number;
};

// Define the structure of a QualityItem object, representing quality settings for a specific item.
type QualityItem = {
  quality?: Quality;
  items: QualityItem[];
  allowed: boolean;
  name?: string;
  id?: number;
};

// Define the structure of a Language object, representing language details.
type Language = {
  id: number;
  name: string;
};

// Define the structure of a QualityProfile, which includes various quality settings and format items.
type QualityProfile = {
  name: string;
  upgradeAllowed: boolean;
  cutoff: number;
  items: QualityItem[];
  minFormatScore: number;
  cutoffFormatScore: number;
  formatItems: unknown[];
  language: Language;
  id: number;
};

// Define the structure of a RootFolder, representing a folder where media is stored.
type RootFolder = {
  path: string;
  accessible: boolean;
  freeSpace: number;
  unmappedFolders: UnmappedFolder[];
  id: number;
};

// Define the structure of an UnmappedFolder, representing an unmapped folder within a RootFolder.
type UnmappedFolder = {
  name: string;
  path: string;
  relativePath: string;
};

// Define the structure of a Performer, representing performer details in Whisparr.
type Performer = {
  fullName: string;
  gender: string;
  hairColor: string;
  ethnicity: string;
  status: string;
  careerStart: number;
  foreignId: string;
  images: [
    {
      coverType: string;
      url: string;
      remoteUrl: string;
    },
  ];
  monitored: boolean;
  rootFolderPath: string;
  qualityProfile: string;
  searchOnAdd: boolean;
  tags: Tag[];
  added: string;
  id: number;
};

// Define the structure of a Studio, representing studio details in Whisparr.
type Studio = {
  foreignId: string;
  id: number;
  monitored: boolean;
  network: string;
  qualityProfileId: number;
  rootFolderPath: string;
  searchOnAdd: boolean;
  title: string;
};

// Define the structure of an Exclusion object, representing an exclusion entry in Whisparr.
type Exclusion = {
  foreignId: string;
  movieTitle: string;
  movieYear: number;
  id: number;
};

// Define the structure of a SystemStatus, providing information about the system's current status.
type SystemStatus = {
  appName: string;
  instanceName: string;
  version: string;
  buildTime: string;
  isDebug: boolean;
  isProduction: boolean;
  isAdmin: boolean;
  isUserInteractive: boolean;
  startupPath: string;
  appData: string;
  osName: string;
  osVersion: string;
  isNetCore: boolean;
  isLinux: boolean;
  isOsx: boolean;
  isWindows: boolean;
  isDocker: boolean;
  mode: string;
  branch: string;
  databaseType: string;
  databaseVersion: string;
  authentication: string;
  migrationVersion: number;
  urlBase: string;
  runtimeVersion: string;
  runtimeName: string;
  startTime: string;
  packageVersion: string;
  packageAuthor: string;
  packageUpdateMechanism: string;
};

// Define the structure of a Tag, representing a tag in the system.
type Tag = {
  label: string;
  id: number;
};

// Define the structure of a HealthCheck, representing health check details for the system.
type HealthCheck = {
  source: string;
  type: string;
  message: string;
  wikiUrl: string;
};

// Define the inner `body` structure as a type for command payload.
type CommandBody = {
  movieIds: number[];
  sendUpdatesToClient: boolean;
  updateScheduledTask: boolean;
  completionMessage: string;
  requiresDiskAccess: boolean;
  isExclusive: boolean;
  isTypeExclusive: boolean;
  isLongRunning: boolean;
  name: string;
  trigger: string;
  suppressMessages: boolean;
};

// Define the CommandResource type, which represents a command resource in the system.
type CommandResource = {
  name: string;
  commandName: string;
  body: CommandBody;
  priority: "low" | "normal" | "high";
  status: "queued" | "running" | "completed" | "failed";
  result: "unknown" | "success" | "failure";
  queued: string;
  trigger: string;
  sendUpdatesToClient: boolean;
  updateScheduledTask: boolean;
};

export {
  HealthCheck,
  Tag,
  SystemStatus,
  Exclusion,
  Studio,
  Performer,
  UnmappedFolder,
  RootFolder,
  QualityProfile,
  Language,
  QualityItem,
  Quality,
  CommandResponse,
  Scene,
  LookupSceneResponse,
  Image,
  OriginalLanguage,
  CommandBody,
  CommandResource,
  Options,
  ExclusionMap,
};
