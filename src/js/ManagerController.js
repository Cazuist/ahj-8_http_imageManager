import Listener from './Listener';

export default class ManagerController {
  constructor() {
    this.fieldEl = document.querySelector('fieldset');
    this.inputEl = document.querySelector('.file-field');
    this.dropEl = document.querySelector('.drop-area');
    this.ribbonEl = document.querySelector('.img-ribbon');
    this.imgEl = document.querySelector('.img-box');
  }

  init() {
    this.registerListeners();
  }

  registerListeners() {
    window.addEventListener('DOMContentLoaded', () => Listener.onDOMLoad.call(this));
    this.inputEl.addEventListener('change', (event) => Listener.onChange.call(this, event));
    this.dropEl.addEventListener('click', (event) => Listener.onDropClick.call(this, event));
    this.dropEl.addEventListener('dragover', (event) => Listener.onDrag.call(this, event));
    this.dropEl.addEventListener('drop', (event) => Listener.onDrop.call(this, event));
    this.ribbonEl.addEventListener('click', (event) => Listener.onDelClick.call(this, event));
  }

  createImg(imgObj) {
    const clonedBox = this.imgEl.cloneNode(true);
    const newElement = imgObj.createElement(clonedBox);
    this.ribbonEl.append(newElement);
  }
}
