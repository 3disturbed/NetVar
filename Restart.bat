
echo Shutting down all Node.js servers...
setlocal

:: Update or clone the NetVar repository
echo NetVar Update and Start....
set REPO_URL=https://github.com/3disturbed/NetVar.git    
git pull
    
echo Complete, Starting Servers...

:: Start the servers
cd NetVar
start AuthServer.bat
start WebServer.bat
start WorldServer.bat
start CharacterServer.bat

endlocal
exit

