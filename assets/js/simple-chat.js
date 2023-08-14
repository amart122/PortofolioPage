( (global) => {
    const amz = {}

    amz.transition_store = []

    amz.goToNextPage = ($btn) => {
        if(!$btn) return
        if(!$btn.dataset.nextPage) return

        $btn.addEventListener('click', (ev) => {
            if(ev.target.id == "backBtn" && !amz.transition_store.length) return

            const next_page = document.querySelector('.page.'+$btn.dataset.nextPage)
            const curr_page = document.querySelector('.page.active')
            next_page.classList.add("entering", "active")

            if(ev.target.id != "backBtn") {
                amz.transition_store.unshift(document.getElementById("backBtn").dataset.nextPage)
            } else {
                amz.transition_store.shift()
            }

            if(amz.transition_store.length) {
                document.getElementById("backBtn").dataset.nextPage = amz.transition_store[0]
            }

            setTimeout(() => {
                curr_page.classList.remove("active")
                next_page.classList.remove("entering")
            }, 600)
        })
    }

    global.$amz = amz
})(window)

window.onload = ( () => {
    document.querySelectorAll(".learn-more button").forEach( (x) => {
        $amz.goToNextPage(x)
    })
    $amz.goToNextPage(document.getElementById("backBtn"))
})