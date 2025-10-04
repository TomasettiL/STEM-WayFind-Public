// install dependencies
import fs from 'fs'; // Node.js module to read kml file
import xml2js from 'xml2js'; // converts XML into JavaScript Objects

export function parseKMLFile (){
    const parser = new xml2js.Parser(); // create parser instance
    return new Promise((resolve, reject) => {
        fs.readFile('KML/STEM.kml', (err, data) => { //read KML file, data is buffer object with raw file contents, err if file doesn't exist
            if (err) return reject(err);

            parser.parseString(data, (err, reuslt) => { // convert xml to js
                if (err) return reject(err); // check for errors

                const placemarks = []; // empty list for data
                const placemarkList = reuslt.kml.Document?.[0]?.Folder?.[0]?.Placemark || []; // root <Document> element, array of <Placemark> elements

                placemarkList.forEach(pm => { // loop thru each pm
                    const name = pm.name?.[0] || ''; // set name, empty if doesn't exist
                    const rawDescription = pm.description?.[0] || ''; // extract raw desc, empty otherwise
                    const listDescription = rawDescription.trim().split('\n').map(line => line.trim()).filter(Boolean); // trim remove start/end whitespace, split line by line, trim individual lines, remove empty strings
                    const rawCoords = pm.Point?.[0]?.coordinates?.[0] || ''; // get point element, get coord from point
                    const [long, lat] = rawCoords.split(',').map(parseFloat); // split string, convert string to numbers

                    placemarks.push({
                        name,
                        listDescription,
                        coords: {lat, long}
                    });
                });
                //console.log(placemarks);
                resolve(placemarks);
            });
        });
    });
}