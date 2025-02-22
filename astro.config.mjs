// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import rehypeUnwrapImages from "rehype-unwrap-images";

// https://astro.build/config
export default defineConfig({
	//TODO: update the final, deployed URL
	site: "https://nishitjalan.netlify.app",
	base: "/",
	integrations: [mdx(), icon()],
	markdown: {
		rehypePlugins: [rehypeUnwrapImages],
	},
});
