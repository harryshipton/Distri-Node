const distri = require('../../index.js')

let arr = []

for (let x = 2; x < 10; x++) {
  arr.push(x)
}

const Server = new distri.DistriServer({
  connection: {
    port: 8081
  },

  security: {
    verificationStrength: 1,
    timeout: 5
  },

  work: arr,

  mode: {
    typing: 'static',
    input: {
      type: 'UInt',
      byteLength: 2
    },

    output: {
      type: 'UInt',
      byteLength: 4
    }
  },

  files: {
    'javascript': 'cdn.rawgit.com/Flarp/d75e5676179442516ef9458e5ecc32cb/raw/5d523ebd760d3cf3d1f38ea34751bb55c660bfcc/javascript-collatz.js',
    'node': 'https://gist.githubusercontent.com/Flarp/e08a9dc96dfe19264052c14773f6d0d4/raw/2f629e8409c4022e67b215778c1a98b575b6079d/node-collatz.js'
  }

})

Server.on('workgroup_complete', (i, o, res, rej) => {
  console.log(i, o)
  res()
})

Server.on('all_work_complete', () => {
  console.log('Well, what next?')
  Server.server.close(() => {

  })
})
