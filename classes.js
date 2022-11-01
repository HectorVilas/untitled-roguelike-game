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
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
};

export class Wall extends Tile {
  constructor(name, url, isBlocking) {
    super(name, url);
    this.isBlocking = isBlocking;
  }
};

export class Ceiling extends Tile {
  constructor(name, url, coverage){
    super(name, url);
    this.coverage = coverage;
  }
};