import {DelayImpl} from "wed/custom/delay/DelayImpl";
import {Delay} from "bootstrap";

export class DelayImplBuilder {

  private _show: number = 0;

  get show(): number {
    return this._show;
  }

  private _hide: number = 0;

  get hide(): number {
    return this._hide;
  }

  setShow(value: number): DelayImplBuilder {
    this._show = value;
    return this;
  }

  setHide(value: number): DelayImplBuilder {
    this._hide = value;
    return this;
  }

  build(): Delay {
    return new DelayImpl(this);
  }
}
