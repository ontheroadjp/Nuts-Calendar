module.exports = {
//    root: true,
//    parser: 'babel-eslint',
//    parserOptions: {
//        sourceType: 'module'
//    },

//    "extends": ["eslint:recommended", "vue"],
    "extends": ["eslint:recommended"],

    "env" : {
        "browser": true,
        "node": true,
        "es6": true
    },

    "globals": {
        "describe": true,
        "it": true,
        "assert": true,
        "dispatch": true,
        "expect": true
    },

    "rules": {
//        "vue/jsx-uses-vars": 2,
        "no-unsafe-finally": "off",
        "no-native-reassign": "off",
        "complexity": ["off", 11],
        "comma-dangle": "error",
        "prefer-const": 2,
        "semi": [2, "always"],
        "key-spacing": [2, {
            "beforeColon": false,
            "afterColon" : true
        }],

        "no-trailing-spaces": 2,
        "lines-around-comment": 2,
        "space-before-blocks": 2,
        "require-yield": "error"
    }
}
