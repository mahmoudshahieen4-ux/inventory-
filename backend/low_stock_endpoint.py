from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class LowStockProduct(BaseModel):
    id: int
    name: str
    stock: int
    threshold: int

# This is placeholder inventory data. Replace with your database query.
products_db = [
    {"id": 1, "name": "مصل تجميلي", "stock": 3, "threshold": 5},
    {"id": 2, "name": "كمامة طبية", "stock": 15, "threshold": 5},
    {"id": 3, "name": "أدوات مختبرية", "stock": 2, "threshold": 5},
]

@app.get("/low-stock", response_model=List[LowStockProduct])
def get_low_stock_items(threshold: int = 5):
    """Return products whose stock is at or below the threshold."""
    return [
        LowStockProduct(**product)
        for product in products_db
        if product["stock"] <= threshold
    ]
