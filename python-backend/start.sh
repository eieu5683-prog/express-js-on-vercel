#!/bin/bash

# Python Backend 서버 시작 스크립트

echo "Python Backend 서버를 시작합니다..."
echo "포트: 8000"
echo "URL: http://localhost:8000"

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

