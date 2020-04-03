const openStream = require('./openStream.js')
const playVideo = require('./playVideo')
const Peer = require('simple-peer')

openStream(function (stream) {
    playVideo(stream, 'localStream')
    const p = new Peer({
        initiator: location.hash === '#1',
        trickle: false,
        stream: stream,
        config: {
            iceServers: [
                {
                    urls: "stun:ss-turn2.xirsys.com"
                },
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
                // {
                //     username: "k3sjhrG8bf_JtVATzpMHsd2TAWTuBIxDbJXchEdP7e_4LYMCen7TlZJkxE2PRjrCAAAAAF6G4D90aGFvZ3Vt",
                //     urls: "turn:ss-turn2.xirsys.com:80?transport=udp",
                //     credential: "841f7188-7579-11ea-8dfd-12fa47b8f761"
                // },
                // {
                //     username: "k3sjhrG8bf_JtVATzpMHsd2TAWTuBIxDbJXchEdP7e_4LYMCen7TlZJkxE2PRjrCAAAAAF6G4D90aGFvZ3Vt",
                //     urls: "turn:ss-turn2.xirsys.com:3478?transport=udp",
                //     credential: "841f7188-7579-11ea-8dfd-12fa47b8f761"
                // },
                {
                    username: "k3sjhrG8bf_JtVATzpMHsd2TAWTuBIxDbJXchEdP7e_4LYMCen7TlZJkxE2PRjrCAAAAAF6G4D90aGFvZ3Vt",
                    urls: "turn:ss-turn2.xirsys.com:80?transport=tcp",
                    credential: "841f7188-7579-11ea-8dfd-12fa47b8f761"
                },
                {
                    username: "k3sjhrG8bf_JtVATzpMHsd2TAWTuBIxDbJXchEdP7e_4LYMCen7TlZJkxE2PRjrCAAAAAF6G4D90aGFvZ3Vt",
                    urls: "turn:ss-turn2.xirsys.com:3478?transport=tcp",
                    credential: "841f7188-7579-11ea-8dfd-12fa47b8f761"
                },
                {
                    username: "k3sjhrG8bf_JtVATzpMHsd2TAWTuBIxDbJXchEdP7e_4LYMCen7TlZJkxE2PRjrCAAAAAF6G4D90aGFvZ3Vt",
                    urls: "turns:ss-turn2.xirsys.com:443?transport=tcp",
                    credential: "841f7188-7579-11ea-8dfd-12fa47b8f761"
                },
                {
                    username: "k3sjhrG8bf_JtVATzpMHsd2TAWTuBIxDbJXchEdP7e_4LYMCen7TlZJkxE2PRjrCAAAAAF6G4D90aGFvZ3Vt",
                    urls: "turns:ss-turn2.xirsys.com:5349?transport=tcp",
                    credential: "841f7188-7579-11ea-8dfd-12fa47b8f761"
                }
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

