/* tslint:disable:max-line-length completed-docs missing-jsdoc */
import {
  Delay,
  Placement,
  TooltipInstance,
  TooltipOptions,
  Trigger,
  Viewport
} from "bootstrap";
import {TooltipOptionsImpl} from "wed/custom/tooltipOptions/TooltipOptionsImpl";
import {ViewportImplBuilder} from "wed/custom/viewport/ViewportImplBuilder";

export class TooltipOptionsImplBuilder {

  /**
   * Apply a CSS fade transition to the tooltip or popover.
   *
   * @default true
   */
  private _animation: boolean = true;

  get animation(): boolean {
    return this._animation;
  }

  /**
   * Appends the tooltip or popover to a specific element. Example: `container: 'body'`.
   * This option is particularly useful in that it allows you to position the tooltip or popover
   * in the flow of the document near the triggering element - which will prevent
   * it from floating away from the triggering element during a window resize.
   *
   * @default false
   */
  private _container: string | false = false;

  get container(): string | false {
    return this._container;
  }

  /**
   * Delay showing and hiding the tooltip or popover (ms) - does not apply to manual trigger type.
   * If a number is supplied, delay is applied to both hide/show.
   * Object structure is: `delay: { "show": 500, "hide": 100 }`.
   *
   * @default 0
   */
  private _delay: number | Delay = 0;

  get delay(): number | Delay {
    return this._delay;
  }

  /**
   * Insert HTML into the tooltip or popover. If false, jQuery's text method will be used to insert content into the DOM.
   * Use text if you're worried about XSS attacks.
   *
   * @default false
   */
  private _html: boolean = false;

  get html(): boolean {
    return this._html;
  }

  /**
   * How to position the tooltip or popover - top | bottom | left | right | auto.
   * When "auto" is specified, it will dynamically reorient the tooltip or popover.
   * For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.
   *
   * When a function is used to determine the placement, it is called with
   * the tooltip or popover DOM node as its first argument and the triggering element DOM node as its second.
   * The `this` context is setto the tooltip or popover instance.
   *
   * @default tooltip: "top", popover: "right"
   */
  private _placement: Placement | ((this: TooltipInstance<TooltipOptions>, tooltip: HTMLElement, trigger: Element) => Placement) = "top";

  get placement(): "auto" | "top" | "bottom" | "left" | "right" | ((this: TooltipInstance<TooltipOptions>, tooltip: HTMLElement, trigger: Element) => Placement) {
    return this._placement;
  }

  /**
   * If a selector is provided, tooltip or popover objects will be delegated to the specified targets.
   * In practice, this is used to enable dynamic HTML content to have popovers added.
   *
   * @default false
   */
  private _selector: string = "false";

  get selector(): string {
    return this._selector;
  }

  /**
   * Base HTML to use when creating the tooltip or popover.
   * The tooltip's (resp., popover's) title will be injected into the `.tooltip-inner` (resp., `.popover-title`).
   * The popover's content will be injected into the `.popover-content`.
   * The `.tooltip-arrow` (resp., `.arrow`) will become the tooltip's (resp., popover's) arrow.
   * The outermost wrapper element should have the `.tooltip` (resp., `.popover`) class.
   *
   * @default '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
   * @default '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
   */
  private _template: string = "<div class=\"tooltip\" role=\"tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>";

  get template(): string {
    return this._template;
  }

  /**
   * Default title value if title attribute isn't present.
   * If a function is given, it will be called with its `this` reference setto the element
   * that the tooltip or popover is attached to.
   *
   * @default ""
   */
  private _title: string | ((this: Element) => string) = "";

  get title(): string | ((this: Element) => string) {
    return this._title;
  }

  /**
   * How tooltip or popover is triggered - click | hover | focus | manual. You may pass multiple triggers; separate them with a space.
   * "manual" cannot be combined with any other trigger.
   *
   * @default tooltip: "hover focus", popover: "click"
   */
  private _trigger: Trigger = "hover focus";

  get trigger(): "click" | "hover" | "focus" | "manual" | "click hover" | "click focus" | "hover focus" | "click hover focus" {
    return this._trigger;
  }

  /**
   * Keeps the tooltip within the bounds of this element. Example: viewport: `#viewport` or `{"selector": "#viewport", "padding": 0}`.
   * If a function is given in the object, it is called with the triggering element DOM node as its only argument.
   * The `this` context is setto the tooltip instance.
   *
   * @default {selector: 'body', padding: 0}
   */
  private _viewport: string | Viewport = new ViewportImplBuilder()
    .setSelector("body")
    .setPadding(0)
    .build();

  get viewport(): string | Viewport {
    return this._viewport;
  }

  /**
   * Enable or disable the sanitization. If activated 'template', 'content' and 'title' options will be sanitized.
   *
   * @default true
   */
  private _sanitize: boolean = true;

  get sanitize(): boolean {
    return this._sanitize;
  }

  /**
   * Object which contains allowed attributes and tags.
   */
  private _whiteList: { [key: string]: string[] } = {};

  get whiteList(): { [p: string]: string[] } {
    return this._whiteList;
  }

  /**
   * Here you can supply your own sanitize function. This can be useful if you prefer to use a dedicated library to perform sanitization.
   *
   * @default null
   */
  private _sanitizeFn: null | ((input: string) => string) = null;

  get sanitizeFn(): ((input: string) => string) | null {
    return this._sanitizeFn;
  }

  setAnimation(value: boolean): TooltipOptionsImplBuilder {
    this._animation = value;
    return this;
  }

  setContainer(value: string | false): TooltipOptionsImplBuilder {
    this._container = value;
    return this;
  }

  setDelay(value: number | Delay): TooltipOptionsImplBuilder {
    this._delay = value;
    return this;
  }

  setHtml(value: boolean): TooltipOptionsImplBuilder {
    this._html = value;
    return this;
  }

  setPlacement(value: "auto" | "top" | "bottom" | "left" | "right" | ((this: TooltipInstance<TooltipOptions>, tooltip: HTMLElement, trigger: Element) => Placement)): TooltipOptionsImplBuilder {
    this._placement = value;
    return this;
  }

  setSelector(value: string): TooltipOptionsImplBuilder {
    this._selector = value;
    return this;
  }

  setTemplate(value: string): TooltipOptionsImplBuilder {
    this._template = value;
    return this;
  }

  setTitle(value: string | ((this: Element) => string)): TooltipOptionsImplBuilder {
    this._title = value;
    return this;
  }

  setTrigger(value: "click" | "hover" | "focus" | "manual" | "click hover" | "click focus" | "hover focus" | "click hover focus"): TooltipOptionsImplBuilder {
    this._trigger = value;
    return this;
  }

  setViewport(value: string | Viewport): TooltipOptionsImplBuilder {
    this._viewport = value;
    return this;
  }

  setSanitize(value: boolean): TooltipOptionsImplBuilder {
    this._sanitize = value;
    return this;
  }

  setWhiteList(value: { [p: string]: string[] }): TooltipOptionsImplBuilder {
    this._whiteList = value;
    return this;
  }

  setSanitizeFn(value: ((input: string) => string) | null): TooltipOptionsImplBuilder {
    this._sanitizeFn = value;
    return this;
  }

  build(): TooltipOptions {
    return new TooltipOptionsImpl(this);
  }
}
