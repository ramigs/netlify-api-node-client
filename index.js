require('dotenv').config()
const NetlifyAPI = require('netlify')
const netlify = new NetlifyAPI(process.env.NETLIFY_API_KEY)
const GitHub = require('github-api');


async function createDeployKey() {
    console.log('Calling createDeployKey()...');
    const result = await netlify.createDeployKey();
}

async function getSites() {
    console.log('Calling getSites()...');
    const result = await netlify.listSites()
}

async function createSite() {
    console.log('Calling createSite()...');
    // Create a site. Notice `body` here for sending OpenAPI body
    //const site = await netlify.createSite(JSON.stringify({
    const site = await netlify.createSite({
        body: {
            name: 'my-awesome-site'
        }
    });
}

// basic auth
var gh = new GitHub({
    //username: 'ramigs',
    //password: '5WJTP6t8k3bXSqXz'
    // also acceptable:
    token: process.env.GITHUB_API_KEY

});

//var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
/* me.listRepos(function(err, repos) {
    console.log(repos);
 
 
 }); */

const repo = gh.getRepo('ramigs', 'javascript30');
repo.getDetails()
    .then((result) => console.log(result.data.id));


//const sites = getSites();


//createDeployKey();
//createSite().catch(error => console.log(error));

//console.log(deployKey);

//createSite();