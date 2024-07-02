/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    },
    async headers() {
      return [
        {
          source: '/(.*)', // Match all routes
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0', // Adjust as needed
            },
          ],
        },
      ]
    }
  }