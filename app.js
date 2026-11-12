function save(pending_trick_list) {
    let ptr = JSON.stringify(pending_trick_list)
    localStorage.setItem("tricks", ptr)
}

function load() {
    let ptr = localStorage.getItem("tricks")
    if (ptr == null) {
        return []
    }
    return JSON.parse(ptr)
}