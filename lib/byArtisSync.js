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

function moveMusic() {
  const targetDir = "./music";

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  music.forEach(song => {
    const artistFolder = path.join(targetDir, song.artist);

    if (!fs.existsSync(artistFolder)) {
      fs.mkdirSync(artistFolder);
      console.log(`Created folder: ${song.artist}`);
    }

    const filePath = path.join(artistFolder, song.fileName);

    fs.writeFileSync(filePath, "", "utf8");
    console.log(`Created file: ${artistFolder}/${song.fileName}`);
  });
}


moveMusic();