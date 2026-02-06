import json
import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler

# Load model config from JSON
with open('../models.json') as f:
    models = json.load(f)['models']
config = next(m for m in models if m['id'] == 'price_predictor')

# Fetch data (e.g., from Coingecko proxy in env)
# For demo: Assume CSV input
data = pd.read_csv('crypto_historical.csv')  
features = data[config['params']['features']]
target = data[config['params']['target']]

# Preprocess
scaler = MinMaxScaler()
scaled_features = scaler.fit_transform(features)

# Build LSTM model
model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(scaled_features.shape[1], 1)))
model.add(LSTM(50))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mean_squared_error')

# Train
X = np.reshape(scaled_features, (scaled_features.shape[0], scaled_features.shape[1], 1))
y = target.values
model.fit(X, y, epochs=config['params']['epochs'], batch_size=32)

# Save model
model.save('price_predictor_model.h5')
print("Model trained and saved.")