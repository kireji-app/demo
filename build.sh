# © 2013-2024 Eric Augustinowicz and Kristina Soriano
branch=$(git branch --show-current)
suffix=$( [[ $branch == "main" ]] || echo "-$branch.")
commit=$( [ $suffix ] && git merge-base main test-feature || echo "HEAD")
version="$(git log -1 --pretty=%s $commit)$( [ $suffix ] && echo "$suffix$(git rev-list --count $commit..HEAD)")"
echo "[build.sh] $version"
sed -i "s/%ver%/$version/" public/server.js