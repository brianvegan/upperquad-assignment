const spanify = new Spanify('.spanify');
const bouncy = new BounceParty('#bouncingBall', 1);
const floor = new Floor('#confettiParty');
const shapeMorph = new ShapeMorph();
const layout = new Layout();

bouncy.addListener({type:'bottom', callback: floor})
bouncy.render();

