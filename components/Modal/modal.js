export default class Modal {

  ContainerForm(configs) {

    const divModal = document.createElement('div');
    if (configs && configs.classDivModal) divModal.className = configs.classDivModal;
    divModal.appendChild(this.ModalDivision({title: 'Erro'}));
    return divModal;
  }

  ModalDivision(configs) {
    try {
      if(!configs || !configs.title) {
        throw new Error(`Keys not found`)
      }
      const divModalError = document.createElement('div');

      divModalError.className = 'modal-gender'
      divModalError.innerHTML = `
        <h1>${configs.title}</h1>
      `;

      console.log(divModalError)

      return divModalError;

    } catch (error) {
      console.error(error.message)
    }
  }
}