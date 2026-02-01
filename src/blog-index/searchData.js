import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        apiKey: process.env.API_KEY
    },
});

const result = await client.search({
    index: 'blogs_index',
    body: {
        query: {
            bool: {
                // MUST: These contribute to the relevance score (_score)
                must: [
                    {
                        multi_match: {
                            query: "national parks",
                            fields: ["title^3", "content"], // Title is 3x more important
                            fuzziness: "AUTO"               // Handles user typos
                        }
                    }
                ],
                // FILTER: Strict yes/no criteria. Does NOT affect score (faster)
                filter: [
                    { term: { author: "author-1" } },
                    {
                        range: {
                            published_date: {
                                gte: "now-1y/d" // Greater than or equal to 1 year ago
                            }
                        }
                    }
                ],
                // MUST_NOT: Exclude specific documents
                must_not: [
                    // { match: { content: "Yosemite National Park" } } // this makes problems because is it excluding all results with yosemite "National park"
                    { match: { content: "Yosemite" } }
                ],
                // SHOULD: "Nice to have" - if found, boosts the score even higher
                should: [
                    { match_phrase: { content: "United States" } }
                ]
            }
        },
        // Highlight the snippets where the terms were found
        highlight: {
            fields: { // the problem here that it is returning the fields in array so you should find out which title belongs to which content *NOT NICE*
                title: {},
                content: {}
            }
        }
    }
});

console.log(JSON.stringify(result, null, 2));
