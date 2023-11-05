# todo-log-webpack-plugin

## Overview

`todo-log-webpack-plugin` is a Webpack plugin that collects and outputs TODO comments from your code during the build process.

## Installation

You can install the plugin via npm:

```bash
npm i todo-log-webpack-plugin
```

## Usage
To use the `todo-log-webpack-plugin`, follow these steps:

1. Import the plugin into your Webpack configuration:
```js
const { TodoLogWebpackPlugin } = require('todo-log-webpack-plugin');
```

2. Add the plugin to your Webpack plugins array:
```js
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new TodoLogWebpackPlugin()
  ]
}
```

## Log Output
When you run your Webpack build with the `todo-log-webpack-plugin` enabled, it will collect and output the TODO comments in your code. Here's an example of what the log output might look like:
```
<i> [TodoLogWebpackPlugin] @TODO - /user/develop/project/todo-log-webpack-plugin/src/util/convert.js
<i> [TodoLogWebpackPlugin] @TODO - /user/develop/project/todo-log-webpack-plugin/src/util/string.js
```

## Options
The `todo-log-webpack-plugin` supports the following options:
|Option|Type|Default|Description|
|-|-|-|-|
|`enable`|boolean|`true`|Enables or disables the plugin.|
|`todoRule`|string|`@TODO`|The rule used to identify TODO comments in your code.|
|`skipRule`|string or false|`false`|Identifies comments that should be skipped during collection.|

### `enable`
- Type: `boolean`
- Default: `true`

By setting enable to true, the plugin will collect and output TODO comments during the build process. If set to false, the plugin will be disabled.

### `todoRule`
- Type: `string`
- Default: `@TODO`

The todoRule option allows you to customize the rule used to identify TODO comments in your code. You can set it to the specific keyword or annotation you use for TODO comments in your code.

### `skipRule`
- Type: `string` or `false`
- Default: `false`

The skipRule option allows you to specify a rule to identify comments that should be skipped during collection. If set to false, no comments will be skipped. You can use this option to exclude specific comments from being collected.