const fs = require('fs');
// const response = require('./out/response.json');

function writeMapToJsonFile(filePath, map) {
  const jsonData = JSON.stringify(map, null, 2);

  fs.writeFile(filePath, jsonData, (error) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    console.log('JSON file created successfully.');
  });
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

function readAllWearables() { 
  const filePath = 'out/response.json';
  const data = readJSONFile(filePath);
  return data;
}

async function main() {
  // console.log(response);
  let allWearables = readAllWearables();
  let ai_categories_bucket = {};

  for (const wearable of allWearables) { 
    let urn = wearable.urn;
    let ai_tags = wearable.ai_tags;
    for (const tag of ai_tags) {
      if (!!ai_categories_bucket[tag.name]) {
        ai_categories_bucket[tag.name]++;
      } else {
        ai_categories_bucket[tag.name] = 1;
      };
    };
  };


  console.log(ai_categories_bucket);

  const sortedArray = Object.entries(ai_categories_bucket)
    .sort((a, b) => b[1] - a[1]);
  console.log(sortedArray);

  const sortedMap = Object.fromEntries(sortedArray);



  writeMapToJsonFile('out/categories.json', sortedMap);
  
}


main().catch(err => console.log(err));
