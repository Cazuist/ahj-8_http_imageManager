import { v4 as uuidv4 } from 'uuid';

export default class ImageBox {
  constructor(name, url, id = uuidv4()) {
    this.name = name;
    this.src = url;
    this.id = id;
  }

  createElement(container) {
    const img = container.querySelector('img');

    img.src = this.src;
    img.title = this.name;
    img.dataset.id = this.id;
    container.classList.remove('hidden');

    return container;
  }
}
