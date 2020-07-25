[![Published on NPM](https://img.shields.io/npm/v/@anypoint-web-components/anypoint-input-combobox.svg)](https://www.npmjs.com/package/@anypoint-web-components/anypoint-input-combobox)

[![Build Status](https://travis-ci.com/anypoint-web-components/anypoint-input-combobox.svg)](https://travis-ci.com/anypoint-web-components/anypoint-input-combobox)

# anypoint-input-combobox

A combo box is a combination of a text field and the dropdown element. It renders a free input element that coexists with a list of predefined values.
The user is not limited to the list of rendered dropdown values but instead it helps choose the right option.

## Usage

### Installation

```sh
npm install --save @anypoint-web-components/anypoint-input-combobox
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-input-combobox/anypoint-input-combobox.js';

class SampleElement extends PolymerElement {
  render() {
    return html`
    <anypoint-input-combobox @value-changed="${this._valueHandler}" type="number" .value="{this.zoom}">
      <label slot="label">Zoom level</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1">
        <anypoint-item>1</anypoint-item>
        <anypoint-item>2</anypoint-item>
        <anypoint-item>3</anypoint-item>
      </anypoint-listbox>
    </anypoint-input-combobox>
    `;
  }

  _valueHandler(e) {
    this.zoom = e.detail.value;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/anypoint-web-components/anypoint-input-combobox
cd anypoint-input-combobox
npm i
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
