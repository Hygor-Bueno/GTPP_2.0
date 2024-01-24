/**
 * Classe destinada a funções utilitárias que serão utilizadas para todo o código.
 * @date 1/11/2024 - 9:29:28 AM
 * @author Hygor Bueno
 * @export
 * @class Util
 */
export default class Util {
    /**
     * Esse método é responsável por validar as chaves obrigatórias do componente.
     * @date 1/11/2024 - 9:30:14 AM
     *
     * @param {[]} listKeys
     * @param {object} object
     * @returns {boolean}
     */
    ValidatKeysComponent(listKeys,  object) {
        let result = true;
        listKeys.forEach(itemKey => {
            let subResult = listKeys.includes(...Object.keys(object))
            if (!subResult || !object[itemKey]) result = false;
        });
        return result;
    }
    /**
     * Limpa todos os inputs de um determinado elemento.
     * @date 1/11/2024 - 9:31:48 AM
     *
     * @param {string} local
     */
    cleanInputs(local){
        let list = document.querySelectorAll(local);
        list.forEach(item=>item.value='');   
    }

    validateMandatoryFields(){
        const elementList = document.querySelectorAll('[data-required="1"]');
        elementList.forEach(element=>{
            if(!element.value) element.classList.add('borderDanger');
        })
    }

    onCSV() {
        const fs = require('fs');
        const data = [
          ['Nome', 'Idade', 'Cidade'],
          ['João', 25, 'São Paulo'],
          ['Maria', 30, 'Rio de Janeiro'],
          ['Carlos', 22, 'Belo Horizonte'],
        ];

        const filePath = "exemplo.csv";

        function convertToCsv(data) {
          return data.map(row => row.join(',')).join('\n');
        }

        fs.writeFile(filePath, convertToCsv(data), 'utf-8', (err) => {
          if (err) {
            console.log('Erro ao criar o aquivo CSV: ' + err.message)
          } else  {
            console.log(`Arquivo CSV criado com sucesso em: ${filePath}`)
          }
        })
    }

    onPDF() {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(this.criarTabela());
        mywindow.print();
        mywindow.close();
    }

    criarTabela() {
        // Cria a tabela
        var tabela = document.createElement("table");
    
        // Cria a linha do cabeçalho
        var cabecalho = tabela.createTHead();
        var cabecalhoLinha = cabecalho.insertRow();
        var colunas = ["Nome", "Idade", "Cidade"];
    
        // Adiciona as colunas ao cabeçalho
        for (var i = 0; i < colunas.length; i++) {
          var th = document.createElement("th");
          th.textContent = colunas[i];
          cabecalhoLinha.appendChild(th);
        }
    
        // Cria algumas linhas de dados
        var dados = [
          ["João", 25, "São Paulo"],
          ["Maria", 30, "Rio de Janeiro"],
          ["Carlos", 22, "Belo Horizonte"]
        ];
    
        // Adiciona as linhas de dados à tabela
        for (var i = 0; i < dados.length; i++) {
          var linha = tabela.insertRow();
          for (var j = 0; j < dados[i].length; j++) {
            var cell = linha.insertCell();
            cell.textContent = dados[i][j];
          }
        }
    
        // Adiciona a tabela ao corpo do documento
        return document.body.appendChild(tabela);
    }
    

    removeElementClikAway(element, id){
        element.addEventListener('click', function (event) {
            if (event.target.id === id) {
              element.remove();
            }
          });
    }
}
