const fs = require('fs');
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
];

function artisAsync(callback) {
  const targetDir = "./music";

  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err && err.code !== 'EEXIST') {
      return callback(err);
    }

    let completed = 0;
    const total = music.length;

    music.forEach(song => {
      const artistFolder = path.join(targetDir, song.artist);
      
      fs.mkdir(artistFolder, { recursive: true }, (err) => {
        if (err && err.code !== 'EEXIST') {
          return callback(err);
        }

        const filePath = path.join(artistFolder, song.fileName);
        fs.writeFile(filePath, "", "utf8", (err) => {
          if (err) return callback(err);
          
          console.log(`Created file: ${artistFolder}/${song.fileName}`);
          completed++;
          
          if (completed === total) {
            callback(null);
          }
        });
      });
    });
  });
}

artisAsync((err) => {
  if (err) console.error(err);
  else console.log('All files created!');
});