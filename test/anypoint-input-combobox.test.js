import { fixture, assert, html, nextFrame } from '@open-wc/testing';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import * as sinon from 'sinon';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '../anypoint-input-combobox.js';

/** @typedef {import('../src/AnypointInputComboboxElement').AnypointInputComboboxElement} AnypointInputComboboxElement */
/** @typedef {import('@anypoint-web-components/anypoint-listbox').AnypointListbox} AnypointListbox */

describe('AnypointInputComboboxElement', () => {
  /**
   * @return {Promise<AnypointInputComboboxElement>}
   */
  async function listFixture() {
    return (fixture(html`
    <anypoint-input-combobox>
      <label slot="label">Zoom level</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1">
        <anypoint-item>1</anypoint-item>
        <anypoint-item>2</anypoint-item>
        <anypoint-item>3</anypoint-item>
      </anypoint-listbox>
    </anypoint-input-combobox>
    `));
  }

  /**
   * @return {Promise<AnypointInputComboboxElement>}
   */
  async function openedFixture() {
    return (fixture(html`
    <anypoint-input-combobox opened>
      <label slot="label">Zoom level</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1">
        <anypoint-item>1</anypoint-item>
        <anypoint-item>2</anypoint-item>
        <anypoint-item>3</anypoint-item>
      </anypoint-listbox>
    </anypoint-input-combobox>
    `));
  }

  /**
   * @return {Promise<AnypointInputComboboxElement>}
   */
  async function openedListFixture() {
    return (fixture(html`
    <anypoint-input-combobox opened>
      <label slot="label">Zoom level</label>
      <ul slot="dropdown-content" tabindex="-1">
        <li label="v1">1</li>
        <li label="v2">2</li>
        <li label="v3">3</li>
      </ul>
    </anypoint-input-combobox>
    `));
  }

  /**
   * @return {Promise<AnypointInputComboboxElement>}
   */
  async function disabledFixture() {
    return (fixture(html`
    <anypoint-input-combobox disabled>
      <label slot="label">Zoom level</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1">
        <anypoint-item>1</anypoint-item>
      </anypoint-listbox>
    </anypoint-input-combobox>
    `));
  }

  describe('Dropdown rendering', () => {
    it('has the anypoint-dropdown element', async () => {
      const element = await listFixture();
      const node = element.shadowRoot.querySelector('anypoint-dropdown');
      assert.ok(node);
    });

    it('finds the content element', async () => {
      const element = await listFixture();
      const ce = element.contentElement;
      assert.ok(ce, 'has the element');
      assert.equal(ce.localName, 'anypoint-listbox');
    });
  });

  describe('Opened/closed state', () => {
    it('is closed by default', async () => {
      const element = await listFixture();
      assert.isFalse(element.opened, 'opened value is false');
      const node = element.shadowRoot.querySelector('anypoint-dropdown');
      const { display } = getComputedStyle(node);
      assert.equal(display, 'none', 'dropdown is not rendered');
    });

    it('can be opened by setting the opened property', async () => {
      const element = await listFixture();
      element.opened = true;
      await nextFrame();
      // one frame to update the input and the second to update the dropdown
      await nextFrame();
      const node = element.shadowRoot.querySelector('anypoint-dropdown');
      const { display } = getComputedStyle(node);
      assert.notEqual(display, 'none', 'dropdown is not hidden');
    });

    it('toggles the state with the toggle() function', async () => {
      const element = await listFixture();
      assert.isFalse(element.opened, 'opened value is false');
      element.toggle();
      assert.isTrue(element.opened, 'opened value is true');
    });

    it('toggles the state with the toggle icon click', async () => {
      const element = await listFixture();
      const node = element.shadowRoot.querySelector('.trigger-icon');
      MockInteractions.click(node);
      assert.isTrue(element.opened);
    });

    it('ignores open when :disabled', async () => {
      const element = await disabledFixture();
      element.opened = true;
      assert.isFalse(element.opened);
    });
  });

  describe('Toggle icon', () => {
    it('has the regular class name set when closed', async () => {
      const element = await listFixture();
      const node = element.shadowRoot.querySelector('.trigger-icon');
      assert.equal(node.classList.length, 1, 'has one class name');
    });

    it('has the the opened class when opened', async () => {
      const element = await openedFixture();
      const node = element.shadowRoot.querySelector('.trigger-icon');
      assert.equal(node.classList.length, 2, 'has two class names');
      assert.isTrue(node.classList.contains('opened'), 'has opened class name');
    });

    it('the icon is rotated when opened', async () => {
      const element = await openedFixture();
      const node = element.shadowRoot.querySelector('.trigger-icon');
      const { transform } = getComputedStyle(node);
      assert.isNotEmpty(transform);
    });
  });

  describe('Keyboard manipulation', () => {
    it('does not open the dropdown when focusing on the element', async () => {
      const element = await listFixture();
      element.focus();
      await nextFrame();
      assert.isFalse(element.opened);
    });

    it('opens the dropdown on the arrow down', async () => {
      const element = await listFixture();
      MockInteractions.keyDownOn(element, 13, '', 'ArrowDown');
      await nextFrame();
      assert.isTrue(element.opened);
    });

    it('opens the dropdown on the arrow up', async () => {
      const element = await listFixture();
      MockInteractions.keyDownOn(element, 13, '', 'ArrowUp');
      await nextFrame();
      assert.isTrue(element.opened);
    });

    it('calls focusNext on the content element, when defined', async () => {
      const element = await openedFixture();
      const listbox = /** @type AnypointListbox */ (element.contentElement);
      listbox.focus();
      await nextFrame();
      const spy = sinon.spy(listbox, 'focusNext');
      MockInteractions.keyDownOn(element, 13, '', 'ArrowDown');
      assert.isTrue(spy.called);
    });

    it('calls focusPrevious on the content element, when defined', async () => {
      const element = await openedFixture();
      const listbox = /** @type AnypointListbox */ (element.contentElement);
      listbox.focus();
      await nextFrame();
      const spy = sinon.spy(listbox, 'focusPrevious');
      MockInteractions.keyDownOn(element, 13, '', 'ArrowUp');
      assert.isTrue(spy.called);
    });

    it('ignores focusNext when not defined', async () => {
      const element = await openedListFixture();
      element.contentElement.focus();
      await nextFrame();
      MockInteractions.keyDownOn(element, 13, '', 'ArrowDown');
      await nextFrame();
    });

    it('ignores focusPrevious when not defined', async () => {
      const element = await openedListFixture();
      element.contentElement.focus();
      await nextFrame();
      MockInteractions.keyDownOn(element, 13, '', 'ArrowUp');
      await nextFrame();
    });
  });

  describe('Value selection', () => {
    it('inserts the value from the click event', async () => {
      const element = await listFixture();
      const item = element.querySelector('anypoint-item');
      MockInteractions.click(item);
      assert.equal(element.value, '1');
    });

    it('dispatches change event', async () => {
      const element = await listFixture();
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      const item = element.querySelector('anypoint-item');
      MockInteractions.click(item);
      assert.isTrue(spy.called);
    });

    it('dispatches input event', async () => {
      const element = await listFixture();
      const spy = sinon.spy();
      element.addEventListener('input', spy);
      const item = element.querySelector('anypoint-item');
      MockInteractions.click(item);
      assert.isTrue(spy.called);
    });

    it('inserts value from the "label" attribute', async () => {
      const element = await openedListFixture();
      const dropdown = element.shadowRoot.querySelector('anypoint-dropdown');
      const item = element.querySelector('li');
      dropdown.dispatchEvent(new CustomEvent('select', {
        detail: {
          item,
        }
      }));
      MockInteractions.click(item);
      assert.equal(element.value, 'v1');
    });
  });

  describe('a11y', () => {
    /**
     * @return {Promise<AnypointInputComboboxElement>}
     */
    async function haspopupFixture() {
      return (fixture(html`
      <anypoint-input-combobox aria-haspopup="false"></anypoint-input-combobox>
      `));
    }

    it('sets aria-haspopup on the element', async () => {
      const element = await listFixture();
      assert.equal(element.getAttribute('aria-haspopup'), 'true');
    });

    it('respects set aria-haspopup', async () => {
      const element = await haspopupFixture();
      assert.equal(element.getAttribute('aria-haspopup'), 'false');
    });

    it('sets aria-expanded on the element when not opened', async () => {
      const element = await listFixture();
      assert.equal(element.getAttribute('aria-expanded'), 'false');
    });

    it('sets aria-expanded on the content element when not opened', async () => {
      const element = await listFixture();
      const ce = element.querySelector('anypoint-listbox');
      assert.equal(ce.getAttribute('aria-expanded'), 'false');
    });

    it('sets aria-expanded on the element when opened', async () => {
      const element = await listFixture();
      element.opened = true;
      assert.equal(element.getAttribute('aria-expanded'), 'true');
    });

    it('sets aria-expanded on the content element when opened', async () => {
      const element = await listFixture();
      element.opened = true;
      const ce = element.querySelector('anypoint-listbox');
      assert.equal(ce.getAttribute('aria-expanded'), 'true');
    });

    it('is accessible in a default state', async () => {
      const element = await listFixture();
      await assert.isAccessible(element);
    });
  });
});
