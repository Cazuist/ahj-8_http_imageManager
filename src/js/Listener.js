import ImageBox from './ImageBox';
import ErrorBox from './ErrorBox';

export default class Listeners {
  static onDOMLoad() {
    // const URL = 'http://localhost:7070';
    const URL = 'https://ahj873.herokuapp.com';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${URL}/?method=getImages`, true);

    xhr.addEventListener('load', () => {
      const images = JSON.parse(xhr.response);

      if (!images.length) {
        return;
      }

      images.forEach(({ name, src, id }) => {
        const imgObj = new ImageBox(name, src, id);
        this.createImg(imgObj);
      });
    });

    xhr.send();
  }

  static onDropClick(event) {
    event.currentTarget.classList.add('hidden');
  }

  static onDrag(event) {
    event.preventDefault();
  }

  static onDrop(event) {
    event.preventDefault();
    const { files } = event.dataTransfer;

    if (files.length === 1 && !files[0].type.startsWith('image/')) {
      const message = 'Invalid type file!';
      ErrorBox.createErrorBox(message, this.dropEl);
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const { name } = file;
      const reader = new FileReader();

      reader.onload = () => {
        const src = event.target.result;
        const boxObj = new ImageBox(name, src);

        const formData = new FormData();
        formData.append('img', JSON.stringify(boxObj));

        // const URL = 'http://localhost:7070';
        const URL = 'https://ahj873.herokuapp.com';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL, true);
        xhr.send(formData);

        this.createImg(boxObj);
      };

      reader.readAsDataURL(file);
    });
  }

  static onChange(event) {
    event.preventDefault();
    const { files } = event.currentTarget;

    if (files.length === 1 && !files[0].type.startsWith('image/')) {
      const message = 'Invalid type file!';
      ErrorBox.createErrorBox(message, this.fieldEl);
      this.inputEl.value = '';
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const { name } = file;
      const reader = new FileReader();

      reader.onload = () => {
        const src = event.target.result;
        const boxObj = new ImageBox(name, src);

        const formData = new FormData();
        formData.append('img', JSON.stringify(boxObj));

        // const URL = 'http://localhost:7070';
        const URL = 'https://ahj873.herokuapp.com';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL, true);
        xhr.send(formData);

        this.createImg(boxObj);
      };

      reader.readAsDataURL(file);
    });

    this.inputEl.value = '';
  }

  static onDelClick(event) {
    if (!event.target.classList.contains('del-box')) {
      return;
    }

    const box = event.target.closest('.img-box');
    const { id } = box.querySelector('img').dataset;
    box.remove();

    // const URL = 'http://localhost:7070';
    const URL = 'https://ahj873.herokuapp.com';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${URL}/?method=delImages&id=${id}`, true);

    xhr.send();
  }
}
