# backend/python-ml-service/app/main.py
from fastapi import FastAPI
from .routes import router

app = FastAPI(title="Servicio ML de Puntaje Financiero")
app.include_router(router)

@app.get("/")
def status():
    return {"status": "ok"}
