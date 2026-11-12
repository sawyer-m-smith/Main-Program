let pending_entries = []

function prefill_trick() {
    let params = new URLSearchParams(window.location.search)
    let new_trick = params.get("trick")

    let trick = document.getElementById("trick_input")
    if (new_trick != null) {
        trick.value = new_trick
    }
}

function trick_dataset() {
    const tricks = load()

    for (const trick of tricks) {
        const trick_list = document.getElementById("trick_options")
        const option = document.createElement("option")
        option.value = trick.name
        trick_list.appendChild(option)
    }
}

function setup_add() {
    let log = document.getElementById("log_session_form")
    log.addEventListener("submit", function (event) {
        event.preventDefault()
        
        let trick_name = document.getElementById("trick_input").value.trim()
        let landed = Number(document.getElementById("trick_lands").value)
        let attempts = Number(document.getElementById("trick_attempts").value)
        let empty_error = document.getElementById("trick_empty_error")
        empty_error.textContent = ''
        if (trick_name === '') {
            empty_error.textContent = "Cannot have empty name"
            return
        }

        let attempt_error = document.getElementById("trick_landed_too_big")
        attempt_error.textContent = ''
        if (attempts < 1) {
            attempt_error.textContent = "Attempted must be at least 1"
            return
        } else if (landed > attempts) {
            attempt_error.textContent = "Landed cannot be bigger than attempted"
            return
        }

        let new_trick = {name: trick_name, landed: landed, attempts: attempts};
        pending_entries.push(new_trick)
        display_pending_list()

        document.getElementById("trick_input").value = ''
        document.getElementById("trick_lands").value = ''
        document.getElementById("trick_attempts").value = ''
    })
}

function display_pending_list () {
    let pending_tricks = document.getElementById("pending_trick_list")
    pending_tricks.innerHTML = ''
    for (const trick of pending_entries) {
        const list_item = document.createElement("li")
        list_item.textContent = `${trick.name} | Landed ${trick.landed} | Attempted: ${trick.attempts}`
        pending_tricks.appendChild(list_item)
    }
}

function setup_save() {
    let save_button = document.getElementById("save_session")
    save_button.addEventListener("click", function (event) {

        if (pending_entries.length == 0) {
            let empty_error = document.getElementById("error_empty_list")
            empty_error.textContent = "You cannot save an empty session, try adding a trick to the session"
            return
        }

        const tricks = load()
            for (const entry of pending_entries) {
                const match = tricks.find(function (saved) {
                    return saved.name.toLowerCase() === entry.name.toLowerCase()
                })
                
                if (match) {
                    match.landed += entry.landed
                    match.attempts += entry.attempts
                } else {
                    tricks.push(entry)
                }
            }
        
        save(tricks)
        window.location.href = "index.html?status=saved"
    })
}

prefill_trick()
trick_dataset()
setup_add()
setup_save()