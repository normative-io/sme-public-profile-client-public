<!--
 Copyright 2022 Meta Mind AB

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# Public Sector Average Emissions Dashboard aka Industry CO2 Insigths

A public dashboard for emissions.

## Installation

> 🚧 **Warning**
>
> It is currently not possible for developers not associated with Normative to
> start this project as it requires access to protected resources.

```bash
# Log in to NPM so you can access private packages.
$ yarn npm login
# Install all the dependencies.
$ yarn
```

## Running the app

```bash
# Run the local dev server connected to local services
$ yarn run dev

# Build deployment bundle
$ yarn run build

# Run ESLint
$ yarn run lint

# Run Prettier and format
$ yarn run format
```

## Running against Normative dev environment

You will need to create a file `.env.dev-staging` (this is gitignored and should not be committed to the repository). In this file, set variables:

```
PUBLIC_VAR_SECTOR_AVERAGE_SERVICE_PROTO_DOMAIN=... https://... domain for the dev sector-average-service.
CLIENT_GOOGLE_ANALYTICS_ID=xyz
```

Then you can launch a local server connected to the staging services:

```bash
$ yarn run dev-staging
```

## Running in container

This project is part of public profile infrastructure and can start along with other services in a docker environment. To find out more how docker image is created/started, look at this [README](https://github.com/normative-io/sme-public-profile-infrastructure-public/blob/main/README.md) file

## Dev setup

**NVM, Node/NPM version:** \
The project is currently set up for Node 14. There is a `.nvmrc` file in
the repository root, so you can run `nvm use` to switch to the matching version.
It's also possible to integrate nvm with your shell further (for bash, zsh,
fish) to run `nvm use` automatically when changing directories. See
[documentation](https://github.com/nvm-sh/nvm#deeper-shell-integration).

**VSCode TypeScript version:** \
To use the package.json defined version of TypeScript, open a .ts or .tsx file,
then bring up the command palette (`ctrl+shift+p`), run "Select TypeScript
Version...", and pick "Use Workspace Version".

**EditorConfig:** \
The repo includes a [.editorconfig](https://editorconfig.org/) to specify basic
editor settings for indentation, character-set, etc. Please install the VS Code
EditorConfig extension, or the plugin for your preferred editor/IDE so that the
project settings will be used.

## Contributing

This project is maintained by Normative but currently not actively seeking external contributions. If you however are interested in contributing to the project please [sign up here](https://docs.google.com/forms/d/e/1FAIpQLSe80c9nrHlAq6w2vUbeFSPVGG7IPqorKMkizhHJ98viwnT-OA/viewform?usp=sf_link) or come [join us](https://normative.io/jobs/).

Thank you to all the people from Google.org who were critical in making this project a reality!
- John Bartholomew ([@johnbartholomew](https://github.com/johnbartholomew))
- Megan Hopp ([@meganhopp](https://github.com/meganhopp))
- Craig Rogers ([@twentyrogersc](https://github.com/twentyrogersc))
- Mishu Garg ([@mishugarg09](https://github.com/mishugarg09))

## License
Copyright (c) Meta Mind AB. All rights reserved.

Licensed under the [Apache-2.0 license](/LICENSE)
