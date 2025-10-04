# STEM-WayFind-Public

*Note* This repository has files that contain sensetive information omitted so it is an incomplete version of the project.

About The Project

The STEM Building Navigation project is an extension of the DSPS 3D Map project that is beginning to introduce room-to-room
navigation to the project. It is specifically focused on intra-building navigation in the STEM building, meant to build the
basis for room-to-room navigation across the ARC campus in the future.


What Is Done

Can Currently extract information from a KML file to generate a node database.

Extracted information includes name, coordinates, and adjacencies.

Navigation is done between multiple floors using a simple implementation of dijkstra's algorithm.

Tackles the problem of 3D navigation in a 2D plane by assigning adjacent nodes to the same coordinates.

Calculates distances between nodes in meters to give instructions on which node to move to next and the distance.


Project Components:

KML File
    - Manually put together using Google Earth Pro
    - Building floorplans overlayed on top of satelite image of building as accurately as possible
    - Placemarkers set in node locations, named appropriately and adjacencies are assigned manually in description box
    - Placemarks saved in a folder in the hierarchy, then to "My Places", this folder can be downloaded as a kml file and parsed

parseKML.js
    - Dependencies:
        - js (Node.js module to read KML or XML files)
        - xml2js (converts XML into javascript objects)
    - defines an export function that reads through KML file, locates each Placemark, extracts the name, description and coordinates, stores information in an object that is pushed to placemarks array

distanceFunc.js
    - implementation of the Haversine function to calculate great-circle distance between two points on a sphere

roomnodes.js
    - node and node database classes

roomwf.js
    - uses export function from other files
    - initializes the all nodes and the node database, including adjacencies
    - simple dijkstra's algorithm implementation to navigate between two locations, proves that nodes can be placed in the same coordinates for vertical traversal as long as adjacencies are properly assigned
    - displays entire node database
    - displays navigation, includes each intermidiate node and the distance to that node from the last


Next Steps

Update node and nodeDB classes for compatibility and functionality

Improve dijkstra implementation

Improve on direction instructions:
    - track the faced direction to determine if user should turn right/left
    - simplify instructions by eliminating intermediate nodes along a straight path, just use cummulative distance

Retrieve Node Info for Remainder of Campus:
    - Follow similar or improved method using Google Earth Pro

Create Master Node Databse:
    - Determine best method for storing node databse, potentially converging that of multiple buildings
    - Removes need for initialization using KML files on each program run instance
    - Maybe create a separate tool for updating node databse with kml files

Incorporate into DSPS Map project:
    - Front-end development to visualize navigation
    - May need conversion system to convert from geographic coordinates to SVG or other coordinates
    - May add as an extension to DSPS Map, keeping intra-building navigation seperate from inter-building


Note: For access to STEM Building Floorplans, please contact Professor Tak


