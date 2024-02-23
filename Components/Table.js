import Util from "../Util.js";

export class TableGenerator {
    constructor() {
      // Método vazio por enquanto
    }


    /**
     * cabeçalho da tabela
     * @date 2/17/2024 - 10:34:01 AM
     *
     * @static
     * @param {*} local - é aonde vai receber as linhas
     */
    static Thead(local) {
        try {
            const thead = document.createElement("thead");
            thead.appendChild(local);
            return thead;
        } catch(e) {
            console.error(e.error);
        }
    }
    
    // static Tbody(local) {
    //     try {
    //         const tbody = document.createElement("tbody");
    //         tbody.appendChild(local);
    //         return tbody;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
  
    /**
     * Método para criar um elemento 'tr' para o cabeçalho da tabela.
     * @param {Array} headers Array contendo os cabeçalhos da tabela.
     * @returns {HTMLTableRowElement} Elemento 'tr' do cabeçalho da tabela.
     */
    static createHeaderRow(headers) {
      try {
        const trHead = document.createElement('tr');
        for (const headerText of headers) {
          const th = document.createElement('th');
          th.innerText = headerText;
          trHead.appendChild(th);
        }
        return trHead;
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Método para preencher o corpo da tabela com os dados fornecidos.
     * @param {HTMLTableSectionElement} tbody - Elemento 'tbody' da tabela.
     * @param {Array} attributes - Array contendo os atributos dos dados.
     * @param {Array} data - Dados a serem incluídos na tabela.
     * @param {string} configId - Identificador de configuração para filtrar os dados desejados.
     */
    static fillTableBody(tbody, attributes, data, teste, configId) {

      // Se necessário, substitua 'Util' pela classe que contém o método 'removeStringAndUnderline'
      const filteredData = data.filter(item => item[teste] ==  Util.removeStringAndUnderline(configId));
      const resultado = teste ? filteredData : data;
      resultado.forEach(item => {
        const trBody = document.createElement('tr');
        attributes.forEach(attr => {
          const td = document.createElement('td');
          td.innerText = attr.transform ? attr.transform(item[attr.key]) : item[attr.key];
          trBody.appendChild(td);
        });
        tbody.appendChild(trBody);
      });
    }
  
    /**
     * Método para obter o texto de prioridade correspondente ao valor numérico.
     * @param {number} priority - Valor numérico representando a prioridade.
     * @returns {string} - String descritiva da prioridade.
     */
    static getPriorityText(priority) {
      try {
        const priorityMap = { 0: 'baixa', 1: 'média', 2: 'alta' };
        return priorityMap[priority] || 'Não foi especificado valor!';
      } catch (error) {
        console.error(error.message);
        return 'Erro ao obter a prioridade';
      }
    }
  }
  