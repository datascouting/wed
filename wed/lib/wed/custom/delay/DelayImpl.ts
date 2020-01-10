import {Delay} from "bootstrap";
import {DelayImplBuilder} from "wed/custom/delay/DelayImplBuilder";

export class DelayImpl implements Delay {

  hide: number;
  show: number;

  constructor(builder: DelayImplBuilder) {
    this.hide = builder.hide;
    this.show = builder.show;
  }
}
