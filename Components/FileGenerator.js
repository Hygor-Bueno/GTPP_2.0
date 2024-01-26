import { styleTable } from "../Configuration/Configuration.js";
import Util from "../Util.js";

export class CSVGenerator {
    constructor(getTasks, configId) {
      this.getTasks = getTasks;
      this.configId = configId;
      this.util = new Util();
    }
  
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
  
    convertToCSV(data) {
      const header = Object.keys(data[0]).join('\t');
      const rows = data.map(obj => Object.values(obj).join('\t'));
      console.log(header, rows);
  
      return `${header}\n${rows.join('\n')}`;
    }
  
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

export class PDFGenerator {
    constructor(data, configId) {
      this.content = document.createElement('div');
      this.printWindow = window.open('', '_blank');
      this.printDocument = this.printWindow.document;
      this.head = document.createElement('head');
      this.setupHead();
      this.setupContent(data, configId);
    }
  
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
              { key: 'initial_date', label: 'tdInitialDate', transform: value => util.formaDateUTF8(new Date(value)) }, 
              { key: 'final_date', label: 'tdFinalDate', transform: value => util.formaDateUTF8(new Date(value)) },
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

  getPriorityText(priority) {
    return priority == 0 ? 'baixa' : priority == 1 ? 'média' : priority == 2 ? 'alta' : 'Não foi especificado o nível';
  }

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
    closeWindow() {
        if (this.printWindow) {
          this.printWindow.close();
        }
    }
  }