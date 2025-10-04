export class RoomNode {
    constructor(id, x, y) {
        this.id = id; // initialize node id
        this.x = parseFloat(x); // initialize x coord
        this.y = parseFloat(y); // initialize y coord

        this.adjIDs = []; // store adjacent node IDs
        this.labels = []; // labels associated with node
        // labels = ["nodeName", "building", "type"]
        this.adj = [] // store adjacent node objects
    }

    loadAdj(nodeDB) {
        // populate adjacent node list using list of IDs
        this.adj = this.adjIDs.map(id => nodeDB.getNode(id)).filter(node => node);
    }

    addAdjID(id) {
        this.adjIDs.push(id); // push int id onto list of adjIDs
    }

    addLabel(label) {
        // adjust for ordered structure
        this.labels.push(label); // push label onto list
    }

    getLabels() {
        return this.labels.map((i) => i); // shallow copy
    }

    distanceFrom(otherNode) {
        // Calculate Euclidean distance between this node and another node
        const dx = this.x - otherNode.x;
        const dy = this.y - otherNode.y;
        return Math.sqrt(dx * dx + dy * dy); // Return the distance
    }

    // Add a print method to display node details
    print() {
        // Show node ID, coordinates, and list of adjacent node IDs
        const adjIDs = this.adjIDs.join(", ");
        //const adjNodes = this.adj.map(node => `Node ${node.id} at (${node.x}, ${node.y})`).join(", ");
        console.log(`Node ID: ${this.id}, Coordinates: (${this.x}, ${this.y}), Adjacent Node IDs: [${adjIDs}]`)//, Adjacent Nodes: [${adjNodes}]`);
    }
}

export class NodeDB {
    constructor() {
        this.nodes = new Map(); // Store RoomNode objects with ID as key
    }

    addNode(node) {
        // Ensure node ID is unique
        if (!this.nodes.has(node.id)) {
            this.nodes.set(node.id, node);
        }
    }

    getNode(id) {
        // Retrieve node or return null
        return this.nodes.get(id) || null;
    }

    initializeAdjacencies() {
        // Call loadAdj() on all nodes to populate adjacency lists
        this.nodes.forEach(node => node.loadAdj(this));
    }
}