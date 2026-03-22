#!/bin/bash
set -e
pip install reportlab pillow
python scripts/generate_pm_toolkit.py
echo "✅ Done — 20 PDFs in public/downloads/pm-toolkit/"
