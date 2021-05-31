const entryPoints = require('../entryPoints')

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
        mainConfig: entryPoints.webpack.config.main,
        renderer: {
          config: entryPoints.webpack.config.render,
          entryPoints: entryPoints.entry.render
        }
      }
    ]
  ]
}
