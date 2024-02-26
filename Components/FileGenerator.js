import Util from "../Util.js";
import { TableGenerator } from "./Table.js";

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
   * @param {()=>any} getTasks - Função que retorna a lista de tarefas a serem incluídas no CSV.
   * @param {string} configId - Identificador de configuração para filtrar as tarefas desejadas.
   */
  constructor(getTasks, configId) {
    this.getTasks = getTasks;
    this.configId = configId;
  }

  /**
   * Método generateCSV
   * Gera um arquivo CSV a partir das tarefas obtidas pela função getTasks e realiza o download.
   */
  generateCSV() {
    try {
      const filteredTasks = this.getTasks.filter(item => item.state_id == Util.removeStringAndUnderline(this.configId));

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
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Método convertToCSV
   * Converte os dados fornecidos em formato JSON para uma string CSV.
   * @param {string[] | number[] | any[]} data - Array de objetos contendo os dados a serem convertidos.
   * @returns {string} - String CSV gerada a partir dos dados.
   */
  convertToCSV(data) {
    try {
      const header = Object.keys(data[0]).join('\t');
      const rows = data.map(obj => Object.values(obj).join('\t'));
      console.log(header, rows);
  
      return `${header}\n${rows.join('\n')}`;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Método downloadCSV
   * Inicia o download do arquivo CSV gerado.
   * @param {string} csv - String CSV a ser baixada.
   * @param {string} filename - Nome do arquivo CSV a ser baixado.
   */
  downloadCSV(csv, filename) {
    try {
      const blob = new Blob([csv], { type: `text/csv;charset=utf-8, ${encodeURIComponent(csv)}` });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
  
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error.message);
    }
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
    this.Head();
    this.Table(data, configId);
  }
  
  #headers = ['Tarefas', 'Estado das Tarefas', 'Prioridade', 'Data Inicial', 'Data Final', 'Percentual'];
  #attributes = [
    { key: 'description', label: 'tdDescription' },
    { key: 'state_description', label: 'tdState' },
    { key: 'priority', label: 'tdPriority', transform: (value) => this.getPriorityText(value) },
    { key: 'initial_date', label: 'tdInitialDate', transform: (value) => Util.formatDate(value)}, 
    { key: 'final_date', label: 'tdFinalDate', transform: (value) => Util.formatDate(value) },
    { key: 'percent', label: 'tdPercent', transform: value => `${value}%` }
  ];

  /**
   * Método setupHead
   * Configura o cabeçalho do documento PDF.
   */
  Head() {
   try {
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
   } catch (error) {
      console.error(error.message);
   }
  }

  /**
   * Configura o conteúdo do documento PDF com base nos dados fornecidos.
   * @param {string[] | number[] | any[]} data - Dados a serem incluídos no documento PDF.
   * @param {string} configId - Identificador de configuração para filtrar os dados desejados.
   * @memberOf TableGenerator
   * @function Table
   * @instance
   */
  Table(data, configId) {
    try {
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        TableGenerator.fillTableBody(tbody, this.#attributes, data, "state_id", configId);
        table.append(TableGenerator.Thead(TableGenerator.createHeaderRow(this.#headers)), tbody);
        this.content.appendChild(table);
    } catch (error) {
        console.error(error.message);
    }
  }

  /**
   * Método getPriorityText
   * Converte o valor numérico de prioridade em uma string descritiva.
   * @param {number} priority - Valor numérico representando a prioridade.
   * @returns {string} - String descritiva da prioridade.
   */
  getPriorityText(priority) {
    try {
        const priorityMap = { 0: 'baixa', 1: 'média', 2: 'alta' };
        return priorityMap[priority] || 'Não foi especificado valor!';
    } catch (error) {
        console.error(error.message);
        return 'Erro ao obter a prioridade';
    }
  }

  /**
   * Método generatePDF
   * Gera o conteúdo HTML do documento PDF, imprime e fecha a janela de impressão.
   */
  generatePDF() {
    try {
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
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Método closeWindow
   * Fecha a janela de impressão.
   */
  closeWindow() {
    try {
      if (this.printWindow) {
        this.printWindow.close();
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
