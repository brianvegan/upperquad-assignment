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