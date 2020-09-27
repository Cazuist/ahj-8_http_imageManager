export default class ErrorBox {
  static createErrorBox(message, container) {
    const msgBox = document.createElement('DIV');

    msgBox.classList.add('error-message');
    msgBox.innerText = message;

    container.append(msgBox);

    setTimeout(() => container.removeChild(msgBox), 2000);
  }
}
