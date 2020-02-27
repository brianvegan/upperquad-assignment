// a quick little class for a block fo text
class Spanify {
    constructor(anchor) {
        this.original = document.querySelector(anchor);
        this.ancestor = this.original.parentNode;
        this.resultConatiner = this.ancestor.querySelector('.found');
        this.gameOver = this.ancestor.querySelector('.done');
        this.wordList = ['upper','quad','peru','pad','per','rad','up','ad'];
        this.discoveredWords = [];
        this.factory = null; 
        this.childCount = 0;
        this.spanifyContainer = null;
        this.hasBuilt = false;
        this.build();
    }
    build() {
        this.spanifyContainer = document.createElement('h1');
        this.spanifyContainer.classList.add('spanify-container');
        let nextNode;
        [...this.original.textContent].forEach(element => {
            nextNode = document.createElement('span');
            nextNode.textContent = element;
            
            nextNode.onmouseover = (e) => {
                this.hoverOver(e);
            }

            nextNode.onmouseout = (e) => {
                this.hoverOut(e);
            }
            
            nextNode.onclick = (e) => {
                this.onClick(e);
            }

            this.spanifyContainer.appendChild(nextNode);
        });
        this.childCount = this.spanifyContainer.childElementCount;
        
        if(!this.hasBuilt)
            this.ancestor.removeChild(this.original);
        
        this.ancestor.appendChild(this.spanifyContainer);
        this.hasBuilt = true;
    }
    checkWord() {
        let isWord = '';
        this.spanifyContainer.childNodes.forEach((node)=>{
            if(node.classList.value.indexOf('flyaway')==-1) {
                isWord += node.textContent;
            }
        });

        if(this.wordList.indexOf(isWord.toLowerCase())>-1 && 
           this.discoveredWords.indexOf(isWord)==-1) {
            return isWord; 
        }
        return false;
    }
    tallyWord(word) {
        this.discoveredWords.push(word);
        this.resultConatiner.textContent = 'DISCOVERED WORDS: '
                                            +this.discoveredWords.length
                                            +' of '
                                            +this.wordList.length;
    }
    isGameOver() {
        if(this.discoveredWords.length == this.wordList.length ) {
            return true;
        }
        return false;
    }
    end() {
        this.resultConatiner.classList.add('fade');
        this.spanifyContainer.classList.add('fade');
        setTimeout(()=>{
            this.ancestor.removeChild(this.spanifyContainer);
            this.ancestor.removeChild(this.resultConatiner);
            this.gameOver.classList.add('on');
        },1000);
        

    }
    hoverOver(e) {
        e.target.classList.add('over');
    }
    hoverOut(e) {
        e.target.classList.remove('over');
    }
    onClick(e) {
        e.target.classList.add('flyaway');
        this.childCount--;
        const result = this.checkWord();
        if(result) {
            this.tallyWord(result);
            if(this.isGameOver()) {
                this.end();
            } else {
                this.reset();
            }
        } else if(this.childCount == 0) {
            this.reset();
        }
    }
    reset() {
        this.childCount = 0;
        this.spanifyContainer.classList.add('fade');
        setTimeout(() => {
            this.ancestor.removeChild(this.spanifyContainer);
            this.build();
        }, 1500);
    }
}