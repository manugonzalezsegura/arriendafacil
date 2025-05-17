# backend/python-ml-service/app/schemas.py
from pydantic import BaseModel
from typing import Optional, List, Dict

class PagoMensual(BaseModel):
    mes: str         # formato YYYY-MM
    pagado: bool

class PerfilInquilinoInput(BaseModel):
    id_usuario: int
    id_comuna: int
    sueldo: float
    sueldo_pareja: Optional[float] = 0
    dependientes: int
    profesion: str
    antiguedad_laboral: int
    puntaje_credito: Optional[int] = None
    historial_pagos: Optional[List[PagoMensual]] = None
