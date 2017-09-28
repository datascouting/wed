/**
 * @author Louis-Dominique Dubeau
 * @license MPL 2.0
 * @copyright Mangalam Research Center for Buddhist Languages
 */
import { expect } from "chai";
import * as mergeOptions from "merge-options";
import * as sinon from "sinon";

import { CaretManager } from "wed/caret-manager";
import { isElement } from "wed/domtypeguards";
import * as onerror from "wed/onerror";
import * as wed from "wed/wed";

import * as globalConfig from "../base-config";
import { DataProvider, makeWedRoot, setupServer } from "../util";
import { firstGUI, getAttributeNamesFor } from "../wed-test-util";

const options = {
  schema: "/base/build/schemas/tei-simplified-rng.js",
  mode: {
    path: "wed/modes/test/test-mode",
    options: {
      metadata: "/base/build/schemas/tei-metadata.json",
    },
  },
};

const assert = chai.assert;

describe("wed decoration:", () => {
  let source: string;
  let editor: wed.Editor;
  let caretManager: CaretManager;
  let topSandbox: sinon.SinonSandbox;
  let wedroot: HTMLElement;
  let ps: NodeListOf<Element>;
  let guiRoot: Element;
  let titles: NodeListOf<Element>;

  before(async () => {
    const provider =
      new DataProvider("/base/build/standalone/lib/tests/wed_test_data/");
    source = await provider.getText("source_converted.xml");
  });

  before(() => {
    topSandbox = sinon.sandbox.create({
      useFakeServer: true,
    });
    setupServer(topSandbox.server);

    wedroot = makeWedRoot(document);
    document.body.appendChild(wedroot);
    editor = new wed.Editor(wedroot,
                            mergeOptions(globalConfig.config, options));
    return editor.init(source)
      .then(() => {
        // tslint:disable-next-line:no-any
        (editor.validator as any)._validateUpTo(editor.dataRoot, -1);
        caretManager = editor.caretManager;
        guiRoot = editor.guiRoot;
        ps = guiRoot.querySelectorAll(".body .p");
        titles = guiRoot.getElementsByClassName("title");
      });
  });

  beforeEach(() => {
    editor.undoAll();
    editor.resetLabelVisibilityLevel();
  });

  afterEach(() => {
    assert.isFalse(onerror.is_terminating(),
                   "test caused an unhandled exception to occur");
    // We don't reload our page so we need to do this.
    onerror.__test.reset();
    editor.editingMenuManager.dismiss();
  });

  after(() => {
    if (editor !== undefined) {
      editor.destroy();
    }

    // We read the state, reset, and do the assertion later so that if the
    // assertion fails, we still have our reset.
    const wasTerminating = onerror.is_terminating();

    // We don't reload our page so we need to do this.
    onerror.__test.reset();
    expect(wasTerminating)
      .to.equal(false, "test caused an unhandled exception to occur");

    // tslint:disable-next-line:no-any
    (editor as any) = undefined;
    // tslint:disable-next-line:no-any
    (caretManager as any) = undefined;
    // tslint:disable-next-line:no-any

    if (topSandbox !== undefined) {
      topSandbox.restore();
    }
    document.body.removeChild(wedroot);
  });

  it("element becoming empty acquires a placeholder", () => {
    // Text node inside title.
    const initial = editor.dataRoot.getElementsByTagName("title")[0];

    // Make sure we are looking at the right thing.
    assert.equal(initial.childNodes.length, 1);
    assert.equal(initial.firstChild!.textContent, "abcd");
    caretManager.setCaret(initial, 0);
    const caret = caretManager.getNormalizedCaret()!;
    assert.equal(caret.node.childNodes[caret.offset].nodeValue, "abcd");

    // Delete all contents.
    editor.dataUpdater.removeNode(initial.firstChild);

    // We should have a placeholder now, between the two labels.
    assert.equal(caret.node.childNodes.length, 3);
    assert.isTrue((caret.node.childNodes[1] as Element).classList.contains(
      "_placeholder"));
  });

  it("element getting filled is properly decorated", () => {
    const initial = editor.guiRoot.querySelector(".publicationStmt>.p")!;
    const initialData = editor.toDataNode(initial)!;

    // Make sure we are looking at the right thing.
    assert.equal(initialData.childNodes.length, 0);
    caretManager.setCaret(initialData, 0);
    editor.type("a");
    assert.equal(initialData.childNodes.length, 1);
    // Check the contents of the GUI tree to make sure it has a start, end
    // labels and one text node.
    assert.equal(initial.childNodes.length, 3);
    assert.isTrue(isElement(initial.firstChild) &&
                  initial.firstChild.matches("._p_label.__start_label"),
                  "should have a start label");
    assert.equal(initial.childNodes[1].nodeType, Node.TEXT_NODE);
    assert.isTrue(isElement(initial.lastChild) &&
                  initial.lastChild.matches("._p_label.__end_label"),
                  "should have an end label");
  });

  function isVisible(el: HTMLElement): boolean {
    return (el.offsetWidth !== 0 ||
            el.offsetHeight !== 0 ||
            el.getClientRects().length !== 0);
  }

  describe("autohidden attributes", () => {
    it("are hidden when the caret is not in the element", () => {
      const div = editor.guiRoot.querySelectorAll(".body .div")[1];
      for (const name of Array.from(getAttributeNamesFor(div))) {
        const text = name.textContent;
        const autohidden = name.closest("._shown_when_caret_in_label") !== null;
        if (text === "type" || text === "subtype") {
          assert.isFalse(autohidden);
          assert.isTrue(isVisible(name as HTMLElement), "should be visible");
        }
        else {
          assert.isTrue(autohidden);
          assert.isFalse(isVisible(name as HTMLElement), "should be hidden");
        }
      }
    });

    it("are shown when the caret is in the element", () => {
      const div = editor.guiRoot.querySelectorAll(".body .div")[1];
      const label = firstGUI(div);
      caretManager.setCaret(label, 0);
      for (const name of Array.from(getAttributeNamesFor(div))) {
        const text = name.textContent;
        const autohidden = name.closest("._shown_when_caret_in_label") !== null;
        assert.isTrue(isVisible(name as HTMLElement),
                      `${text} should be visible`);
        if (text === "type" || text === "subtype") {
          assert.isFalse(autohidden);
        }
        else {
          assert.isTrue(autohidden);
        }
      }
    });
  });
});
