export class Player {
  constructor(name, pos) {
    this.name = name;
    this.pos = pos;
  }

  get pos(){ return this._pos };
  set pos(val){ this._pos = val };
}