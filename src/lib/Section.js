import Line from './Line.js'

class Section {
  constructor(song, part, sectionIdx) {
    this.song = song
    this.part = part
    this.sectionIdx = sectionIdx

    this.lineCount = part == 'a' ? 2 : 3
    this.lines = []
    this.barsPerLine = 4
    this.progression = part == 'a' ? this.song.chordProgA : this.song.chordProgB
    this.chordCount = this.progression.length
    this.chordsToBars = this.generateChordsToBars()
  }

  nextLine(lineIdx) {
    if (this.lines[lineIdx + 1]) { return this.lines[lineIdx + 1]}
    if (this.song.nextSection(this.sectionIdx)) {
      return this.song.nextSection(this.sectionIdx).lines[0]
    }
    return null
  }

  generateChordsToBars() {
    // todo make this dynamic
    return this.part == 'a' ? [2, 2, 4] : [3, 3, 3, 3]
  }

  generate() {
    // console.log('generating section', this.part, this.barsPerLine, this.progression, this.chordsToBars)
    Array(this.lineCount).fill(1).map((_, lineIdx) => {
      let line = new Line(this, lineIdx)
      line.generate()
      this.lines.push(line)
    })
  }

  gather() {
    return this.lines.map(function(line) {
      return line.gather()
    })
  }
}

export default Section