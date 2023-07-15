@echo off

REM Run the Python script
python assets/fileUpdater.py

git status

REM Prompt for confirmation to commit and push
set /p "commit_confirmation=Do you want to commit and push the changes? (y/n): "

IF /I "%commit_confirmation%"=="y" (
    REM Make the commit
    git commit -am "Automatic commit of artwork"

    REM Push to the main branch
    git push origin main

    echo Changes committed and pushed successfully.
) ELSE (
    echo No changes were committed or pushed.
)
