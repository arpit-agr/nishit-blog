//https://blog.damato.design/posts/astro-rss-mdx/

import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });

	const Quote = (await import("@components/Quote.astro")).default;
	const BlogPostImage = (await import("@components/BlogPostImage.astro"))
		.default;

	const components = {
		img: BlogPostImage,
		blockquote: Quote,
		Quote,
	};

	const publishedPosts = await getCollection("posts", ({ data }) => {
		return data.isDraft !== true;
	});

	const items = [];
	for (const post of publishedPosts) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content, {
			props: { components },
		});
		const link = new URL(`/posts/${post.id}`, context.url.origin).toString();
		items.push({ ...post.data, link, content });
	}

	return rss({
		title: "Nishit's blog",
		// TODO: update description
		description: "TKTK",
		site: context.site,
		items,
	});
}
