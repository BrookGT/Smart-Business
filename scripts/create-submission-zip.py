#!/usr/bin/env python3
"""Create a Silver-compatible submission zip with intact .git at archive root."""
from __future__ import annotations

import os
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT.parent / "Smart-Business-Silver-Submission.zip"
EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    "coverage",
    ".history-staging",
    ".swc",
    "__pycache__",
    "cursor",  # Cursor IDE metadata inside .git breaks Silver history parsing
}
EXCLUDE_FILES_SUFFIX = {".zip"}


def should_skip(path: Path) -> bool:
    parts = set(path.relative_to(ROOT).parts)
    if parts & EXCLUDE_DIRS:
        return True
    if path.suffix.lower() in EXCLUDE_FILES_SUFFIX and path.parent == ROOT:
        return True
    if path.name == "create-submission-zip.py":
        return True
    return False


def main() -> int:
    if OUTPUT.exists():
        OUTPUT.unlink()

    file_count = 0
    with zipfile.ZipFile(
        OUTPUT,
        mode="w",
        compression=zipfile.ZIP_DEFLATED,
        compresslevel=6,
    ) as archive:
        for dirpath, dirnames, filenames in os.walk(ROOT):
            dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
            current = Path(dirpath)
            for name in filenames:
                path = current / name
                if should_skip(path):
                    continue
                arcname = path.relative_to(ROOT).as_posix()
                archive.write(path, arcname)
                file_count += 1

    size_mb = OUTPUT.stat().st_size / (1024 * 1024)
    print(f"Created: {OUTPUT}")
    print(f"Files: {file_count}")
    print(f"Size: {size_mb:.2f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
