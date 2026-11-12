function category(trick) {
    if (trick.attempts == 0){
        return "needs_work_list"
    } 
    let ratio = (trick.landed / trick.attempts) * 100
    if (ratio < 30) {
        return "needs_work_list"
    } else if (ratio < 70) {
        return "decent_list"
    } else {
        return "got_it_list"
    }
}

function display_tricks() {
    const tricks_array = load()

    for (const trick of tricks_array) {
        const category_list = document.getElementById(category(trick))
        const list_item = document.createElement("li")
        list_item.textContent = `${trick.name} | Landed ${trick.landed} | Attempted: ${trick.attempts}`
        category_list.appendChild(list_item)
    }
}

function help_buttons() {
    for (const help_messages of document.querySelectorAll(".learn_more_button")) {
        help_messages.addEventListener("click", function () {
            help_messages.nextElementSibling.hidden = !help_messages.nextElementSibling.hidden
        });
    }
}

function address_status() {
    let params = new URLSearchParams(window.location.search)
    let new_status = params.get("status")

    let session_status = document.getElementById("session_update")
    if (new_status == "cancelled") {
        session_status.textContent = 'Cancelled log session'
    } else if (new_status == "saved") {
        session_status.textContent = 'Saved log session'
    }
}


display_tricks()
help_buttons()
address_status()