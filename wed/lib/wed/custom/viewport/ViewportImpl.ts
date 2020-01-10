import {Viewport} from "bootstrap";
import {ViewportImplBuilder} from "wed/custom/viewport/ViewportImplBuilder";

export class ViewportImpl implements Viewport {

  padding: number;
  selector: string;

  constructor(viewportImplBuilder: ViewportImplBuilder) {
    this.padding = viewportImplBuilder.padding;
    this.selector = viewportImplBuilder.selector;
  }
}
