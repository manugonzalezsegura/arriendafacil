# backend/python-ml-service/app/model/predictor.py
import joblib
import numpy as np
import os

# Ruta del modelo
MODEL_PATH = os.path.join(os.path.dirname(__file__), "modelo_entrenado.pkl")

# Intentar cargar el modelo solo si existe
modelo = None
if os.path.exists(MODEL_PATH):
    print(f"✅ Modelo encontrado en: {MODEL_PATH}")
    modelo = joblib.load(MODEL_PATH)
else:
    print(f"⚠️  Modelo no encontrado en: {MODEL_PATH}. Entrénalo antes de usar el predictor.")

# Calcula la puntualidad desde el historial
def calcular_puntualidad(historial):
    if not historial or len(historial) == 0:
        return None
    total = len(historial)
    pagados = sum(1 for h in historial if h.get("pagado"))
    return round(pagados / total, 2)

# Calcula el score usando el modelo cargado
def calcular_score(data):
    if modelo is None:
        raise RuntimeError("❌ El modelo no ha sido cargado. Ejecuta 'entrenar_modelo.py' para generarlo.")

    historial = data.get("historial_pagos")
    puntualidad = calcular_puntualidad(historial)

    input_data = [
        data["sueldo"],
        data["sueldo_pareja"],
        data["dependientes"],
        data["antiguedad_laboral"],
        data.get("puntaje_credito", 500),
        hash(data["profesion"]) % 1000,
        data["id_comuna"] % 100,
        puntualidad if puntualidad is not None else 0.5
    ]

    input_array = np.array(input_data).reshape(1, -1)
    score = int(modelo.predict(input_array)[0])
    porcentaje = round(((score - 300) / (850 - 300)) * 100, 2)

    if score < 600:
        categoria = "riesgo alto"
    elif score < 750:
        categoria = "riesgo medio"
    else:
        categoria = "riesgo bajo"

    return {
        "score": score,
        "riesgo": categoria,
        "porcentaje": porcentaje,
        "puntualidad": puntualidad
    }
