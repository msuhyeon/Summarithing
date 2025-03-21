#!/bin/bash
source venv/bin/activate
# 배포할땐 --reload 옵션 빼야함
uvicorn main:app --reload --port 4000