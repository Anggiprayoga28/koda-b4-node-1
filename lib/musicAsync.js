const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const mkdirAsync = promisify(fs.mkdir)
const writeFileAsync = promisify(fs.writeFile)

const music = [
  { title: "Dear God", artist: "Avenged Sevenfold", fileName: "Dear_god.mp3" },
  { title: "Gunslinger", artist: "Avenged Sevenfold", fileName: "gunslinger.mp3" },
  { title: "Nightmare", artist: "Avenged Sevenfold", fileName: "nightmare.mp3" },
  { title: "So Far Away", artist: "Avenged Sevenfold", fileName: "so_far_away.mp3" },
  { title: "Rap God", artist: "Eminem", fileName: "rap_god.mp3" },
  { title: "Venom", artist: "Eminem", fileName: "venom.mp3" },
  { title: "Without Me", artist: "Eminem", fileName: "without_me.mp3" },
  { title: "My Generation", artist: "Limp Bizkit", fileName: "my_generation.mp3" },
  { title: "My Way", artist: "Limp Bizkit", fileName: "my_way.mp3" },
  { title: "Imagination", artist: "Shawn Mendes", fileName: "imagination.mp3" }
]

async function createMusicFiles() {
  try {
    await mkdirAsync('./music', { recursive: true })
    console.log('Folder music dibuat')
    
    for (const song of music) {
      const filePath = path.join('./music', song.fileName)
      await writeFileAsync(filePath, '', 'utf8')
      console.log(`File dibuat: ${song.fileName}`)
    }
    
    console.log('Semua file berhasil dibuat')
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

createMusicFiles()