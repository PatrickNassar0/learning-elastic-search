import { Client } from '@elastic/elasticsearch'
import 'dotenv/config';

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      apiKey: process.env.API_KEY
    },
});

const result = await client.search({
  index: 'first-search',
  query: {
    match: { text: 'something' }
  }
})

console.log(JSON.stringify(result, null, 2));