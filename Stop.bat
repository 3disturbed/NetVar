@echo off
echo Shutting down all Node.js servers...
setlocal

:: Terminate all running node.exe processes
for /f "tokens=2 delims=," %%I in ('tasklist /fi "IMAGENAME eq node.exe" /fo csv /nh') do (
    echo Terminating process with PID %%I
    taskkill /f /pid %%I
)

endlocal
exit
