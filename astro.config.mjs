// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	//TODO: update the final, deployed URL
	site: "https://nishitjalan.netlify.app",

	integrations: [mdx()],
});
