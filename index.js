require('dotenv').config()

const NetlifyAPI = require('netlify')
const client = new NetlifyAPI(process.env.API_KEY)


async function getSites() {
    console.log('calling');
    var result = await client.listSites()
    console.log(result);
}

const sites = getSites();
