// src/yogaManager.js

function dataResponse(object) {
	return new Response(
		JSON.stringify(object),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}

const getYogaVideosByAgeRange = async (env, ageRange) => {
	const result = await env.YOGA_BINDING.prepare(
			`
            SELECT 
                YouTubeSrc,
                Title,
                Description,
                Difficulty,
                AgeRange
            FROM
                YogaVideo
            WHERE
                AgeRange = '${ageRange}'
            `
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
module.exports = { getYogaVideosByAgeRange };