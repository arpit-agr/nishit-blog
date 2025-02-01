import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"main";

export default defineConfig({
	branch,

	// Get this from tina.io
	clientId: process.env.TINA_CLIENT_ID,
	// Get this from tina.io
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			publicFolder: "/src/assets",
			mediaRoot: "images",
		},
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
	schema: {
		collections: [
			{
				name: "post",
				label: "Posts",
				path: "src/content/posts",
				format: "mdx",
				defaultItem: () => ({
					pubDate: new Date().toISOString(),
				}),
				ui: {
					filename: {
						readonly: true, // the editor can not edit the filename
						slugify: (values) => {
							return values?.title?.toLowerCase().replace(/ /g, "-");
						},
					},
				},
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "datetime",
						name: "pubDate",
						label: "Date Published",
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
						templates: [
							{
								name: "Blockquote",
								label: "Blockquote",
								fields: [
									{
										name: "children",
										label: "Quote",
										type: "rich-text",
									},
									{
										name: "author",
										label: "Author",
										type: "string",
									},
									{
										name: "source",
										label: "Source",
										type: "string",
									},
								],
							},
						],
					},
				],
			},
		],
	},
	search: {
		tina: {
			indexerToken: process.env.TINASEARCH,
			stopwordLanguages: ["eng"],
		},
		indexBatchSize: 50,
		maxSearchIndexFieldLength: 100,
	},
});
