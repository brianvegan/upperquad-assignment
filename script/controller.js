const spanify = new Spanify('.spanify');
const bouncy = new BounceParty('#bouncingBall', 1);
const floor = new Floor('#confettiParty');
const shapeMorph = new ShapeMorph();

bouncy.addListener({type:'bottom', callback: floor})
bouncy.render();

