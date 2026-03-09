#!/bin/bash
NODE_DIR="/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs"
export PATH="$NODE_DIR:$PATH"

CHROME="/tmp/ppt-cache/chrome/win64-146.0.7680.31/chrome-win64/chrome.exe"
WIN_CHROME=$(cygpath -w "$CHROME")
export PUPPETEER_EXECUTABLE_PATH="$WIN_CHROME"

# Get Windows path for puppeteer
WIN_PPT=$(cygpath -w /tmp/ppt-test)
export PUPPETEER_WIN_PATH="$WIN_PPT"

URL="${1:-http://localhost:3000}"
LABEL="${2:-}"

node "c:/Users/MichałLitworowski/Downloads/3D_website/take_screenshot.mjs" "$URL" "$LABEL" 2>&1
