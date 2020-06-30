require('@babel/register')({
	extends: "./.babelrc",
})
const Sitemap = require("react-router-sitemap").default;
const router = require("./src/routes_sitemap").default;

const filterConfig = {
  isValid: false,
  rules: [/\/auth/, /\*/],
};

new Sitemap(router)
  .filterPaths(filterConfig)
  .build("https://mybookstore.online", { limitCountPaths: 5000 })
  .save("./sitemap.xml", "/static/");