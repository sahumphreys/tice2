module.exports = function (eleventyConfig) {

    /*-----> WATCH and PASS THROUGHS <----------------------------------*/
    eleventyConfig.addWatchTarget("./src/sass");
    eleventyConfig.addPassthroughCopy("./src/css"); 
    eleventyConfig.addPassthroughCopy("./src/assets");

    /*-----> COLLECTIONS <--------------------------------------------- */
    eleventyConfig.addCollection("infoPanels", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/pages/features/*.md")
        .sort((a,b) => a.data.position - b.data.position)
    });

    // module pages collection, sorted by position front matter
    eleventyConfig.addCollection("modulePagesSorted", function(collectionApi) {
        return collectionApi.getFilteredByTag("module").sort((a, b) => {
          return a.data.position - b.data.position;
        });
      });

    // theory pages collection, sorted by position front matter
    eleventyConfig.addCollection("theoryPagesSorted", function(collectionApi) {
        return collectionApi.getFilteredByTag("theory").sort((a, b) => {
          return a.data.position - b.data.position;
        });
      });
   
    return {
        dir: {
            input: 'src',
            output: 'public',
        },       
    };
}