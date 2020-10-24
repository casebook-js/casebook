module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:node/recommended',
        'plugin:react/recommended',
        'airbnb',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'node',
        'react'
    ],
    rules: {
        'arrow-body-style': 'off',
        'comma-dangle': ['error', 'never'],
        'func-names': 'off',
        'indent': ['error', 4, { 'ignoreComments': true, 'SwitchCase': 1 }],
        'max-classes-per-file': 'off',
        'max-len': 'off',
        'no-await-in-loop': 'off',
        'no-else-return': 'off',
        'no-lonely-if': 'off',
        'no-loop-func': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-underscore-dangle': 'off',
        'no-unneeded-ternary': 'off',
        'object-shorthand': 'off',
        'operator-linebreak': ['error', 'after'],
        'prefer-arrow-callback': 'off',
        'prefer-destructuring': 'off',
        'quote-props': 'off',

        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',

        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',

        'node/file-extension-in-import': ['error'],
        'node/no-extraneous-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/shebang': 'off',

        'react/destructuring-assignment': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-fragments': ['error', 'element'],
        'react/jsx-indent': ['error', 4, { 'checkAttributes': true, 'indentLogicalExpressions': false }],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-no-bind': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-wrap-multilines': ['error', {
            'declaration': 'parens-new-line',
            'assignment': 'parens-new-line',
            'return': 'parens-new-line',
            'arrow': 'parens-new-line',
            'condition': 'parens-new-line',
            'logical': 'ignore',
            'prop': 'ignore'
        }],
        'react/prefer-stateless-function': 'off',
        'react/react-in-jsx-scope': 'off'
    }
};
