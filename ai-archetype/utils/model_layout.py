import json
import networkx as nx
import matplotlib.pyplot as plt

# Load layout from models.json
with open('../models.json') as f:
    layout = json.load(f)['models'][0]['layout']  # Example first model

G = nx.DiGraph()
for node in layout['nodes']:
    G.add_node(node['id'], pos=(node['position']['x'], node['position']['y']))
for edge in layout['edges']:
    G.add_edge(edge['from'], edge['to'])

pos = nx.get_node_attributes(G, 'pos')
nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=2000)
plt.savefig('model_layout.png')
print("Layout visualized and saved.")