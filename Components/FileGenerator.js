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
      // Adicionar meta tag viewport
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      this.head.appendChild(viewport);
  
      // Adicionar charset ao cabeçalho
      const charset = document.createElement('meta');
      charset.charset = 'UTF-8';
      this.head.appendChild(charset);
  
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(`
        body {
          background-color: #FFF;
        }
  
        * {
          font-family: monospace;
          color: #000;
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
          padding: 12px;
          text-align: left;
        }
        
        th {
          background-color: #f2f2f2;
        }
      `));
      this.head.appendChild(style);
    }
  
    setupContent(data, configId) {
      const util = new Util();

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');
  
      // Cabeçalho
      const trHead = document.createElement('tr');
      const th1 = document.createElement('th');
      th1.innerText = 'Tarefas';
      const th2 = document.createElement('th');
      th2.innerText = 'Estado das Tarefas';
      trHead.appendChild(th1);
      trHead.appendChild(th2);
      thead.appendChild(trHead);

      const filteredTasks = data.filter(item => item.state_id == util.removeStringAndUnderline(configId));

      if(filteredTasks.length > 0) {
        filteredTasks.forEach(item => {
          const trBody = document.createElement('tr');
          const td1 = document.createElement('td');
          td1.innerText = item.description;
          const td2 = document.createElement('td');
          td2.innerText = item.state_description;
          trBody.appendChild(td1);
          trBody.appendChild(td2);
          tbody.appendChild(trBody);
        });
      }
  
      table.appendChild(thead);
      table.appendChild(tbody);
      this.content.appendChild(table);
    }
  
    generatePDF() {
      this.printDocument.write('<html>');
      this.printDocument.write(this.head.outerHTML);
      this.printDocument.write('<body>');
      this.printDocument.write(this.content.outerHTML);
      this.printDocument.write('</body>');
      this.printDocument.write('</html>');
  
      this.printWindow.print();
      this.printDocument.close();
    }

    closeWindow() {
        if (this.printWindow) {
          this.printWindow.close();
        }
    }
  }