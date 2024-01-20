
export default class Tasks{
    id;
    description;
    percent;
    state_description;
    state_id;
    priority;
    expire;
    csds;
    user_id;
    initial_date;
    final_date;
    
    constructor(id, description, percent, state_description, state_id, priority, expire, csds, user_id, initial_date, final_date){
        this.id = id;
        this.description = description;
        this.percent = percent;
        this.state_description = state_description;
        this.state_id = state_id;
        this.priority = priority;
        this.expire = expire;
        this.csds = csds;
        this.user_id = user_id;
        this.initial_date = initial_date;
        this.final_date = final_date;
    }

    validateDate(){
        try {
            if(this.initial_date > this.final_date) throw new Error('Invalid date')
        } catch (error) {
            console.error(error.message);
        }
    }
}