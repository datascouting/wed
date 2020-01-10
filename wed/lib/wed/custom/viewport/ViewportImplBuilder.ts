import {Viewport} from "bootstrap";
import {ViewportImpl} from "wed/custom/viewport/ViewportImpl";

export class ViewportImplBuilder {

  private _padding: number = 0;
  private _selector: string = "body";

  get padding(): number {
    return this._padding;
  }

  setPadding(value: number): ViewportImplBuilder {
    this._padding = value;
    return this;
  }

  get selector(): string {
    return this._selector;
  }

  setSelector(value: string): ViewportImplBuilder {
    this._selector = value;
    return this;
  }

  build(): Viewport {
    return new ViewportImpl(this);
  }
}
