import json;
from pprint import pprint;

dictionary = {};
visited = [];

with open('map.json') as mapFile:
    data = json.load(mapFile)




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
            return path
        elif node not in visited:
            visited.append(node);
            # enumerate all adjacent nodes, construct a new path and push it into the queue
            for adjacent in dictionary[node]:
                new_path = list(path)
                new_path.append(adjacent)
                queue.append(new_path)

# a =bfs(dictionary, word1.upper(), word2.upper());

# print(a);
found=[]


iterator={}

for i in  data:
    iLength=len(i)
    iterator[i]=[]
    for j in data[i]:
        iterator[i].append(j)


for index in data:
    currentDictionary = iterator[index]
    dictionary = data[index]
    for word1 in currentDictionary:
        starting = int(currentDictionary.index(word1))
        for word2 in currentDictionary[starting:]:
            found.append(bfs(dictionary,word1,word2))
            visited = [];

        # for word2 in dictionary[word1:]:
        #     print(word2)
        # print("\n----------");


with open('all.json', 'w') as fp:
	for items in found:
		fp.write(items)

# word1 = input("Please Enter first word");
# word2 = input("Please Enter the second word");
# length = str(len(word1));
# dictionary = data[length]


