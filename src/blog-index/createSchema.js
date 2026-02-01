import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    apiKey: process.env.API_KEY
  },
});
const index = 'blogs_index';

const body= {
  mappings:{
    properties: {
      title: {
        type: 'text'
      },
      content: {
        type: "text"
      },
      author: {
        type: "keyword"
      },
      published_date: {
        type: "date"
      }
    },
  }
}
const createIndex = await client.indices.create({
  index,
  body
});

console.log(createIndex);
