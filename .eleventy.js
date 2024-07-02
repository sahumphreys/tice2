module.exports = function (eleventyConfig) {

    /* WATCH and PASS THROUGHS */
    eleventyConfig.addWatchTarget("./src/sass");
    eleventyConfig.addPassthroughCopy("./src/css"); 
    eleventyConfig.addPassthroughCopy("./src/assets");

    /* PLUGINS */
    eleventyConfig.addPlugin( require('@11ty/eleventy-navigation') );

    /* COLLECTIONS */
    eleventyConfig.addCollection("infoPanels", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/pages/features/*.md");
    });

    eleventyConfig.addCollection("modules", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/modules/*.md");
    });
    
   

    return {
        dir: {
            input: 'src',
            output: 'public'
        },
        
    };
}