require('dotenv').config();
const NetlifyAPI = require('netlify');
const netlify = new NetlifyAPI(process.env.NETLIFY_API_KEY);
const GitHub = require('github-api');
const nock = require('nock');

async function deleteNetlifySiteBuildHook (siteId, buildHookId) {
	console.log('Calling deleteNetlifySiteBuildHook()...');

	try {
		result = await netlify.deleteSiteBuildHook({
			site_id : siteId,
			id      : buildHookId
		});
		console.log(result);
	} catch (e) {
		console.log('Catched ' + e);
	}
}

async function createNetlifySiteBuildHook (siteId, title, branch) {
	console.log('Calling createNetlifySiteBuildHook()...');

	try {
		result = await netlify.createSiteBuildHook({
			site_id : siteId,
			body    : {
				title  : title,
				branch : branch
			}
		});
		console.log(result);
	} catch (e) {
		console.log('Catched ' + e);
	}
	/*     const result = await netlify.createSiteBuildHook({
        body: {
            site_id: 'my-awesome-site'
        } 
    }); */
}

async function createNetlifyDeployKey () {
	console.log('Calling createDeployKey()...');
	const result = await netlify.createDeployKey();
}

async function getSites () {
	console.log('Calling getSites()...');
	try {
		const result = await netlify.listSites();
		//console.log(result);
	} catch (e) {
		console.log(e);
	}
}

async function createSite () {
	console.log('Calling createSite()...');
	// Create a site. Notice `body` here for sending OpenAPI body
	//const site = await netlify.createSite(JSON.stringify({
	const site = await netlify.createSite({
		body : {
			name : 'my-awesome-site'
		}
	});
}

//nock.recorder.rec()

nock.recorder.rec({
	output_objects              : true,
	enable_reqheaders_recording : true
});

/* requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

const call = document.getElementById('call');
call.addEventListener('click', () => {
    console.log('Button clicked');
}); */

/* mitm.on("connection", function(socket) { socket.write("Hello back!") })

var socket = Net.connect(22, "api.netlify.com")
socket.write("Hello!")
socket.setEncoding("utf8")
socket.on("data", console.log) // => "Hello back!" */

async function createSiteBuildHooks () {
	console.log('Calling createSiteBuildHooks()...');
	try {
		const sites = await netlify.listSites();
		const targetSites = sites.filter(
			(site) => site.url.includes('http://ramigs-js30') && parseInt(site.url.substr(19, 2)) >= 13
		);

		targetSites.forEach(async ({ site_id }) => {
			try {
				const result = await createNetlifySiteBuildHook(site_id, 'Build from function', 'master');
				//console.log(url);
			} catch (error) {
				console.log({ error });
			}
		});
	} catch (e) {
		console.log(e);
	}
}

//deleteNetlifySiteBuildHook('76cf87d0-abe3-4ebc-b19b-6f45a4486c2c', '5d965864229f577928385fd2');
//createSiteBuildHooks();

//getSites().catch((e) => console.log(e));

//createNetlifySiteBuildHook('4d93915a-2fe1-4a3e-bc57-a56c03f1c4b4').catch((e) => console.log(e));

// basic auth
var gh = new GitHub({
	// also acceptable:
	token : process.env.GITHUB_API_KEY
});

//var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
/* me.listRepos(function(err, repos) {
    console.log(repos);
 
 
 }); */

const repo = gh.getRepo('ramigs', 'javascript30');
repo.getDetails().then((result) => console.log(result));

//createNetlifyDeployKey();
//createSite().catch(error => console.log(error));

//console.log(deployKey);

//createSite();
