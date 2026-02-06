import json
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer  

# Load model config from JSON
with open('../models.json') as f:
    models = json.load(f)['models']
config = next(m for m in models if m['id'] == 'sentiment_analyzer')


data = pd.read_csv('crypto_sentiment_data.csv')  # Replace with actual data path or fetch
texts = data['text'].values
labels = data['labels'].values  # As per config: ["bullish", "bearish", "neutral"]

# Preprocess
vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(texts).toarray()

label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)

# Convert to tensors
X = torch.tensor(X, dtype=torch.float32)
y = torch.tensor(y, dtype=torch.long)

# Custom Dataset
class SentimentDataset(Dataset):
    def __init__(self, features, labels):
        self.features = features
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        return self.features[idx], self.labels[idx]

dataset = SentimentDataset(X, y)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

# Simple Neural Net Model
class SentimentClassifier(nn.Module):
    def __init__(self, input_size, num_classes):
        super(SentimentClassifier, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, num_classes)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

input_size = X.shape[1]
num_classes = len(config['params']['labels'])
model = SentimentClassifier(input_size, num_classes)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Train
epochs = 20  # Configurable; using default for demo
for epoch in range(epochs):
    for features, targets in dataloader:
        optimizer.zero_grad()
        outputs = model(features)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()
    print(f"Epoch {epoch+1}/{epochs}, Loss: {loss.item()}")

# Save model
torch.save(model.state_dict(), 'sentiment_analyzer_model.pth')
print("Sentiment model trained and saved.")