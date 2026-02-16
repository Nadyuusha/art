import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addCollection("paintings", (collection) =>
    collection.getFilteredByTag("paintings"),
  );

  return {
    pathPrefix: process.env.NODE_ENV === "production" ? "/art/" : "",
  };
}
