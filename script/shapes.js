class ShapeMorph {
    constructor() {

    }
    toggleAnimation = () => {
        const icon = document.querySelector('[data-select="icon"]');
        icon.classList.toggle("icon--animate");
    }
    animate = () => requestAnimationFrame(this.toggleAnimation);
    trigger() {
        this.animate();
    }
}


// const toggleAnimation = () => {
//     const icon = document.querySelector('[data-select="icon"]');
//     icon.classList.toggle("icon--animate");
// }

// const animate = () => requestAnimationFrame(toggleAnimation);

// animate();

// const button = document.querySelector('[data-select="button"]');

// button.addEventListener('click', animate);