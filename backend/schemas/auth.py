from pydantic import BaseModel, EmailStr
from typing import Optional


class SignUpRequest(BaseModel):
    name: str
    email: str
    password: str


class SignInRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    token: str
    user: dict


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    is_active: bool
    created_at: str


class MeResponse(BaseModel):
    user: UserResponse
    consent: dict
