@echo off

REM Run the Python script
python assets/fileUpdater.py

git status

REM Prompt for confirmation to commit and push
set /p "commit_confirmation=Do you want to 'git add .' and commit and push the changes? (y/n): "

IF /I "%commit_confirmation%"=="y" ( 
    git add .

    REM Make the commit with the custom message %custom_message%
    git commit -am "Automatic commit of artwork"

    REM Push to the main branch
    git push origin main

    echo Changes committed and pushed successfully.
) ELSE (
    echo No changes were committed or pushed.
)
