import json;
from pprint import pprint;

dictionary = {};

with open('map.json') as mapFile:
    data = json.load(mapFile)

word1 = input("Please Enter first word");
word2 = input("Please Enter the second word");
length = str(len(word1));
dictionary = data[length]
visited = [];
allPaths = []

def bfs(graph, start, end):
    # maintain a queue of paths
    queue = []
    # push the first path into the queue
    queue.append([start])
    while queue:
        # get the first path from the queue
        path = queue.pop(0)
        # get the last node from the path
        node = path[-1]
        # path found
        if node == end:
            return allPaths.append(path)
            # allPaths.append(path)
        elif node not in visited:
            visited.append(node);
            # enumerate all adjacent nodes, construct a new path and push it into the queue
            for adjacent in dictionary[node]:
                new_path = list(path)
                new_path.append(adjacent)
                queue.append(new_path)

bfs(dictionary, word1.upper(), word2.upper());

print(allPaths);