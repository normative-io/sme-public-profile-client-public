# Copyright 2022 Meta Mind AB
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Pull external dependencies
FROM node:14-bullseye-slim AS deps
WORKDIR /app
COPY .yarnrc.yml tsconfig.json package.json yarn.lock ./
COPY .yarn ./.yarn/
RUN --mount=type=secret,id=NPM_AUTH_TOKEN \
  yarn config set npmAuthToken "$(cat /run/secrets/NPM_AUTH_TOKEN)" && \
  yarn install --immutable --inline-builds

# Run NextJS build step.
FROM node:14-bullseye-slim AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/.yarn/cache ./.yarn/cache
COPY --from=deps /app/node_modules ./node_modules
# NextJS build script, followed by yarn focus to strip out non-production deps.
# Patch local .yarnrc.yml otherwise the husky (git hooks) postinstall script
# is run (and fails) during `yarn workspaces focus`. (Workspaces focus does
# not support --ignore-scripts flag).
# See https://github.com/typicode/husky/issues/939
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
# Ideally we wouldn't need to inject this at build time.
ARG CLIENT_GOOGLE_ANALYTICS_ID=x
RUN \
  mkdir -p public/env && \
  yarn run build && \
  yarn workspaces focus -A --production

# Create production image.
FROM node:14-bullseye-slim AS runner
WORKDIR /app

# Copy the distribution bundle / "built" outputs from the builder.
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.yarn/plugins ./.yarn/plugins
COPY --from=builder --chown=node:node /app/.yarn/releases ./.yarn/releases
COPY --from=builder --chown=node:node /app/.yarn/install-state.gz ./.yarn/install-state.gz
COPY --from=builder --chown=node:node /app/.yarnrc.yml /app/tsconfig.json /app/package.json /app/yarn.lock ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next

EXPOSE 3000

USER node
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "run", "start", "-p", "3000"]
