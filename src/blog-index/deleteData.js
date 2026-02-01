import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        apiKey: process.env.API_KEY
    },
});

// const deleteData = await client.delete({
//     index: "blogs_index",
//     id: 2,
// });

// console.log(deleteData);

// This is very risky it deleted all the data in the index ;(
const deleteDataByQuery = await client.deleteByQuery({
    index: 'blogs_index',
    body: {
        query: {
            match: { title: "Yosemite National Park is a United States National Park, covering over 750,000 acres of land in California. A UNESCO World Heritage Site, the park is best known for its granite cliffs, waterfalls and giant sequoia trees. Yosemite hosts over four million visitors in most years, with a peak of five million visitors in 2016. The park is home to a diverse range of wildlife, including mule deer, black bears, and the endangered Sierra Nevada bighorn sheep. The park has 1,200 square miles of wilderness, and is a popular destination for rock climbers, with over 3,000 feet of vertical granite to climb. Its most famous and cliff is the El Capitan, a 3,000 feet monolith along its tallest face." }
        }
    }
});

console.log(deleteDataByQuery);
