/* tslint:disable:completed-docs max-line-length */
// tslint:disable-next-line:max-line-length missing-jsdoc
import {
  Delay,
  Placement,
  TooltipInstance,
  TooltipOptions,
  Trigger,
  Viewport
} from "bootstrap";
import {TooltipOptionsImplBuilder} from "wed/custom/tooltipOptions/TooltipOptionsImplBuilder";

export class TooltipOptionsImpl implements TooltipOptions {

  animation: boolean;
  container: string | false;
  delay: number | Delay;
  html: boolean;
  placement: Placement | ((this: TooltipInstance<TooltipOptions>, tooltip: HTMLElement, trigger: Element) => Placement);
  sanitize: boolean;
  sanitizeFn: ((input: string) => string) | null;
  selector: string;
  template: string;
  title: string | ((this: Element) => string);
  trigger: Trigger;
  viewport: string | Viewport;
  whiteList: { [p: string]: string[] };

  constructor(builder: TooltipOptionsImplBuilder) {
    this.animation = builder.animation;
    this.container = `${builder.container}`;
    this.delay = builder.delay;
    this.html = builder.html;
    this.placement = builder.placement;
    this.sanitize = builder.sanitize;
    this.sanitizeFn = builder.sanitizeFn;
    this.selector = builder.selector;
    this.template = builder.template;
    this.title = builder.title;
    this.trigger = builder.trigger;
    this.viewport = builder.viewport;
    this.whiteList = builder.whiteList;
  }
}
