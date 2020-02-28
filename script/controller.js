//const weather = new Weather({api:'3e6e8dd9626655f165b425c5ee6f42d4',prompt:'.geo'});
const spanify = new Spanify('.spanify');
const bouncy = new BounceParty('#bouncingBall', 1);
const floor = new Floor('#confettiParty');
bouncy.addListener({type:'bottom', callback: floor})
bouncy.render();