

const KDBush = require('kdbush');
const geokdbush = require('geokdbush');
const cosineDistance = require('cosine-distance');


function readAllWearables() { 
  const filePath = 'out/response.json';
  const data = readJSONFile(filePath);
  return data;
}

function readAllTagNames() {
  const filePath = 'out/categories.json';
  const data = readJSONFile(filePath);
  return data;
}

function readJSONFile(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(jsonData);
    return parsedData;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Define a function to find the nearest objects to a given tag and value.
function findNearest(tagName, value) {
    // Create a point for the given tag and value.
    const point = { coordinates: allTagNames.map(name => name === tagName ? value : 0) };
    // Find the nearest points.
    const nearestPoints = geokdbush.around(index, point.coordinates[0], point.coordinates[1], 5, null, (a, b) => cosineDistance(a.coordinates, b.coordinates));
    // Convert the points back into objects.
    const nearestObjects = nearestPoints.map(point => data[point.index]);
    return nearestObjects;
}

function main() { 
  const data = readAllWearables();
  // This assumes that the set of all possible tag names is known in advance.
  // If that's not the case, you'll have to dynamically determine this set.
  const allTagNames = readAllTagNames(); // get keys

  // Convert the data into a format that KDBush can use.
  const points = data.map((obj, index) => {
    const tags = {};
    for (const tag of obj.ai_tags) {
        tags[tag.name] = tag.value;
    }
    const coordinates = allTagNames.map(tagName => tags[tagName] || 0);
    return { index, coordinates };
  });
  // Create the index.
  const index = new KDBush(points, (p) => p.coordinates[0], (p) => p.coordinates[1]);

  // Use the function.
  const nearestObjects = findNearest('lens', 0.98);
  console.log(nearestObjects);
}


main().catch(err => console.log(err));
