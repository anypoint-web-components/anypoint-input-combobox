import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '../anypoint-input-combobox.js';

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'outlined',
      'compatibility',
      'disabled',
      'noOverlap',
      'noAnimations',
      'fitPositionTarget',
      'noLabelFloat',
      'currentValue',
    ]);
    this._componentName = 'anypoint-combobox';
    this.disabled = false;
    this.noOverlap = false;
    this.noAnimations = false;
    this.fitPositionTarget = false;
    this.noLabelFloat = false;
    this.currentValue = '';

    this.demoStates = ['Filles', 'Outlined', 'Anypoint'];
    this.items = [
      'Allosaurus',
      'Brontosaurus',
      'Carcharodontosaurus',
      'Diplodocus',
      'Ekrixinatosaurus',
      'Fukuiraptor',
      'Gallimimus',
      'Hadrosaurus',
      'Iguanodon',
      'Jainosaurus',
      'Kritosaurus',
      'liaoceratops',
      'megalosaurus',
      'nemegtosaurus',
      'ornithomimus',
      'protoceratops',
      'quetecsaurus',
      'rajasaurus',
      'stegosaurus',
      'triceratops',
      'utahraptor',
      'vulcanodon',
      'wannanosaurus',
      'xenoceratops',
      'yandusaurus',
      'zephyrosaurus'
    ];

    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._inputHandler = this._inputHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    this.outlined = state === 1;
    this.compatibility = state === 2;
  }

  _inputHandler(e) {
    console.log(e.target.value);
    this.currentValue = e.target.value;
  }

  _changeHandler(e) {
    console.log(e.target.value);
    this.currentValue = e.target.value;
  }

  _demoTemplate() {
    const {
      demoStates,
      outlined,
      compatibility,
      darkThemeActive,
      disabled,
      noOverlap,
      noAnimations,
      fitPositionTarget,
      noLabelFloat,
      currentValue,
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the combo box element with various
          configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-input-combobox
            slot="content"
            ?compatibility="${compatibility}"
            ?outlined="${outlined}"
            ?disabled="${disabled}"
            ?noOverlap="${noOverlap}"
            ?noAnimations="${noAnimations}"
            ?fitPositionTarget="${fitPositionTarget}"
            ?noLabelFloat="${noLabelFloat}"
            @input="${this._inputHandler}"
            @change="${this._changeHandler}"
          >
            <label slot="label">Fruit name</label>
            <anypoint-listbox slot="dropdown-content" tabindex="-1" ?compatibility="${compatibility}">
            ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
            </anypoint-listbox>
          </anypoint-input-combobox>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="disabled"
            @change="${this._toggleMainOption}"
          >Disabled</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="noOverlap"
            @change="${this._toggleMainOption}"
          >No overlap</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="noAnimations"
            @change="${this._toggleMainOption}"
          >No animations</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="fitPositionTarget"
            @change="${this._toggleMainOption}"
          >Fit content</anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="noLabelFloat"
            @change="${this._toggleMainOption}"
          >No float label</anypoint-checkbox>
          
        </arc-interactive-demo>

        <output>Current value: ${currentValue}</output>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint combo box</h2>
      ${this._demoTemplate()}
    `;
  }
}

const instance = new DemoPage();
instance.render();
