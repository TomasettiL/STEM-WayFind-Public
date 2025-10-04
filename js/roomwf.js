// node js/roomwf.js

import { NodeDB } from "./roomnodes.js";
import { RoomNode } from "./roomnodes.js";
import { parseKMLFile } from './parseKML.js';
import { distance, toRad} from './distanceFunc.js'

console.log("testing...");
let nodeDB = new NodeDB(); // initialize node database

async function initializeNodes() {
    try {
        const placemarks = await parseKMLFile(); // Provide path to your KML file

        placemarks.forEach(pm => {
            const { name, listDescription, coords } = pm; // Extract info from placemarks
            // Create a new RoomNode for each placemark
            let node = new RoomNode(name, coords.lat, coords.long); // name is the id, coords are x and y
            // add adjacencies to adjIDs
            listDescription.forEach(element => node.addAdjID(element));
            // Add the node to the node database
            nodeDB.addNode(node);
        });

    } catch (error) {
        console.error('Error initializing nodes:', error);
    }
}

await initializeNodes(); // Call the function to initialize nodes
nodeDB.initializeAdjacencies(); // populate adjacencies
nodeDB.nodes.forEach(node => node.print());

let pathDistances = new Map();

function dijkstra(nodeDB, startNode, endNode) {
    let distances = new Map(); // shortest distance from start node to each node
    let previous = new Map(); // previous node in shortest path for each node
    let unvisited = new Set(); // unvisited nodes

    // Initialize distances and previous for all nodes
    nodeDB.nodes.forEach((node) => {
        distances.set(node, node === startNode ? 0 : Infinity);
        unvisited.add(node);
        previous.set(node, null);
    });

    while (unvisited.size) {
        // Find the unvisited node with the smallest distance
        let closestNode = null;
        unvisited.forEach((node) => {
            if (!closestNode || distances.get(node) < distances.get(closestNode)) {
                closestNode = node;
            }
        });

        // If closest node has an infinite distance, remaining nodes are unreachable
        if (distances.get(closestNode) === Infinity) break;

        // If the closest node is the end node, the shortest path is found
        if (closestNode === endNode) break;

        // Loop through all neighbors of the closest node
        closestNode.adj.forEach((neighbor) => {
            // Calculate the distance from the current node to the neighbor
            let newDistance = distances.get(closestNode) + closestNode.distanceFrom(neighbor);

            // If the new distance is shorter, update the distances and previous maps
            if (newDistance < distances.get(neighbor)) {
                distances.set(neighbor, newDistance);
                previous.set(neighbor, closestNode);
            }
        });

        // Mark the closest node as visited
        unvisited.delete(closestNode);
    }

    // Build the shortest path by tracing back from the end node
    let path = [];
    let currentNode = endNode;
    while (currentNode) {
        path.push(currentNode);
        currentNode = previous.get(currentNode);
    }
    pathDistances = path;
    return path.reverse(); // Return the path in the correct order (start to end)
}

let path = dijkstra(nodeDB, nodeDB.getNode('STEM107E'), nodeDB.getNode('STEM310'));
let previousNode = null;
let totalDist = 0;
path.forEach((node) => {
    if (previousNode === null){
        console.log(`${node.id}`)
    }
    else{
        let dist = distance(node.x, node.y, previousNode.x, previousNode.y);
        console.log(`${dist} meters -> ${node.id}`)
        totalDist += dist;
    }
    previousNode = node;
    
});
console.log(totalDist);


// Sample hardcoded database
/*// Create RoomNodes
let node1 = new RoomNode(1, 10, 20);
let node2 = new RoomNode(2, 30, 40);
let node3 = new RoomNode(3, 50, 60);
let node4 = new RoomNode(4, 30, 40);
let node5 = new RoomNode(5, 50, 60);
let node6 = new RoomNode(6, 0, 10);
let node7 = new RoomNode(7, 0, 10);
let node8 = new RoomNode(8, 30, 40);
let node9 = new RoomNode(9, 50, 60);

// Define adjacencies
node1.addAdjID(2);
node2.addAdjID(1);
node2.addAdjID(4);
node2.addAdjID(3);
node3.addAdjID(2);
node4.addAdjID(2);
node4.addAdjID(5);
node4.addAdjID(6);
node5.addAdjID(4);
node5.addAdjID(9);
node6.addAdjID(4);
node6.addAdjID(7);
node7.addAdjID(6);
node7.addAdjID(8);
node8.addAdjID(7);
node8.addAdjID(9);
node9.addAdjID(5);
node9.addAdjID(8);

// Add nodes to database
nodeDB.addNode(node1);
nodeDB.addNode(node2);
nodeDB.addNode(node3);
nodeDB.addNode(node4);
nodeDB.addNode(node5);
nodeDB.addNode(node6);
nodeDB.addNode(node7);
nodeDB.addNode(node8);
nodeDB.addNode(node9);

// Populate adjacency lists
nodeDB.initializeAdjacencies();
*/