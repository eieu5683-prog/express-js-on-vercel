"""
FastAPI 서버 - PSST 사업계획서 HWP 생성 API
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
import tempfile
from datetime import datetime

from app.services.hwp_generator import HWPGenerator
from app.models.psst import PSSTDocument

app = FastAPI(title="PSST HWP Generator API", version="1.0.0")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://narat-don-navi.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PSSTGenerationRequest(BaseModel):
    """PSST 생성 요청 모델"""
    problem: Dict[str, Any]
    solution: Dict[str, Any]
    scale_up: Dict[str, Any]
    team: Dict[str, Any]
    metadata: Dict[str, Any]


@app.get("/")
async def root():
    """헬스 체크"""
    return {"message": "PSST HWP Generator API", "status": "running"}


@app.post("/api/generate-hwp")
async def generate_hwp(request: PSSTGenerationRequest):
    """
    PSST 데이터를 받아 HWP 파일을 생성합니다.
    
    Args:
        request: PSST 문서 데이터
        
    Returns:
        생성된 HWP 파일
    """
    try:
        # PSST 문서 객체 생성
        psst_doc = PSSTDocument(
            problem=request.problem,
            solution=request.solution,
            scale_up=request.scale_up,
            team=request.team,
            metadata=request.metadata
        )
        
        # HWP 생성기 초기화
        generator = HWPGenerator()
        
        # HWP 파일 생성
        output_path = await generator.generate_hwp(psst_doc)
        
        # 파일명 생성
        industry_name = request.metadata.get("industryName", "사업계획서")
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"PSST_{industry_name}_{timestamp}.hwp"
        
        return FileResponse(
            output_path,
            media_type="application/x-hwp",
            filename=filename,
            headers={"Content-Disposition": f'attachment; filename="{filename}"'}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"HWP 생성 실패: {str(e)}")


@app.get("/api/health")
async def health_check():
    """서버 상태 확인"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

