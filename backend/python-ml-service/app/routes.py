# backend/python-ml-service/app/routes.py
from fastapi import APIRouter
from .schemas import PerfilInquilinoInput
from .controller import procesar_perfil

router = APIRouter()

@router.post("/calcular-score")
def calcular(perfil: PerfilInquilinoInput):
    return procesar_perfil(perfil)
