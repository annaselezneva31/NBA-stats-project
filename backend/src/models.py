from typing import Dict, List
from pydantic import BaseModel

class ShotChartResponse(BaseModel):
    LOC_X: List[float]
    LOC_Y: List[float]
    SHOT_MADE_FLAG: List[int]