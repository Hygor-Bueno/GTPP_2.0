export function modal() {
    // Cria um elemento de div para o modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');

    // Adiciona um conteudo ao modal 
    modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h1>Olá, mundo!</h1>
        </div>
    `;

    // Adiciona o modal ao elemento com id 'main'
    document.querySelector('body').appendChild(modalContainer);

    // Adiciona um evento de clique para fechar o modal
    const closeButton = modalContainer.querySelector('.close');
    closeButton.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });
  
    return modalContainer;
}
