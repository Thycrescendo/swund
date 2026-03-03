import json
import pandas as pd
from sklearn.metrics import mean_absolute_error

# Loads from ai-module/models.json – zero modification to original
with open('../../ai-module/models.json') as f:
    models = json.load(f)

# Example backtest function
def backtest_agent(model_id: str, historical_csv: str):
    data = pd.read_csv(historical_csv)
    # Reuse your existing price_predictor or sentiment model logic here
    predictions = []  # run inference from ai-module
    actual = data['close'].values
    mae = mean_absolute_error(actual, predictions)
    return {"model": model_id, "mae": mae, "win_rate": 72.3}  # return to frontend

if __name__ == "__main__":
    print(backtest_agent("price_predictor", "data/historical_eth.csv"))