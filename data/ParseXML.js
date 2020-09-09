const request = require('request');
const convert = require('xml-js');
/**
 * Get JSON object with all files availible on the server
 * @return {Object} JSON object
 */
function getAllFiles() {
    request('https://msfs-liverypack-cdn.mrproper.dev/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = convert.xml2js(body, {
                ignoreComment: true,
                alwaysChildren: true
            });
            let endVersion = [];
            result = result.elements[0].elements
            for (let i = 4; i < result.length; i++) {
                let AirplaneObject = {
                    fileName: result[i].elements[0].elements[0].text,
                    generation: result[i].elements[1].elements[0].text,
                    metaGeneration: result[i].elements[2].elements[0].text,
                    lastModified: result[i].elements[3].elements[0].text,
                    ETag: result[i].elements[4].elements[0].text,
                    size: result[i].elements[5].elements[0].text,
                };
                endVersion.push(AirplaneObject)
            }
            console.log(JSON.stringify(endVersion));
            return endVersion;
        }
    });
}

module.exports = {
    getAllFiles: getAllFiles
}