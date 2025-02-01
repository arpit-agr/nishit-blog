//https://joschua.io/posts/2023/08/16/how-to-use-astro-assets-with-tina-cms

import { exec } from "child_process";

// Define the directory containing .mdx files (relative to project root)
const postsDirectory = "/src/content/posts/";

// Define find-and-replace strings
const find = "/images/";
let replace = "../../assets/images/";

// Escape special characters in the replacement string for `sed`
replace = replace.replaceAll(".", "\\.");

// Detect OS and adjust sed command accordingly
const isMac = process.platform === "darwin";
const sedCommand = isMac
	? `sed -i '' -e 's:${find}:${replace}:g'` // macOS (BSD sed)
	: `sed -i -e 's:${find}:${replace}:g'`; // Linux (GNU sed)

// Execute find and replace using shell command
exec(
	`find ${process.cwd()}${postsDirectory} -type f -name '*.mdx' -print0 | xargs -0 ${sedCommand}`,
	(error, stdout, stderr) => {
		if (error) {
			console.log(`❌ Error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`⚠️ Stderr: ${stderr}`);
			return;
		}
		console.log(stdout);
		console.log("🖼️ Successfully replaced asset paths ✅");
	}
);
