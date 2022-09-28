module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage', // usage / entry / false
        'corejs': 3
      }
    ]
  ],
  plugins: [
    [
      'prismjs',
      {
        languages: ['json','html','css','javascript','java','xml','yml','yaml','bash','docker','dockerfile','nginx','git','gitignore','sql'],
      },
    ],
  ],
}
