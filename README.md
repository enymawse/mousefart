# MouseFart

MouseFart is an npm package that provides an API wrapper for interacting with Whisparr V3, enabling seamless integration and management of media collections.

## Features

- Fetch scene details and metadata
- Add and manage movies in Whisparr
- Execute commands via API
- Handle exclusions, quality profiles, and tags

## Installation

You can install MouseFart via npm:

```sh
npm install mousefart
```

or using yarn:

```sh
yarn add mousefart
```

## Usage

Import and initialize the package:

```ts
import { MouseFart } from "mousefart";

const mouseFart = new MouseFart("http://localhost:6969", "WHISPARR_API_KEY", {
  rootFolderPath: "/media/movies",
  qualityProfile: 1,
  searchOnAdd: true,
  tags: [1, 2],
});
```

### Fetching a Scene

```ts
const scene = await mouseFart.scenes.get("replace-with-stash-id");
console.log(scene.title);
```

### Adding a Scene

```ts
const newScene = await mouseFart.scenes.add("replace-with-stash-id");
```

## Types

This package provides TypeScript support with various types for strong type safety. You can import them as needed:

```ts
import { Scene, QualityProfile } from "mousefart";
```

## Contributing

Pull requests and issues are welcome. Please ensure all changes are linted and tested before submitting.

## License

This project is licensed under the MIT License.

---

For more details, check out the source code and documentation!
