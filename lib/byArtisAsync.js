const fs = require('fs').promises;
const path = require('path');

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

async function createArtisFiles() {
  const targetDir = "./music"
  
  try {
    await fs.mkdir(targetDir, { recursive: true })
  } catch (error) {
    throw Error(`Gagal membuat main directory: ${error.message}`)
  }
  
  for (const song of music) {
    const artistFolder = path.join(targetDir, song.artist)
    
    try {
      await fs.mkdir(artistFolder, { recursive: true })
    } catch (error) {
      throw Error(`Gagal membuat folder artis untuk ${song.artist}: ${error.message}`)
    }
    
    try {
      const filePath = path.join(artistFolder, song.fileName)
      await fs.writeFile(filePath, "", "utf8")
      console.log(`Bikin file: ${artistFolder}/${song.fileName}`)
    } catch (error) {
      throw Error(`Bikin file gagal ${song.fileName}: ${error.message}`)
    }
  }
  
  console.log('Semua file berhasil di buat')
}

async function artisAsync() {
  try {
    await createArtisFiles()
  } catch (error) {
    console.error('Error occurred:', error.message)
    process.exit(1)
  }
}

artisAsync()