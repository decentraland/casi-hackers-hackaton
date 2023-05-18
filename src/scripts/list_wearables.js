const axios = require('axios');
const fs = require('fs');

let resultFile = 'out/all_wearables.json';


async function fetchAndParseJSON(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function fetchAllWearables(address, pageNum) {
  let pageSize = 100;
  let categories = ['upper_body', 'lower_body', 'feet', 'eyewear', 'hat', 'earring'];
  
  let categoryFilter = categories.map(c => `category=${c}`).join("&");
  let url = `https://peer-testing-2.decentraland.org/explorer/${address}/wearables?collectionType=on-chain&pageNum=${pageNum}&pageSize=${pageSize}&${categoryFilter}`
  let data = await fetchAndParseJSON(url);
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

function readAllAddresses() { 
  const filePath = 'addresses.json';
  const data = readJSONFile(filePath);
  return data.users;
}


function writeMapValuesToJsonFile(filePath, map) {
  const values = Object.values(map);
  const jsonData = JSON.stringify(values, null, 2);

  fs.writeFile(filePath, jsonData, (error) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    console.log('JSON file created successfully.');
  });
}


async function main() {

  let users = readAllAddresses();
  let allWearables = {};

  for (const user of users) { 

    let pageNum = 1;
    let seenWearables = 0;
    let wearablesPage = await fetchAllWearables(user, pageNum);
    let total = wearablesPage.totalAmount;

    while (seenWearables < total) {
      let wearablesPage = await fetchAllWearables(user, pageNum);
      seenWearables += wearablesPage.elements.length;
      for (const wearable of wearablesPage.elements) {
        let urn = wearable.urn;
        const parts = urn.split(":");
        const itemId = parts[parts.length - 1];
        let metadata = {
          "urn": urn,
          "name": wearable.name,
          "description": wearable.entity.metadata.description,
          "thumbnail": wearable.thumbnail,
          "marketplace": `https://market.decentraland.org/contracts/${wearable.entity.metadata.collectionAddress}/items/${itemId}`,
          "category": wearable.category,
          "tags": wearable.entity.metadata.data.tags
        };
        allWearables[urn] = metadata;
      }
      pageNum++;
    }
  }
  writeMapValuesToJsonFile(resultFile, allWearables);
}



main().catch(err => console.log(err));
