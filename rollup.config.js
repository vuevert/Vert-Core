import typescript from 'rollup-plugin-typescript2'

export default {
  input: './lib/index.ts',

  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'Vert'
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
        }
      }
    })
  ]
}
