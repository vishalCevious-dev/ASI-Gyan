#!/usr/bin/env bash
set -euo pipefail

# Deploy prebuilt static assets to a server path.
#
# Usage:
#   ./scripts/deploy_static.sh [DEST_PATH] [SOURCE_DIR]
#
# Defaults:
#   DEST_PATH   -> /var/www/my-react-app
#   SOURCE_DIR  -> auto-detected in this order:
#                  ./build  | ./dist  | ./apps/web/dist
#
# Examples:
#   ./scripts/deploy_static.sh                   # uses defaults
#   ./scripts/deploy_static.sh /var/www/site     # choose destination
#   ./scripts/deploy_static.sh /var/www/site ./apps/web/dist

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

DEST_PATH=${1:-/var/www/asi-gyan}
SOURCE_DIR=${2:-}

detect_source_dir() {
  if [[ -n "${SOURCE_DIR}" ]]; then
    echo "$SOURCE_DIR"
    return 0
  fi

  if [[ -d "$ROOT_DIR/build" ]]; then
    echo "$ROOT_DIR/build"
  elif [[ -d "$ROOT_DIR/dist" ]]; then
    echo "$ROOT_DIR/dist"
  elif [[ -d "$ROOT_DIR/apps/web/dist" ]]; then
    echo "$ROOT_DIR/apps/web/dist"
  else
    echo ""  # not found
  fi
}

SRC="$(detect_source_dir)"

if [[ -z "$SRC" ]]; then
  echo "Error: Could not find a build directory."
  echo "Looked for: ./build, ./dist, ./apps/web/dist (or provide SOURCE_DIR explicitly)." >&2
  exit 1
fi

if [[ ! -d "$SRC" ]]; then
  echo "Error: Source directory '$SRC' does not exist." >&2
  exit 1
fi

echo "Deploying static assets"
echo "  Source: $SRC"
echo "  Dest:   $DEST_PATH"

# Create destination directory (requires sudo)
sudo mkdir -p "$DEST_PATH"

# Copy build artifacts (preserves structure). Use rsync if available for efficiency; fallback to cp.
if command -v rsync >/dev/null 2>&1; then
  # --delete keeps destination in sync with source
  sudo rsync -a --delete "$SRC/" "$DEST_PATH/"
else
  # cp does not delete removed files; this is a simple overwrite
  sudo cp -r "$SRC"/* "$DEST_PATH"/
fi

echo "Done. Files deployed to $DEST_PATH"

