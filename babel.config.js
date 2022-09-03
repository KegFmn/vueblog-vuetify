module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'prismjs',
      {
        languages: ['json','html','css','javascript','java','yml','yaml','bash','docker','dockerfile','nginx','sql'],
      },
    ],
  ],
}
