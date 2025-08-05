#!/usr/bin/env bash

# shellcheck disable=SC2039
set -euo pipefail

# Using PORT if defined (in Google Cloud Run), defaulting to 8080
export PORT=${PORT:-8080}

# Start the SvelteKit server
exec bun run start
