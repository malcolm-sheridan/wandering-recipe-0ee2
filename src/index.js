/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World! Yep for real this time!');
// 	},
// };

export default {
  async fetch(request, env, ctx) {

	const url = new URL(request.url);
	var data = {};

    if (url.pathname === "/hello") {
	  	// Return a JSON response with a message
		data = {
			message: "Hello World!",
			detail: "Yep for real this time!"
		};
    }

    if (url.pathname === "/goodbye") {
      	// Return a JSON response with a message
		data = {
			message: "Goodbye!",
			detail: "Yep for real this time!"
		};
    }

	if(url.pathname === "/yoga") {
		const result = await env.YOGA_BINDING.prepare(
			"SELECT * FROM Customers",
		).all();

		return new Response(
			JSON.stringify(result), 
			{
				headers: { 'Content-Type': 'application/json' }
			});
	}

	if(!data.message) {
		// If no message is set, return a 404
		return new Response(JSON.stringify({error: "Not found"}), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
	}

	return new Response(
		JSON.stringify(data),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
  },
};