@echo off
echo Pushing Changes
start Stop.bat

git add .
git commit -m "Dark's Dev push."
git push
pause
start Restart.bat

exit