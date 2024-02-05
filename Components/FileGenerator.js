import Util from "../Util.js";

/**
 * Classe CSVGenerator
 * @author Jonatas Silva
 * 
 * Esta classe é responsável por gerar e baixar um arquivo CSV a partir de dados fornecidos.
 */

/**
 * Description placeholder
 * @date 1/26/2024 - 2:32:09 PM
 * @author Jonatas Silva
 * @description essa variavel trabalha com estilo do PDF para as tabelas.
 * @type {HTMLStyleElement}
 */
const styleTable = `
    body {
        background-color: #FFF;
    }

    * {
        font-family: monospace;
        color: #000;
        margin: 0;
        padding: 0;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px;
    }

    table, th, td {
        border: 1px solid #ddd;
    }

    th, td {
        padding: 12px 5px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`;

export class CSVGenerator {
  /**
   * Construtor da classe CSVGenerator.
   * @param {Function} getTasks - Função que retorna a lista de tarefas a serem incluídas no CSV.
   * @param {string} configId - Identificador de configuração para filtrar as tarefas desejadas.
   */
  constructor(getTasks, configId) {
    this.getTasks = getTasks;
    this.configId = configId;
    this.util = new Util();
  }

  /**
   * Método generateCSV
   * Gera um arquivo CSV a partir das tarefas obtidas pela função getTasks e realiza o download.
   */
  generateCSV() {
    const filteredTasks = this.getTasks.filter(item => item.state_id == this.util.removeStringAndUnderline(this.configId));

    if (filteredTasks.length > 0) {
      const jsonData = filteredTasks.map(item => ({
        "Tarefas": item.description,
        "Estado das Tarefas": item.state_description,
        "Prioridade das Tarefas": item.priority == 0 ? 'baixa' : item.priority == 1 ? 'media' : item.priority == 2 ? 'alta' : 0,
        "Data de Inicio das Tarefas": item.initial_date,
        "Data final das Tarefas": item.final_date,
      }));

      const csvData = this.convertToCSV(jsonData);
      this.downloadCSV(csvData, 'documento.csv');
    } else {
      console.log("Nenhum dado encontrado para criar o CSV.");
    }
  }

  /**
   * Método convertToCSV
   * Converte os dados fornecidos em formato JSON para uma string CSV.
   * @param {Array} data - Array de objetos contendo os dados a serem convertidos.
   * @returns {string} - String CSV gerada a partir dos dados.
   */
  convertToCSV(data) {
    const header = Object.keys(data[0]).join('\t');
    const rows = data.map(obj => Object.values(obj).join('\t'));
    console.log(header, rows);

    return `${header}\n${rows.join('\n')}`;
  }

  /**
   * Método downloadCSV
   * Inicia o download do arquivo CSV gerado.
   * @param {string} csv - String CSV a ser baixada.
   * @param {string} filename - Nome do arquivo CSV a ser baixado.
   */
  downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: `text/csv;charset=utf-8, ${encodeURIComponent(csv)}` });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

/**
 * Classe PDFGenerator
 * @author Jonatas Silva
 * 
 * Esta classe é responsável por gerar e imprimir um documento PDF a partir de dados fornecidos.
 */
export class PDFGenerator {
  /**
   * Construtor da classe PDFGenerator.
   * @param {Array} data - Dados a serem incluídos no documento PDF.
   * @param {string} configId - Identificador de configuração para filtrar os dados desejados.
   */
  constructor(data, configId) {
    this.content = document.createElement('div');
    this.printWindow = window.open('', '_blank');
    this.printDocument = this.printWindow.document;
    this.head = document.createElement('head');
    this.setupHead();
    this.setupContent(data, configId);
  }

  /**
   * Método setupHead
   * Configura o cabeçalho do documento PDF.
   */
  setupHead() {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    this.head.appendChild(viewport);
    const charset = document.createElement('meta');
    charset.charset = 'UTF-8';
    this.head.appendChild(charset);
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(styleTable));
    this.head.appendChild(style);
  }

  /**
   * Método setupContent
   * Configura o conteúdo do documento PDF com base nos dados fornecidos.
   * @param {Array} data - Dados a serem incluídos no documento PDF.
   * @param {string} configId - Identificador de configuração para filtrar os dados desejados.
   */
  setupContent(data, configId) {
    console.log(data);
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    thead.appendChild(this.createElementTr());
    this.validate(tbody, configId, data);
    table.appendChild(thead);
    table.appendChild(tbody);
    this.content.appendChild(table);
  }

  /**
   * Método createElementTr
   * Cria um elemento 'tr' para o cabeçalho da tabela no documento PDF.
   * @returns {HTMLTableRowElement} - Elemento 'tr' do cabeçalho da tabela.
   */
  createElementTr() {
    const headers = ['Tarefas', 'Estado das Tarefas', 'Prioridade', 'Data Inicial', 'Data Final', 'Percentual'];
    const trHead = document.createElement('tr');
    for (const headerText of headers) {
      const th = document.createElement('th');
      th.innerText = headerText;
      trHead.appendChild(th);
    }
    return trHead;
  }

  /**
   * Método validate
   * Valida e preenche o corpo da tabela com os dados fornecidos.
   * @param {HTMLTableSectionElement} tbody - Elemento 'tbody' da tabela.
   * @param {string} configId - Identificador de configuração para filtrar os dados desejados.
   * @param {Array} data - Dados a serem incluídos no documento PDF.
   */
  validate(tbody, configId, data) {
    const util = new Util();
    const filteredTasks = data.filter(item => item.state_id == util.removeStringAndUnderline(configId));
    if (filteredTasks.length > 0) {
      filteredTasks.forEach(item => {
        const trBody = document.createElement('tr');
        const attributes = [
          { key: 'description', label: 'tdDescription' },
          { key: 'state_description', label: 'tdState' },
          { key: 'priority', label: 'tdPriority', transform: value => this.getPriorityText(value)},
          { key: 'initial_date', label: 'tdInitialDate', transform: value => value.split('-').reverse().join('/') }, 
          { key: 'final_date', label: 'tdFinalDate', transform: value => value.split('-').reverse().join('/') },
          { key: 'percent', label: 'tdPercent', transform: value => `${value}%` }
        ];
        attributes.forEach(attr => {
          const td = document.createElement('td');
          td.innerText = attr.transform ? attr.transform(item[attr.key]) : item[attr.key];
          trBody.appendChild(td);
        });
        tbody.appendChild(trBody);
      });
    }
  }

  /**
   * Método getPriorityText
   * Converte o valor numérico de prioridade em uma string descritiva.
   * @param {number} priority - Valor numérico representando a prioridade.
   * @returns {string} - String descritiva da prioridade.
   */
  getPriorityText(priority) {
    return priority == 0 ? 'baixa' : priority == 1 ? 'média' : priority == 2 ? 'alta' : 'Não foi especificado o nível';
  }

  /**
   * Método generatePDF
   * Gera o conteúdo HTML do documento PDF, imprime e fecha a janela de impressão.
   */
  generatePDF() {
    const htmlContent = `
      <html>
        ${this.head.outerHTML}
        <body>
          ${this.content.outerHTML}
        </body>
      </html>
    `;
    this.printDocument.write(htmlContent);
    this.printWindow.print();
    this.printDocument.close();
  }

  /**
   * Método closeWindow
   * Fecha a janela de impressão.
   */
  closeWindow() {
    if (this.printWindow) {
      this.printWindow.close();
    }
  }
}
