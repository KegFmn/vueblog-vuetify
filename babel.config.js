module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', {
        'useBuiltIns': 'usage', // usage / entry / false
        'corejs': 3
    }]
  ]
}
