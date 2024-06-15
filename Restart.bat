@echo off
echo Shutting down all Node.js servers...
setlocal
start Stop.bat
:: Update or clone the NetVar repository
echo NetVar Update and Start....
set REPO_URL=https://github.com/3disturbed/NetVar.git
set CLONE_DIR=../NetVar

if exist %CLONE_DIR% (
    echo Directory exists. Pulling latest changes...
    cd %CLONE_DIR%
    git pull
    cd ..
) else (
    echo Directory does not exist. Cloning repository...
    git clone "%REPO_URL%" %CLONE_DIR%
)
echo Complete, Starting Servers...
pause
:: Start the servers
cd NetVar
start AuthServer.bat
start WebServer.bat
start WorldServer.bat
start CharacterServer.bat

endlocal

