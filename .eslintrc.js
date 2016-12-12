module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": 'babel-eslint',
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false
    },
    "rules": {
        "no-console":0,
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
        ]
    }
};