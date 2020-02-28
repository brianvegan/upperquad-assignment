class Floor {
    constructor(root) {
        this.root = document.querySelector(root)
    }
    heard(caller) {
        // var self = this;
        // const el = document.createElement('div')
        // const before = document.createElement('div')
        // const after = document.createElement('div')
        
        // el.classList.add('pyro')
        // before.classList.add('before')
        // after.classList.add('after')

        // el.appendChild(before)
        // el.appendChild(after)

        this.root.setAttribute('style','background-color:'+caller.from.color)
    }
}