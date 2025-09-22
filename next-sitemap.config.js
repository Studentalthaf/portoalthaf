/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://althaf.site',
  generateRobotsTxt: false, // Karena kita sudah memiliki robots.txt kustom
  outDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/404', '/500', '/_error', '/api/*'],
  generateIndexSitemap: false,
  alternateRefs: [], // Jika Anda memiliki versi situs dalam bahasa lain
  transform: async (config, path) => {
    // Custom transform function (optional)
    return {
      loc: path, // => This will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}