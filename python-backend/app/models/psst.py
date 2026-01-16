"""
PSST 문서 모델
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class ProblemSection(BaseModel):
    """Problem 섹션 모델"""
    title: str
    market_issues: List[str]
    social_reasons: List[str]
    economic_reasons: List[str]
    urgency: str


class SolutionSection(BaseModel):
    """Solution 섹션 모델"""
    title: str
    core_technology: str
    key_features: List[str]
    differentiation: List[str]
    competitive_advantage: str


class Milestone(BaseModel):
    """마일스톤 모델"""
    year: int
    quarter: int
    goal: str
    metric: str


class ScaleUpSection(BaseModel):
    """Scale-up 섹션 모델"""
    title: str
    revenue_model: str
    revenue_streams: List[str]
    market_entry_strategy: str
    expansion_plan: str
    market_share_goal: str
    milestones: List[Milestone]


class TeamMember(BaseModel):
    """팀원 모델"""
    name: str
    role: str
    expertise: List[str]
    experience: str
    education: Optional[str] = None


class TeamSection(BaseModel):
    """Team 섹션 모델"""
    title: str
    ceo: TeamMember
    core_team: List[TeamMember]
    advisors: Optional[List[TeamMember]] = None
    network: List[str]
    capabilities: List[str]


class PSSTMetadata(BaseModel):
    """PSST 메타데이터 모델"""
    industry_code: str
    industry_name: str
    user_input: str
    expert_solution: Optional[str] = None
    created_at: str
    ai_generated: bool
    version: str


class PSSTDocument(BaseModel):
    """PSST 문서 전체 모델"""
    problem: Dict[str, Any]
    solution: Dict[str, Any]
    scale_up: Dict[str, Any]
    team: Dict[str, Any]
    metadata: Dict[str, Any]
    
    def to_dict(self) -> dict:
        """딕셔너리로 변환"""
        return {
            "problem": self.problem,
            "solution": self.solution,
            "scale_up": self.scale_up,
            "team": self.team,
            "metadata": self.metadata
        }

