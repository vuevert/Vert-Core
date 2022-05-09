import typescript from 'rollup-plugin-typescript2'

export default {
  input: './lib/index.ts',

  output: [
    {
      file: './dist/index.js',
      format: 'commonjs'
    },
    {
      file: './dist/index.esm.js',
      format: 'es'
    }
  ],

  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5'
        },
        include: [
          'lib/**/*'
        ]
      }
    })
  ],

  external: [
    'vue',
    'vue-class-component',
    'reflect-metadata',
    'vue-property-decorator'
  ]
}
