/**
 * Classe ProgressBar
 * @date 26/01/2024 - 10:00:00 AM
 * @author Hygor Bueno
 *
 * @export
 * @class ProgressBar
 * @classdesc Classe destinada a criação de um componente chamado ProgressBar
 */
export default class ProgressBar {
    tasks;
    /**
     * Creates an instance of ProgressBar.
     * @date 26/01/2024 - 10:00:00 AM
     * @author Hygor Bueno
     *
     * @constructor
     * @param {Array} tasks Array de tarefas com propriedades 'id' e 'check'
     */
    constructor(tasks) {
        this.tasks = tasks;
    }

    /**
     * Método para calcular a porcentagem de tarefas concluídas.
     * @date 26/01/2024 - 10:00:00 AM
     * @author Hygor Bueno
     *
     * @returns {number} A porcentagem de tarefas concluídas
     */
    calculateProgress() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.check).length;
        return (completedTasks / totalTasks) * 100;
    }

    /**
     * Método para criar a barra de progresso.
     * @date 26/01/2024 - 10:00:00 AM
     * @author Hygor Bueno
     *
     * @returns {HTMLElement} A barra de progresso como um elemento HTML
     */
    createProgressBar() {
        const progress = this.calculateProgress();
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuenow', progress.toFixed(2));
        progressBar.setAttribute('aria-valuemin', 0);
        progressBar.setAttribute('aria-valuemax', 100);
        progressBar.style.width = `${progress.toFixed(2)}%`;
        console.log(progress.toFixed(2))
        return progressBar;
    }
}
