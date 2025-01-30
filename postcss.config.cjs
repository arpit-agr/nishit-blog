module.exports = {
	plugins: [
		require("postcss-custom-media"),
		require("postcss-utopia")({
			minWidth: 320, // Default minimum viewport
			maxWidth: 1280, // Default maximum viewport
		}),
	],
};
