class Floor {
    constructor(root) {
        this.root = document.querySelector(root)
        this.colorRecorder = document.createElement('div')
        this.colorRecorder.classList.add('colorRecorder')
        this.root.appendChild(this.colorRecorder)
        this.lastColor;
    }
    heard(caller) {
        // save it
        this.lastColor = caller.from.color
        // new record
        const newSquare = new ColorRecord({color:caller.from.color})
        
        this.colorRecorder.insertBefore(newSquare, this.colorRecorder.childNodes[0])

        //this.colorRecorder.appendChild(newSquare)
        
        newSquare.classList.add('grow')

        // primary effect
        this.root.setAttribute('style','background-color:'+caller.from.color)
        
    }
}

class ColorRecord {
    constructor(options) {
        const record = document.createElement('div')
        record.setAttribute('style', 'cursor: pointer; background-color:'+options.color)
        record.classList.add('colorRecord')
        return record
    }
}