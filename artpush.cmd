@echo off

REM Run the Python script
python assets/fileUpdater.py

git status

REM Prompt for confirmation to commit and push
set /p "commit_confirmation=Do you want to 'git add .' and commit and push the changes? (y/n): "

IF /I "%commit_confirmation%"=="y" (
    REM Prompt for a custom commit message or use a default message if left blank
    set /p "custom_message=Enter a custom commit message (or press Enter to use the default): "

    if "%custom_message%"=="" (
        set "custom_message=Automatic commit of artwork"
    )
    
    git add .

    REM Make the commit with the custom message
    git commit -am "%custom_message%"

    REM Push to the main branch
    git push origin main

    echo Changes committed and pushed successfully.
) ELSE (
    echo No changes were committed or pushed.
)
