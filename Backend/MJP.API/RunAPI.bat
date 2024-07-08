SET workspaceFolder=E:\Sriram Bkp\Projects\MJP\src\Backend\MJP.API\
SET projFile=MJP.API.csproj
SET exeFile=MJP.API.dll

SET ASPNETCORE_ENVIRONMENT=Development


REM build
dotnet build "%workspaceFolder%\%projFile%"

REM Run
dotnet run "%workspaceFolder%/bin/Debug/net6.0/%exeFile%"