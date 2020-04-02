const openStream  = require('./openStream.js')
const playVideo = require('./playVideo')
const Peer = require('simple-peer')

openStream(function(stream){
    playVideo(stream, 'localStream')
    const p = new Peer({
        initiator: location.hash === '#1', 
        trickle: false, 
        stream: stream,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }, 
                { urls: 'stun:stun1.l.google.com:19302'},
                { urls: 'stun:stun2.l.google.com:19302'},
                { urls: 'stun:stun3.l.google.com:19302'},
                { urls: 'stun:stun4.l.google.com:19302'},
                { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
            ]
        }
    })

    p.on('signal', token => {
        document.getElementById('txtMySignal').value = JSON.stringify(token)
    })
    p.on('connect', () => {
        console.log('connected')
    })
    document.getElementById("btnConnect").addEventListener('click', () => {
        const friendSignal = JSON.parse(document.getElementById("txtFriendSignal").value)
        p.signal(friendSignal)
    })

    p.on('stream', friendStream => playVideo(friendStream, 'friendStream'))
})

