import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addCollection("paintings", (collection) =>
    collection.getFilteredByTag("paintings"),
  );

  const pathPrefix = process.env.NODE_ENV === "production" ? "/art/" : "";

  // Transform to fix absolute image paths in markdown-generated HTML
  eleventyConfig.addTransform("fixImagePaths", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html") && pathPrefix) {
      // Replace relative image paths in markdown output with prefixed absolute paths
      // This targets img tags with src="../images/" pattern
      content = content.replace(/(<img[^>]+src=")\.\.\/images\//g, `$1${pathPrefix}images/`);
    }
    return content;
  });

  return {
    pathPrefix: pathPrefix,
  };
}
