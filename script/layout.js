let isLeavingSet = []

let onScreenMainOptions = {
    rootMargin: '0px',
    threshold: 0.33
}

const sequence = function(target, show) {
    const root = document.querySelector('#'+target.id)
    let classList
    switch(target.id) {
        case 'sfMoneyShot':
            // bind subsequent animations via classes
            classList = [
                "cloud1destination",
                "cloud2destination",
                "cloud3destination",
                "cloud4destination",
                "cloud5destination",
                "toCenter"
            ];
        break
        case 'weatherReport':
            // steer the ship programatically 
            if(!hasPermission) {
                const prompt = document.querySelector('.geo')
                if(show) {
                    prompt.classList.add('on')
                } else {
                    prompt.classList.remove('on')
                }
            }
        break
        case 'morphShapes':
            shapeMorph.trigger();
        break
    }
    if(!classList) {
        return
    }
    classList.forEach((curClass, index)=>{
        if(show) {
            if(!root.classList.contains(curClass)) {
                root.classList.add(curClass)
            }
        } else {
            if(root.classList.contains(curClass)) {
                root.classList.remove(curClass)
            }
        }
    });
    return
}

const onScreenMain = function(entries) {
    entries.forEach( entry => {
        if (entry.isIntersecting) {
            // toggle can work but it also can create anomalies when other parts of the script are calling toggle
            entry.target.classList.add("is-visible")
            // keep track of the 
            isLeavingSet[entry.target.id] = true
            sequence(entry.target, true)
        } else if (isLeavingSet[entry.target.id]) {
            entry.target.classList.remove("is-visible")
            isLeavingSet[entry.target.id] = false
            sequence(entry.target, false)
        }
    })
}

let observerFinal = new IntersectionObserver(onScreenMain, onScreenMainOptions)

// snag all whom needs transition effects when on screen
let targets = document.querySelectorAll('.detect-viewport')

targets.forEach(target=>{
    // bind
    observerFinal.observe(target)
})