export default class Menu {
    main() {
        return `
        <nav role="navigation" aria-label="Menu de navegação">
        <button aria-haspopup="true" aria-expanded="false">
            <!-- Ícone do menu -->
            &#9776; Menu
        </button>
        <ul>
            <li><a href="#">Página Inicial</a></li>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Contato</a></li>
        </ul>

    </nav>
    `
    }
}