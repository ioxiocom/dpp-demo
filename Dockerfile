FROM ubuntu:24.04

ENV \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    TZ="UTC" \
    DEBIAN_FRONTEND="noninteractive" \
    GID=2000 \
    UID=2000 \
    USER="api" \
    GROUP="api" \
    PATH="${PATH}:/root/.bun/bin:/home/api/.bun/bin" \
    ENV_LAST_LINE="LEAVE-ME-HERE"

# Ensure the system is up-to-date and has basic utilities in place
RUN : \
 && set -exu \
 && apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y --no-install-recommends sudo curl unzip ca-certificates \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && rm -rf /root/.cache \
 && rm -rf /usr/share/doc \
 && :

# Set up runtime user
RUN : \
 && set -exu \
 && groupadd --system --gid "${GID}" "${GROUP}" \
 && useradd \
    --uid "${UID}" \
    --shell /bin/bash \
    --gid "${GID}" \
    --create-home \
    "${USER}" \
 && :

# Install base tools required to install software, Node and Bun
RUN : \
 && set -exu \
 && curl -sL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get update \
 && apt-get install -y --no-install-recommends nodejs \
 && curl -fsSL https://bun.com/install | bash \
 && curl -fsSL https://bun.com/install | sudo -u "${USER}" bash \
 && :

# Install software dependencies
WORKDIR /src
COPY package.json bun.lock ./
RUN : \
 && set -exu \
 && bun install \
 && :

# Install source code etc. project files
COPY svelte.config.js tsconfig.json vite.config.ts ./
COPY docker ./docker/
COPY src ./src/
COPY static ./static/
RUN find .

# Build the project
RUN : \
 && set -exu \
 && bun run build \
 && :

# Configure runtime entrypoint
USER ${USER}
EXPOSE 8080
ENTRYPOINT ["bash", "/src/docker/runtime-entrypoint.sh"]
