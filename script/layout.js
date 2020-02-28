class Layout {
    constructor() {
        this.isLeavingSet = []
        this.onScreenMainOptions = {
            rootMargin: '0px',
            threshold: 0.33
        }
        this.observerFinal = new IntersectionObserver(
            e=>this.onScreenMain(e), 
            this.onScreenMainOptions
        )

        // snag all whom needs transition effects when on screen
        this.targets = document.querySelectorAll('.detect-viewport')

        this.targets.forEach(target=>{
            // bind
            this.observerFinal.observe(target)
        })
    }
    sequence(target, show) {
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
                // this would be way better if this was injected instead of globally accessed :D
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
    onScreenMain(entries) {
        entries.forEach( entry => {
            if (entry.isIntersecting) {
                // toggle can work but it also can create anomalies when other parts of the script are calling toggle
                entry.target.classList.add("is-visible")
                // keep track of the 
                this.isLeavingSet[entry.target.id] = true
                this.sequence(entry.target, true)
            } else if (this.isLeavingSet[entry.target.id]) {
                entry.target.classList.remove("is-visible")
                this.isLeavingSet[entry.target.id] = false
                this.sequence(entry.target, false)
            }
        })
    }
}