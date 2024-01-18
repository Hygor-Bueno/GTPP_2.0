
export default class SimpleTask{
    description;
    priority;
    initial_date;
    final_date;
    
    constructor(description,priority,initial_date,final_date){
        this.description = prompt('Nome da tarefa',description);
        this.priority = prompt('prioridade',priority);
        this.initial_date = prompt('Data inicial',initial_date);
        this.final_date = prompt('Data final',final_date);

    }

    validateDate(){
        try {
            if(this.initial_date > this.final_date) throw new Error('Invalid date')
        } catch (error) {
            console.error(error.message);
        }
    }

    validateIsEmpty(){
        try {
            if(this.description.length <= 0) throw new Error('Invalid description');
        } catch (error) {
            console.error(error.message);
        }
    }

    validatePriority() {
        try{
            if(this.priority.length <= 0) throw new Error('Invalid priority');
        } catch (error) {
            console.error(error.mesage);
        }
    }

    validateFinalDate() {
      try {
        if(this.final_date < this.initial_date) throw new Error('Invalid final_date');
      } catch (error) {
        console.error(error.message);
      }
    } 
    
}