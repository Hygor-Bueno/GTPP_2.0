import Util from "../Util.js";

export default class CSVGenerator {
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
      const header = Object.keys(data[0]).join(',');
      const rows = data.map(obj => Object.values(obj).join(','));
      console.log(header, rows);
  
      return `${header}\n${rows.join('\n')}`;
    }
  
    downloadCSV(csv, filename) {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
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