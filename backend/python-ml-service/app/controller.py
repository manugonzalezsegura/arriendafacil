# backend/python-ml-service/app/controller.py
from .model.predictor import calcular_score
from .schemas import PerfilInquilinoInput

def procesar_perfil(perfil: PerfilInquilinoInput):
    resultado = calcular_score(perfil.dict())
    return {
        "id_usuario": perfil.id_usuario,
        **resultado
    }
