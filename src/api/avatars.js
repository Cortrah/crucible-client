//======================
// mocking server data
//======================
const _avatars = [
    { id: '0', name: 'General Scum', img: '../static/general_scum.png' },
    { id: '1', name: 'Protobot', img: '../static/robot1.png' },
    { id: '2', name: 'Streambot', img: '../static/robot2.png' },
    { id: '3', name: 'Grammarbot', img: '../static/robot3.png' },
    { id: '4', name: 'Lambdabot', img: '../static/robot4.png' },
    { id: '5', name: 'Admiral Hope', img: '../static/admiral_hope.png' },
    { id: '6', name: 'Cavalier', img: '../static/dog1.png' },
    { id: '7', name: 'Mini Schnauser', img: '../static/dog2.png' },
    { id: '8', name: 'Boston Terrier', img: '../static/dog3.png' },
    { id: '9', name: 'Border Collie', img: '../static/dog4.png' } ,
];

export default {
    getAvatars (callback) {
        setTimeout(() => callback(_avatars), 100)
    }
}
