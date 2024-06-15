@echo off
echo Getting Data
start npm install bcryptjs smtp-server jsonwebtoken body-parser
git clone https://github.com/3disturbed/NetVar.git


echo Press return after install to start servers.
pause
cd NetVar
start Restart.bat

exit
