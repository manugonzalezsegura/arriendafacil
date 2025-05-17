# backend\python-ml-service\entrenar_modelo.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
import random

# Define patrones de comportamiento por profesión
profesiones = {
    "programador":   {"score_range": (700, 850), "puntualidad_range": (0.9, 1.0)},
    "medico":        {"score_range": (750, 850), "puntualidad_range": (0.95, 1.0)},
    "ingeniero":     {"score_range": (700, 820), "puntualidad_range": (0.9, 1.0)},
    "profesor":      {"score_range": (600, 750), "puntualidad_range": (0.7, 0.85)},
    "vendedor":      {"score_range": (480, 600), "puntualidad_range": (0.4, 0.6)},
    "freelancer":    {"score_range": (550, 750), "puntualidad_range": (0.4, 0.8)},
    "estudiante":    {"score_range": (450, 550), "puntualidad_range": (0.3, 0.5)},
    "sin ocupación": {"score_range": (400, 520), "puntualidad_range": (0.2, 0.4)}
}

datos = []

for profesion, reglas in profesiones.items():
    for _ in range(6):  # genera 6 usuarios por profesión = 48 totales
        sueldo = random.randint(350000, 1200000)
        sueldo_pareja = random.randint(0, 500000)
        dependientes = random.randint(0, 3)
        antiguedad_laboral = random.randint(0, 10)
        puntaje_credito = random.randint(450, 850)
        comuna = random.randint(1, 16)
        puntualidad = round(random.uniform(*reglas["puntualidad_range"]), 2)
        score = random.randint(*reglas["score_range"])

        datos.append({
            "sueldo": sueldo,
            "sueldo_pareja": sueldo_pareja,
            "dependientes": dependientes,
            "antiguedad_laboral": antiguedad_laboral,
            "puntaje_credito": puntaje_credito,
            "profesion": profesion,
            "comuna": comuna,
            "puntualidad": puntualidad,
            "score": score
        })

# Convertir a DataFrame
df = pd.DataFrame(datos)

# Codificar texto a números
df["profesion_hash"] = df["profesion"].apply(lambda x: hash(x) % 1000)
df["comuna_mod"] = df["comuna"] % 100

# Seleccionar features y target
X = df[["sueldo", "sueldo_pareja", "dependientes", "antiguedad_laboral",
        "puntaje_credito", "profesion_hash", "comuna_mod", "puntualidad"]]
y = df["score"]

# Entrenar el modelo
modelo = RandomForestRegressor()
modelo.fit(X, y)

os.makedirs(os.path.join("app", "model"), exist_ok=True)
# Guardar el modelo entrenado
output_path = os.path.join("app", "model", "modelo_entrenado.pkl")

joblib.dump(modelo, output_path)

print("✅ Modelo entrenado y guardado en:", output_path)
