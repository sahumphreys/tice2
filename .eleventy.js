const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAttrs = require('markdown-it-attrs');


module.exports = function (eleventyConfig) {

  let markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItFootnote).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

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

  // bloc collection, sorted by date
  // eleventyConfig.addCollection("blog", collection => {
  //     // using spread syntax to copy original array of blog posts and reverse that order
  //     return [...collection.getFilteredByGlob('.src/blog/**/*.md')].reverse();
  //   });

  /* FILTERS */

  //Date Clean up
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("filterByVolunteerStatus", function (team, isVolunteer) {
    return team.filter(person => person.volunteer === isVolunteer);
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