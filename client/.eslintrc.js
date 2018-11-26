module.exports = {
  plugins: [
    'jsx-control-statements'
  ],
  extends: ['standard-react', 'plugin:jsx-control-statements/recommended'],
  rules: {
    /*
      * ENFORCING OPTIONS
      * =================
      */
    // Semi colon checker
    semi: ['error', 'never'],
    // Space before function parenthesis
    'space-before-function-paren': [
      'error',
      {
        // Anonymous functions e.g. return () => {}
        anonymous: 'never',
        // Named functios e.g. let sample = () => {}
        named: 'never',
        // Async/Await validator e.g. async functionName() { await Promise.return() }
        asyncArrow: 'always'
      }
    ],
    // Disallow or enforce spaces inside of parentheses (space-in-parens) - e.g. foo( 'bar') must be foo('bar')
    'space-in-parens': ['warn', 'never'],
    // Shorthand syntax validator e.g. let sample = () => 'sample return'
    'object-shorthand': ['warn', 'methods'],
    // Forced to use === instead of == to include the validation of data type
    eqeqeq: ['warn', 'always'],
    // No Unused Vars
    'no-unused-vars': ['warn'],
    // Force all variable names to use either camelCase style or UPPER_CASE
    // with underscores.
    // camelcase: ['warn', {properties: 'always'}],
    // No use of variables/classes/functions before it was defined
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true
      }
    ],
    // Disallow or enforce spaces inside of computed properties - e.g. obj[ 'foo' ] must be obj['foo']
    'computed-property-spacing': ['warn', 'never'],
    // Disallow or enforce spaces inside of brackets (array-bracket-spacing) - e.g. [ 'foo', 'bar' ] must be ['foo', 'bar']
    'array-bracket-spacing': ['warn', 'never'],
    // Enforce consistent spacing inside braces (object-curly-spacing) - e.g { 'foo': 'bar' } must be {'foo': {'bar': 'baz'}, 'qux': 'quxx'}
    'object-curly-spacing': ['warn', 'never'],
    // Enforces spacing around commas (comma-spacing) - e.g. var foo = 1 ,bar = 2; must be var foo = 1, bar = 2, baz = 3;
    'comma-spacing': ['warn', {before: false, after: true}],
    // Disallow Undeclared Variables (no-undef) - exept typeof usage
    // 'no-undef': ['error', {typeof: true}],
    'no-undef': 0,
    // Default Props
    'react/require-default-props': ['error', {forbidDefaultForRequired: true}],
    // Enforced the usage of "use strict" globally
    strict: ['error', 'global'],
    // JSX
    "jsx-control-statements/jsx-choose-not-empty": 1,
    "jsx-control-statements/jsx-for-require-each": 1,
    "jsx-control-statements/jsx-for-require-of": 1,
    "jsx-control-statements/jsx-if-require-condition": 1,
    "jsx-control-statements/jsx-otherwise-once-last": 1,
    "jsx-control-statements/jsx-use-if-tag": 1,
    "jsx-control-statements/jsx-when-require-condition": 1,
    "jsx-control-statements/jsx-jcs-no-undef": 1,
    "react/jsx-no-undef": [2, { "allowGlobals": true }],
    "react/jsx-indent": ["warn", 2, {props: 4}]
  },
  env: {
    "jsx-control-statements/jsx-control-statements": true
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    process: true,
    document: true,
    console: true,
    localStorage: true,
    window: true,
    require: true,
    setTimout: true
  }
}
