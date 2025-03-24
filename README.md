# lsw-formtypes

Form types UI manager tool for LSW. Based on vue@2.

## Install

```sh
npm i -s @allnulled/lsw-formtypes
```

## Import

```html
<script src="node_modules/@allnulled/lsw-formtypes/lsw-formtypes.js"></script>
<link rel="stylesheet" type="text/css" href="node_modules/@allnulled/lsw-formtypes/lsw-formtypes.css" />
```

## Use

### 1. Locate global API:

```js
console.log(commonFormtypes); // global instance, to have one namespace already set up
console.log(LswFormtypes); // global class, if you want to set up your own collection of formtypes
console.log(Vue.prototype.$lsw.classes.Formtypes); // accessible from the framework too
```

