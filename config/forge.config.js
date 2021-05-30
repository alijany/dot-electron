module.exports = {
  packagerConfig: {
    name: 'dot-electron'
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'dot-electron',
        owners: 'mohammad h alijany',
        title: 'Dot Electron',
        noMsi: true
        // setupIcon: __dirname + "/icon/icon.ico",
        // iconUrl: "https://cdn.example/icon.ico"
      }
    }
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        // port: 3000,
        // loggerPort: 3001
        mainConfig: './config/webpack.main.config.js',
        renderer: {
          config: './config/webpack.renderer.config.js',
          entryPoints: [
            {
              // preload: { js: './preload.ts' },
              html: './view/index.html',
              js: './view/renderer.ts',
              name: 'main_window'
            }
          ]
        }
      }
    ]
  ]
}
