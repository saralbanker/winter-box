#!/bin/bash
# winter-box setup — installs ag-kit + vonod global skills in one command

set -e

echo "⚡ winter-box: installing @vudovn/ag-kit..."
npx @vudovn/ag-kit@latest init

echo "⚡ winter-box: installing @vonod/ag-kit global skills..."
npx @vonod/ag-kit@latest init

echo ""
echo "✅ Setup complete."
echo "   ag-kit base:     $(ls .agent/skills | wc -l | tr -d ' ') skills from @vudovn/ag-kit"
echo "   global skills:   12 skills from @vonod/ag-kit"
echo "   total:           $(ls .agent/skills | wc -l | tr -d ' ') skills available"
echo ""
echo "💡 Activate with: @skill-name in your Antigravity IDE"
echo "💡 Full install:  npx @vonod/ag-kit init"
echo "💡 Single skill:  npx @vonod/ag-kit add debugging-master"
