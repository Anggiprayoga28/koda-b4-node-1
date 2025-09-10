const fs = require('fs')
const path = require('path')

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

function createMusicFilesFlat(callback) {
  const targetDir = "./music"

  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err && err.code !== 'EEXIST') {
      return callback(err)
    }

    let completed = 0
    let hasError = false
    const total = music.length

    music.forEach(song => {
      const filePath = path.join(targetDir, song.fileName)
      
      fs.writeFile(filePath, "", "utf8", (err) => {
        if (err && !hasError) {
          hasError = true
          return callback(err)
        }
        
        if (!hasError) {
          console.log(`Created file: ${song.fileName}`)
          completed++
          
          if (completed === total) {
            callback(null)
          }
        }
      })
    })
  })
}

function createMusicFilesByArtist(callback) {
  const targetDir = "./music"

  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err && err.code !== 'EEXIST') {
      return callback(err)
    }

    let completed = 0
    let hasError = false
    const total = music.length

    music.forEach(song => {
      const artistFolder = path.join(targetDir, song.artist)
      
      fs.mkdir(artistFolder, { recursive: true }, (err) => {
        if (err && err.code !== 'EEXIST' && !hasError) {
          hasError = true
          return callback(err)
        }

        const filePath = path.join(artistFolder, song.fileName)
        fs.writeFile(filePath, "", "utf8", (err) => {
          if (err && !hasError) {
            hasError = true
            return callback(err)
          }
          
          if (!hasError) {
            console.log(`Created file: ${song.artist}/${song.fileName}`)
            completed++
            
            if (completed === total) {
              callback(null)
            }
          }
        })
      })
    })
  })
}

function createMusicFilesPromise() {
  const targetDir = "./music"
  
  return new Promise((resolve, reject) => {
    fs.mkdir(targetDir, { recursive: true }, (err) => {
      if (err && err.code !== 'EEXIST') {
        return reject(err)
      }

      const promises = music.map(song => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(targetDir, song.fileName)
          fs.writeFile(filePath, "", "utf8", (err) => {
            if (err) return reject(err)
            console.log(`Created file: ${song.fileName}`)
            resolve()
          })
        })
      })

      Promise.all(promises)
        .then(() => resolve())
        .catch(reject)
    })
  })
}

const { promisify } = require('util')
const mkdirAsync = promisify(fs.mkdir)
const writeFileAsync = promisify(fs.writeFile)

async function createMusicFilesAsync() {
  const targetDir = "./music"
  
  try {
    await mkdirAsync(targetDir, { recursive: true })
    
    await Promise.all(
      music.map(async (song) => {
        const filePath = path.join(targetDir, song.fileName)
        await writeFileAsync(filePath, "", "utf8")
        console.log(`Created file: ${song.fileName}`)
      })
    )
    
    console.log('Semua file telah di buat')
  } catch (error) {
    console.error('Error creating files:', error)
  }
}


createMusicFilesFlat((err) => {
  if (err) console.error('Error:', err)
  else console.log('Semua file telah di buat')
})
