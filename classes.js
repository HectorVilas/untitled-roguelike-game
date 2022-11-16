export class Player {
  constructor(name, pos, url) {
    this.name = name;
    this.pos = pos;
    this.url = url;
  }

  get pos(){ return this._pos };
  set pos(val){ this._pos = val };
};

export class Tile {
  constructor(name, url, colRow) {
    this.name = name;
    this.url = url;
    this.colRow = colRow;
  }
};

export class Floor extends Tile {
  constructor(name, url, colRow){
    super(name, url, colRow)
  }
};

export class Wall extends Tile {
  constructor(name, url, colRow, isBlocking) {
    super(name, url, colRow);
    this.isBlocking = isBlocking;
  }
};

export class Ceiling extends Tile {
  constructor(name, url, colRow, coverage){
    super(name, url, colRow);
    this.coverage = coverage;
  }
};

export class Entity extends Tile {
  constructor(name, url, colRow, isBlocking, hasOverlay){
    super(name, url, colRow);
    this.isBlocking = isBlocking;
    this.hasOverlay = hasOverlay;
  }
};