#!/bin/bash
NODE_DIR="/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs"
export PATH="$NODE_DIR:$PATH"
NPMC="$NODE_DIR/node_modules/npm/bin/npm-cli.js"
cd /tmp/ppt-test
node "$NPMC" init -y
PUPPETEER_CACHE_DIR=/tmp/ppt-cache node "$NPMC" install puppeteer 2>&1 | tail -8
