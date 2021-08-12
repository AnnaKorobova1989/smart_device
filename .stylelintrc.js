module.exports = {
  "extends": "stylelint-config-htmlacademy",
  "rules": {
    "number-leading-zero": null,
    "property-no-unknown": [ true, {
      "ignoreProperties": [
        "composes"
      ]
    }],
    "unit-whitelist": ["em", "rem", "s", "px", "%", "fr", "dppx", "vh"],
    "indentation": 2,
  }
}
