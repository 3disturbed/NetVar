@echo off
echo Shutting down all Node.js servers...
setlocal

:: Terminate all running node.exe processes
for /f "tokens=2 delims=," %%I in ('tasklist /fi "IMAGENAME eq node.exe" /fo csv /nh') do (
    echo Terminating process with PID %%I
    taskkill /f /pid %%I
)

:: Update or clone the NetVar repository
echo NetVar Update and Start....
set REPO_URL=https://github.com/3disturbed/NetVar.git
set CLONE_DIR=NetVar

if exist %CLONE_DIR% (
    echo Directory exists. Pulling latest changes...
    cd %CLONE_DIR%
    git pull
    cd ..
) else (
    echo Directory does not exist. Cloning repository...
    git clone "%REPO_URL%" %CLONE_DIR%
)


endlocal
exit
