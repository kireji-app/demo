# © 2013-2024 Eric Augustinowicz and Kristina Soriano
VERSION="$(echo $VERCEL_GIT_COMMIT_MESSAGE | head -n 1)$( [[ $VERCEL_GIT_COMMIT_REF == "main" ]] || echo "-$VERCEL_GIT_COMMIT_REF")"
echo "[build.sh] $VERSION"
sed -i "s/\$VERSION/$VERSION/" public/server.js
exit 1