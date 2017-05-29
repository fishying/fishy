module.exports = {
    "plugins": [
        "babel"
    ],
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8
    },
    "rules": {
        "no-console": 0,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-confusing-arrow": 0,
        "babel/new-cap": ["error", { "newIsCap": false }],
        "babel/object-curly-spacing": 1,
        "babel/no-invalid-this": 1,
        "babel/semi": ["error", "never"],
        "babel/object-curly-spacing": ["error", "always"],
        "object-curly-newline": 0
    }
}
