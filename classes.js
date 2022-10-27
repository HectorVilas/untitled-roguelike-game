export class Player {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  get x(){ return this._x };
  get y(){ return this._y };
  set x(val){ this._x = parseInt(val) };
  set y(val){ this._y = parseInt(val) };
  get loc(){ return {x: this.x, y: this.y} };
}