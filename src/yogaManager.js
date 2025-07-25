// src/yogaManager.js

function greet(name) {
  return `Hello, ${name}! Welcome to the yoga API.`;
}

const helloWorld = async () => {
    return dataResponse({
        message: "Hello World!",
        detail: "Yep for real this time!"
    });
}


function dataResponse(object) {
	return new Response(
		JSON.stringify(object),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}

const getCustomers = async (env) => {
	const result = await env.YOGA_BINDING.prepare(
			"SELECT * FROM Customers",
		).all();

		if(!result || !result.results) {
			// If no results are found, return a 404
			return new Response(JSON.stringify({error: "No results found"}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}

		dataResponse(result.results);
};

// Export the function to make it accessible from other files
module.exports = { greet, helloWorld, getCustomers };
