import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    apiKey: import.meta.env.API_KEY
  },
});
const index = 'first-search';
const mapping = {
  "text": {
    "type": "text"
  }
};
const updateMappingResponse = await client.indices.putMapping({
  index,
  properties: mapping,
});

console.log(updateMappingResponse);
