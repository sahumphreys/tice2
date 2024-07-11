const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAttrs = require('markdown-it-attrs');
const markdownHighlighter = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");

module.exports = function (eleventyConfig) {


  /* -----> PLUGINS <------------------------------------------------ */
  let markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItFootnote).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPlugin(markdownHighlighter);

  eleventyConfig.addPlugin(pluginMermaid, {
    mermaid_config: {
      startOnLoad: true,
      theme: 'forest',
      themeVariables: {
        background: '#336699',
        fontFamily: 'Segoe UI',
        fontSize: 8,
        primaryBorderColor: '#7C0000',
      }
    }
  });

  

  /*-----> WATCH and PASS THROUGHS <----------------------------------*/
  eleventyConfig.addWatchTarget("./src/sass");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/assets");

  /*-----> COLLECTIONS <--------------------------------------------- */
  eleventyConfig.addCollection("infoPanels", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/pages/features/*.md")
      .sort((a, b) => a.data.position - b.data.position)
  });

  // module pages collection, sorted by position front matter
  eleventyConfig.addCollection("modulePagesSorted", function (collectionApi) {
    return collectionApi.getFilteredByTag("module").sort((a, b) => {
      return a.data.position - b.data.position;
    });
  });

  // theory pages collection, sorted by position front matter
  eleventyConfig.addCollection("theoryPagesSorted", function (collectionApi) {
    return collectionApi.getFilteredByTag("theory").sort((a, b) => {
      return a.data.position - b.data.position;
    });
  });

  /* FILTERS */

  //Date Clean up
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("filterByVolunteerStatus", function (team, isVolunteer) {
    return team.filter(person => person.volunteer === isVolunteer);
  });

  /* SHORTCODES */
  eleventyConfig.addShortcode("embedGoogleSlides", function (slideId, slideStart = false, slideLoop = false, slideDelay = 3000) {
    const start = slideStart ? 'true' : false;
    const loop = slideLoop ? 'true' : false;

    return `<div class="video-container-16by9">
            <iframe src="https://docs.google.com/presentation/d/${slideId}/embed?slide=id.p&start=${start}&loop=${loop}&delay=${slideDelay}"
            frameborder="0"
            width="780"
            height="585"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true">
            </iframe>
            </div>`
  });


  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
  };
}