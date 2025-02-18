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
			publicFolder: "/src/assets/images",
			mediaRoot: "",
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
					isDraft: true,
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
						name: "title",
						label: "Title",
						type: "string",
						isTitle: true,
						required: true,
					},
					{
						name: "pubDate",
						label: "Publish date",
						type: "datetime",
						required: true,
					},
					{
						name: "isDraft",
						label: "Draft",
						type: "boolean",
						required: true,
					},
					{
						name: "body",
						label: "Body",
						type: "rich-text",
						isBody: true,
						toolbarOverride: [
							"heading",
							"link",
							"quote",
							"ul",
							"ol",
							"bold",
							"italic",
							"embed",
						],
						templates: [
							{
								name: "Quote",
								label: "Quote (with attribution)",
								fields: [
									{
										name: "children",
										label: "Quote",
										type: "rich-text",
										required: true,
										toolbarOverride: ["bold", "italic"],
										ui: {
											validate: (value) => {
												const isEmpty = !value?.children?.some((child) =>
													child.children?.some(
														(grandchild) => grandchild.text.trim().length > 0
													)
												);
												if (isEmpty) {
													return "Please enter a quote";
												}
											},
										},
									},
									{
										name: "author",
										label: "Author",
										type: "string",
									},
									{
										name: "source",
										label: "Citation",
										type: "string",
										description: "Title of the cited creative work",
									},
								],
							},
							{
								name: "PostImage",
								label: "Image",
								fields: [
									{
										name: "src",
										label: "Image",
										description:
											"Allowed file formats: jpeg, jpg, png, webp, avif",
										type: "image",
									},
									{
										name: "photographerName",
										label: "Photographer Name",
										type: "string",
									},
									{
										name: "photographerLink",
										label: "Photographer Link",
										type: "string",
									},
									{
										name: "alt",
										label: "Alt Text",
										description:
											"Alternate text that will be displayed if the image fails to load. ",
										type: "string",
									},
									{
										name: "caption",
										label: "Caption",
										type: "string",
									},
									{
										name: "isFullWidth",
										label: "Full width",
										type: "boolean",
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
