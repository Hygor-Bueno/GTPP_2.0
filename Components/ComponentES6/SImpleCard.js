export default SimpleCard = (item) => {
    return (`
        <div data-list >
            <label class="d-block">
                ${item.description}
            </label>
            <label class="d-block">
                ${item.priority}
            </label>
            <label class="d-block">
                ${item.initial_date}
            </label>
            <label class="d-block">
                ${item.final_date}
            </label>
        </div>
    `)  
}