# © 2013-2024 Eric Augustinowicz and Kristina Soriano
echo "<deploy.sh>"

echo " Removing development materials."
rm deploy.sh
rm README.md

echo " Evaluating changed files."
diff=$(git diff --name-only HEAD^ HEAD)
echo " Change log:
$(echo "$diff" | sed 's/^/ * /')"

if [[ "$diff" == "README.md" ]]; then
 code=0
 echo " Only README.md changed. Skipping deployment."
else
 code=1
 ver=$(git log -1 HEAD --pretty=format:%s)
 echo " Setting server.js version number to $ver."
 sed -i "s/%ver%/$ver/" server.js
fi

echo "</deploy.sh>"
exit $code