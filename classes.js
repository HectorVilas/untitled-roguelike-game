export class Player {
  constructor(name, pos) {
    this.name = name;
    this.pos = pos;
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