import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    apiKey: process.env.API_KEY
  },
});
const index = 'first-search';
const mapping = {
  "content": {
    "type": "text"
  }
};
const updateMappingResponse = await client.indices.putMapping({
  index,
  properties: mapping,
});

console.log(updateMappingResponse);
