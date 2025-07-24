// src/yogaManager.js

function greet(name) {
  return `Hello, ${name}! Welcome to the yoga API.`;
}

const getCustomers = async () => {
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

		return new Response(
			JSON.stringify(result.results), 
			{
				headers: { 'Content-Type': 'application/json' }
			}
		);
};

// Export the function to make it accessible from other files
module.exports = { greet, getCustomers };
