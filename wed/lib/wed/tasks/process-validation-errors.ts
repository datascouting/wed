/**
 * A task that processes the validation errors.
 * @author Louis-Dominique Dubeau
 * @license MPL 2.0
 * @copyright Mangalam Research Center for Buddhist Languages
 */
import {GUIValidationError} from "../gui-validation-error";
import {Task} from "../task-runner";

export interface Controller {
  copyErrorList(): GUIValidationError[];

  processError(error: GUIValidationError): boolean;

  appendItems(items: HTMLElement[]): void;

  appendMarkers(markers: HTMLElement[]): void;
}

function NOT(bool: boolean) {
  return !(bool);
}

/**
 * This task processes the new validation errors that have not been processed
 * yet.
 */
export class ProcessValidationErrors implements Task {
  private errors: GUIValidationError[] = [];

  constructor(private readonly controller: Controller) {
  }

  reset(): void {
    this.errors = this.controller.copyErrorList();
  }

  setErrorClass(hasErrors: boolean): void {
    Promise.resolve('#sb-errors-collapse')
      .then(errorsId => $(errorsId))
      .then(errorsDom => errorsDom.parent())
      .then(errorsDom => {
        return Promise.resolve('no-tei-errors')
          .then(noErrorsClass => (hasErrors)
            ? errorsDom.removeClass(noErrorsClass)
            : errorsDom.addClass(noErrorsClass))
      });
  }

  cycle(): boolean {
    const controller = this.controller;
    const errors = this.errors;
    const hasErrors = (errors.length > 0);

    this.setErrorClass(hasErrors);

    if (NOT(hasErrors)) {
      return false;
    }

    // The figure in the next line is arbitrary.
    let count = Math.min(errors.length, 30);

    const items = [];
    const markers = [];
    let ix = 0;
    while (count !== 0) {
      count--;
      const error = errors[ix];
      if (controller.processError(error)) {
        errors.splice(ix, 1);
        const item = error.item;
        if (item === undefined) {
          throw new Error("there should be an item");
        }

        items.push(item);
        const marker = error.marker;
        // There may be no marker set.
        if (marker != null) {
          markers.push(marker);
        }
      } else {
        ++ix;
      }
    }

    controller.appendItems(items);
    controller.appendMarkers(markers);
    return errors.length !== 0;
  }
}

//  LocalWords:  MPL
