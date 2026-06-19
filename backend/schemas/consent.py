from pydantic import BaseModel
from typing import Optional


class ConsentUpdateRequest(BaseModel):
    qa: Optional[bool] = None
    alerts: Optional[bool] = None
    fd: Optional[bool] = None
    investments: Optional[bool] = None


class ConsentResponse(BaseModel):
    qa: bool
    alerts: bool
    fd: bool
    investments: bool


class DataDeleteResponse(BaseModel):
    message: str
