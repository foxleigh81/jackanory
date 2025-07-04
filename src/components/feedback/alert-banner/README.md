# Alert Banner documentation

The 'Alert Banner' component displays an alert to the user, it can be one of 'Error' (aka 'Danger'), 'Warning', 'Success' or 'Information'.

A title can be specified if required, however if no title is specified it will default to the title of the status, e.g. 'Warning'.

## Use outside of boilerplate

This component is built to also work outside of the boilerplate. To do so, simply change the style import reference in `index.tsx` to point to `standalone.module.css` instead of `styles.module.scss`

## UI Example

<!-- STORY -->

## Code example

<!-- SOURCE -->

## Props

<!-- PROPS -->

## Usage

### ES6 Import

```js
import AlertBanner from './alert-banner';
```

### CommonJS

```js
const AlertBanner = require('./alert-banner');
```
