#!/usr/bin/env bash
set -euo pipefail

# PM2 helper for running the backend service.
#
# This script can start the backend via pnpm start (package.json)
# or directly via the built entry file (dist/index.js by default).
#
# Usage examples:
#   ./scripts/pm2_backend.sh start                 # start via pnpm in apps/backend
#   ./scripts/pm2_backend.sh start --direct        # start via node dist/index.js
#   ./scripts/pm2_backend.sh restart
#   ./scripts/pm2_backend.sh stop
#   ./scripts/pm2_backend.sh status
#   ./scripts/pm2_backend.sh save
#   ./scripts/pm2_backend.sh startup
#
# Options (env or flags):
#   --name NAME            PM2 app name (default: asi-gyan-backend) or APP_NAME env
#   --dir  PATH            Backend directory (default: apps/backend) or BACKEND_DIR env
#   --entry FILE           Built entry file (default: dist/index.js) or ENTRY_FILE env
#   --direct               Use direct node entry instead of pnpm start
#

APP_NAME=${APP_NAME:-asi-gyan-backend}
BACKEND_DIR=${BACKEND_DIR:-apps/backend}
ENTRY_FILE=${ENTRY_FILE:-dist/index.js}
MODE="pnpm" # or "direct"

usage() {
  sed -n '1,60p' "$0" | sed 's/^# \{0,1\}//'
}

die() { echo "Error: $*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "'$1' is required but not found in PATH"
}

cmd=${1:-}
shift || true

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name) APP_NAME="$2"; shift 2;;
    --dir) BACKEND_DIR="$2"; shift 2;;
    --entry) ENTRY_FILE="$2"; shift 2;;
    --direct) MODE="direct"; shift;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown option: $1"; usage; exit 1;;
  esac
done

[ -n "$cmd" ] || { usage; exit 1; }

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
BACKEND_ABS="$ROOT_DIR/$BACKEND_DIR"
ENTRY_ABS="$BACKEND_ABS/$ENTRY_FILE"

require_cmd pm2

start_pnpm() {
  require_cmd pnpm
  [ -d "$BACKEND_ABS" ] || die "Backend dir not found: $BACKEND_ABS"
  echo "Starting backend via pnpm start (cwd=$BACKEND_ABS) as PM2 app '$APP_NAME'"
  (
    cd "$BACKEND_ABS"
    pm2 start pnpm --name "$APP_NAME" -- start
  )
}

start_direct() {
  [ -f "$ENTRY_ABS" ] || die "Entry file not found: $ENTRY_ABS (build backend first)"
  echo "Starting backend via node $ENTRY_ABS as PM2 app '$APP_NAME'"
  pm2 start "$ENTRY_ABS" --name "$APP_NAME"
}

case "$cmd" in
  start)
    if [[ "$MODE" == "direct" ]]; then
      start_direct
    else
      start_pnpm
    fi
    ;;
  restart)
    pm2 restart "$APP_NAME" || true
    ;;
  stop)
    pm2 stop "$APP_NAME" || true
    ;;
  delete)
    pm2 delete "$APP_NAME" || true
    ;;
  status)
    pm2 status
    ;;
  save)
    pm2 save
    ;;
  startup)
    pm2 startup
    ;;
  *)
    echo "Unknown command: $cmd" >&2
    usage
    exit 1
    ;;
esac

echo "Done."
