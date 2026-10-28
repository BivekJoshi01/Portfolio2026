#!/bin/bash
# Deploys the site to cPanel (~/bivekjoshi03.com.np) from your own machine.
#
#   git push origin main
#   bash deploy/deploy-local.sh
#
# It builds what is pushed to main on GitHub, never your working tree, so
# uncommitted edits cannot slip onto the live site.
# Override any default with an environment variable, e.g.
#   SSH_KEY=~/.ssh/portfolio_deploy bash deploy/deploy-local.sh

set -euo pipefail

BRANCH="${BRANCH:-origin/main}"
SERVER_HOST="${SERVER_HOST:-202.63.243.186}"
SERVER_PORT="${SERVER_PORT:-22}"
SERVER_USER="${SERVER_USER:-investca}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/investcare_deploy}"
REMOTE_DIR="${SERVER_DEPLOY_PATH:-bivekjoshi03.com.np}"
SITE_URL="${SITE_URL:-https://bivekjoshi03.com.np}"

REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
WORK=$(mktemp -d)
SOCKET="$WORK/ssh-cm"
SSH_OPTS=(-i "$SSH_KEY" -p "$SERVER_PORT" -o IdentitiesOnly=yes -o BatchMode=yes
          -o ControlMaster=auto -o ControlPath="$SOCKET" -o ControlPersist=10m)

cleanup() {
  ssh "${SSH_OPTS[@]}" -O exit "$SERVER_USER@$SERVER_HOST" 2>/dev/null || true
  rm -rf "$WORK"
}
trap cleanup EXIT

# public_html is investcare.com.np. A wrong path would make the sync step
# delete that site's files, so stop before doing anything.
case "${REMOTE_DIR%/}" in
  ""|"."|"~"|public_html|public_html/*)
    echo "SERVER_DEPLOY_PATH='$REMOTE_DIR' points at public_html or the home directory - that is investcare.com.np"
    exit 1
    ;;
esac

echo "==> Fetching $BRANCH"
git -C "$REPO" fetch -q origin
SRC="$WORK/src"
mkdir "$SRC"
git -C "$REPO" archive "$BRANCH" | tar -x -C "$SRC"
echo "    commit $(git -C "$REPO" rev-parse --short "$BRANCH")"

echo "==> Building"
( cd "$SRC" && npm ci --no-audit --no-fund && npm run build )

cp "$SRC/deploy/site.htaccess" "$SRC/dist/.htaccess"
cp "$SRC/deploy/assets.htaccess" "$SRC/dist/assets/.htaccess"

# A silently-failed build must never be allowed to empty the live site.
test -f "$SRC/dist/index.html"       || { echo "dist/index.html missing";       exit 1; }
test -f "$SRC/dist/.htaccess"        || { echo "dist/.htaccess missing";        exit 1; }
test -f "$SRC/dist/assets/.htaccess" || { echo "dist/assets/.htaccess missing"; exit 1; }
ls "$SRC"/dist/assets/index-*.js >/dev/null 2>&1 || { echo "dist/assets has no entry script"; exit 1; }

echo "==> Connecting to $SERVER_USER@$SERVER_HOST:$SERVER_PORT"
ssh "${SSH_OPTS[@]}" "$SERVER_USER@$SERVER_HOST" \
  "test -d '$REMOTE_DIR' && echo 'remote dir OK' || { echo '~/$REMOTE_DIR does not exist - add the domain in cPanel first'; exit 1; }"

echo "==> Uploading"
tar czf "$WORK/portfolio-deploy.tgz" -C "$SRC/dist" .
ls -lh "$WORK/portfolio-deploy.tgz"
cp "$SRC/deploy/remote-sync.sh" "$WORK/portfolio-sync.sh"
scp -i "$SSH_KEY" -P "$SERVER_PORT" -o IdentitiesOnly=yes -o BatchMode=yes \
    -o ControlPath="$SOCKET" \
    "$WORK/portfolio-deploy.tgz" "$WORK/portfolio-sync.sh" "$SERVER_USER@$SERVER_HOST:~/"
ssh "${SSH_OPTS[@]}" "$SERVER_USER@$SERVER_HOST" \
  "chmod +x ~/portfolio-sync.sh && ~/portfolio-sync.sh ~/portfolio-deploy.tgz ~/$REMOTE_DIR && rm -f ~/portfolio-sync.sh"

echo "==> Checking $SITE_URL"
code=$(curl -s -o "$WORK/page.html" -w '%{http_code}' --max-time 30 "$SITE_URL/" || true)
echo "GET $SITE_URL/ -> $code"
entry=$(grep -o 'assets/index-[^"]*\.js' "$SRC/dist/index.html" | head -1)
if [ "$code" = "200" ] && grep -qF "$entry" "$WORK/page.html"; then
  echo "Live site is serving this build ($entry)."
else
  echo "WARNING: $SITE_URL is not serving this build yet ($entry). Expected until Cloudflare DNS points at the cPanel server."
fi
