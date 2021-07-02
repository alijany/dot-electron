module.exports = {
  icon: './assets/icon/icon',
  entry: {
    main: './main/main.ts',
    render: [
      {
      preload: { js: './renderer/preload.ts' },
        html: './renderer/index.html',
        js: './renderer/renderer.ts',
        name: 'main_window'
      }
    ]
  },
  webpack: {
    config: {
      main: './config/webpack.main.config.js',
      render: './config/webpack.renderer.config.js'
    }
  }
}
