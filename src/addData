import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    apiKey: process.env.API_KEY
  },
});
const index = 'first-search';
const docs = [
  {
    "text": "this this something that I wrote"
  }
];
const bulkIngestResponse = await client.helpers.bulk({
  index,
  datasource: docs,
  onDocument() {
    return {
      index: {},
    };
  }
});

console.log(bulkIngestResponse);
