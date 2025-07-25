/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const yogaManager = require('./yogaManager');
const yogaVideoManager = require('./yogaVideoManager');

export default {
  async fetch(request, env, ctx) {

	const apiKey = request.headers.get("x-api-key");
	if (apiKey !== env.API_TOKEN) {
		return new Response(JSON.stringify({error: "Unauthorized"}), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
	}

	const url = new URL(request.url);
	var data = {};

    if (url.pathname === "/hello") {
	  	return yogaManager.helloWorld();
    }

    if (url.pathname === "/goodbye") {
      	// Return a JSON response with a message
		data = {
			message: "Goodbye!",
			detail: "Yep for real this time!"
		};

		return new Response(
		JSON.stringify(data),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
    }

	if(url.pathname === "/yoga") {
		yogaManager.getCustomers(env);
	}

	if (url.pathname === "/yoga/videos") {
		const ageRange = url.searchParams.get("ageRange");
		yogaVideoManager.getYogaVideosByAgeRange(env, ageRange);
	}

	if(!data.message) {
		// If no message is set, return a 404
		return new Response(JSON.stringify({error: "Not found"}), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
	}

	
  },
};