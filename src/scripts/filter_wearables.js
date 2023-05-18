const math = require('mathjs')
const fs = require('fs')


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

async function main(name, value) {
  const categories = ['upper_body', 'lower_body', 'feet', 'eyewear', 'hat', 'earring'];
  const data = readAllWearables();
  // Use the function.
  const response = data
    .filter(d => d.ai_tags.find(b => b.name === name))
    .map($ => {
      const tagValue = $.ai_tags.find(b => b.name === name)?.value
      const diff = Math.abs(Number(value) - Number(tagValue))
      return { ...$, diff, tagValue, ai_tags: [] }
    })
    .sort((a, b) => a.diff - b.diff)
    .reduce((acc, $) => {
      const category = $.category
      if (!categories.includes(category)) return acc
      acc[category] = acc[category] || []
      acc[category].push($)
      return acc
    }, {})
    return response
}


main('sport', 0.8).catch(err => console.log(err));
