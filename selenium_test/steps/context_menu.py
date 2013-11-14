from selenium.webdriver.common.action_chains import ActionChains
import selenium.webdriver.support.expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import selenic.util

from nose.tools import assert_equal, assert_true, \
    assert_not_equal  # pylint: disable=E0611

import wedutil

step_matcher("re")


class Trigger(object):
    util = None
    el = None
    _location = None
    _size = None

    def __init__(self, util=None, element=None, location=None, size=None):
        """
        A target can be associated with an actual element. In this
        case, the constructor should be called with ``util`` and
        ``element`` set. Or a target can be just a set of coordinates
        and dimensions. In this case, the constructor should be called
        with ``location`` and ``size`` set. (Other combinations have
        undefined behavior: garbage in, garbage out.) Note that in the
        former case, the location and dimensions of the target may
        change when the element moves or is resized, in latter case,
        the location and dimensions are constant. (This is important
        if testing cases where the screen has been scrolled after the
        target was created).

         :param util: Selenic's util object.
        :param element: The element to which this trigger corresponds.
        :type element: :class:`selenium.webdriver.remote.webelement.WebElement`
        :param location: The location of the trigger.
        :type location: :class:`dict` of the format ``{'left': x
                        corrdinate, 'top': y coordinate}``
        :param size: The size of the trigger.
        :type size: :class:`dict` of the format ``{'width': width of
                    the target, 'height': height of the target}``

        """
        if element:
            self.util = util
            self.el = element
        else:
            self._location = location
            self._size = size

    @property
    def location(self):
        if self._location:
            return self._location
        else:
            return self.util.element_screen_position(self.el)

    @property
    def size(self):
        if self._size:
            return self._size
        else:
            return self.el.size


@Given("that a context menu is open")
def context_menu_is_open(context):
    context.execute_steps(u"""
    When the user uses the mouse to bring up the context menu on text
    Then a context menu appears
    """)


@When("the user uses the mouse to bring up the context menu on a placeholder")
def on_placeholder(context):
    driver = context.driver
    util = context.util

    placeholder = util.find_element((By.CLASS_NAME, "_placeholder"))
    assert_true(util.visible_to_user(placeholder),
                "must be visible to the user; otherwise this step "
                "is not something the user can do")
    ActionChains(driver) \
        .context_click(placeholder) \
        .perform()
    context.context_menu_trigger = Trigger(util, placeholder)
    context.context_menu_for = placeholder


@When("^the user (?:uses the mouse to bring|brings) up the context "
      "menu on the start label of the top element$")
def context_menu_on_start_label_of_top_element(context):
    driver = context.driver
    util = context.util

    button = util.find_element((By.CLASS_NAME, "_start_button"))
    ActionChains(driver)\
        .context_click(button)\
        .perform()
    context.context_menu_trigger = Trigger(util, button)
    context.context_menu_for = button.find_element_by_xpath("..")


@When("^the user (?:uses the mouse to bring|brings) up the context "
      "menu on the start label of an element$")
def context_menu_on_start_label_of_element(context):
    # We use the first paragraph for this one.
    driver = context.driver
    util = context.util

    button = util.find_element((By.CSS_SELECTOR, "._start_button._p_label"))
    ActionChains(driver)\
        .context_click(button)\
        .perform()
    context.context_menu_trigger = Trigger(util, button)
    context.context_menu_for = button.find_element_by_xpath("..")


@When("^the user brings up the context menu on the end titleStmt label$")
def context_menu_on_start_label_of_element(context):
    # We use the first paragraph for this one.
    driver = context.driver
    util = context.util

    button = util.find_element((By.CSS_SELECTOR,
                                "._end_button._titleStmt_label"))
    ActionChains(driver)\
        .context_click(button)\
        .perform()
    context.context_menu_trigger = Trigger(util, button)
    context.context_menu_for = button.find_element_by_xpath("..")


@given(u'^that the user has brought up the context menu over the '
       u'(?P<which>start|end) label of an element$')
def step_impl(context, which):
    context.execute_steps(u"""
    When the user brings up the context menu on the {0} label of an element
    Then a context menu is visible close to where the user invoked it
    """.format(which))


@When("^the user uses the mouse to bring up the context menu on the start "
      "label of another element$")
def context_menu_on_start_label_of_element(context):
    # We use the first title for this one.
    driver = context.driver
    util = context.util

    clicked = context.clicked_element
    button = util.find_element((By.CSS_SELECTOR,
                                "._start_button._title_label"))

    assert_not_equal(clicked, button)
    ActionChains(driver)\
        .context_click(button)\
        .perform()
    context.context_menu_trigger = Trigger(util, button)
    context.context_menu_for = button.find_element_by_xpath("..")


@When("^the user uses the mouse to bring up the context menu on the end label "
      "of the top element$")
def context_menu_on_end_label_of_top_element(context):
    driver = context.driver
    util = context.util

    button = util.find_elements((By.CLASS_NAME, "_end_button"))[-1]
    driver.execute_script("""
    arguments[0].scrollIntoView();
    """, button)
    ActionChains(driver)\
        .context_click(button)\
        .perform()
    context.context_menu_trigger = Trigger(util, button)
    context.context_menu_for = button.find_element_by_xpath("..")


@When("^the user (?:uses the mouse to bring|brings) up the context menu on "
      "the end label of an element$")
def context_menu_on_end_label_of_element(context):
    driver = context.driver
    util = context.util

    button = util.find_element((By.CSS_SELECTOR, "._end_button._p_label"))
    ActionChains(driver)\
        .context_click(button)\
        .perform()
    context.context_menu_trigger = Trigger(util, button)
    context.context_menu_for = button.find_element_by_xpath("..")


@When("the user uses the mouse to bring up the context menu on text")
def context_menu_on_text(context):
    driver = context.driver
    util = context.util

    element = util.find_element((By.CLASS_NAME, "title"))
    ActionChains(driver)\
        .move_to_element(element)\
        .context_click()\
        .perform()
    context.context_menu_trigger = Trigger(util, element)
    context.context_menu_for = None


@Given("that the user has brought up the context menu on uneditable text")
def context_menu_on_uneditable_text(context):
    driver = context.driver
    util = context.util

    element = util.find_element((By.CSS_SELECTOR, ".ref>._phantom"))
    ActionChains(driver)\
        .move_to_element(element)\
        .context_click()\
        .perform()

    context.context_menu_trigger = Trigger(util, element)
    context.context_menu_for = element.find_element_by_xpath("..")

    context.execute_steps(u"""
    Then a context menu is visible close to where the user invoked it
    """)


@When("the user uses the mouse to bring up a context menu outside wed")
def context_menu_outside_wed(context):
    driver = context.driver

    # Getting a browser context menu is problematic because there is
    # no cross browser way to dismiss it. So prevent it from comming
    # up but record the event.
    driver.execute_script("""
    var $ = jQuery;
    delete window.__selenic_contextmenu;
    $("body").on("contextmenu.selenium.testing", function () {
       window.__selenic_contextmenu = true;
       return false;
    });
    """)

    # By the time we get here "body" is sure to be present.
    body = driver.find_element_by_tag_name("body")
    ActionChains(driver)\
        .move_to_element_with_offset(body, 0, 0)\
        .context_click()\
        .perform()

    # Check that we did intercept the event.
    assert_true(driver.execute_script("""
    return window.__selenic_contextmenu;
    """))


@When("the user clicks outside the context menu")
def user_clicks_outside_context_menu(context):
    driver = context.driver
    util = context.util

    title = util.find_element((By.CLASS_NAME, "title"))
    # This simulates a user whose hand is not completely steady.
    ActionChains(driver)\
        .move_to_element(title)\
        .move_by_offset(-10, 0)\
        .click_and_hold()\
        .move_by_offset(-1, 0)\
        .release()\
        .perform()


@Then("a context menu appears")
def context_menu_appears(context):
    util = context.util

    util.find_element((By.CLASS_NAME, "wed-context-menu"))


@Then(r'^the context menu contains choices for (?P<kind>.*?)(?:\.|$)')
def context_choices_insert(context, kind):
    util = context.util

    cm = util.find_element((By.CLASS_NAME, "wed-context-menu"))

    search_for = None
    if kind == "inserting new elements":
        search_for = "^Create new [^ ]+$"
    elif kind == "creating elements before the selected element":
        search_for = "^Create new .+? before"
    elif kind == "creating elements after the selected element":
        search_for = "^Create new .+? after"
    elif kind == "wrapping text in new elements":
        search_for = "^Wrap in "
    else:
        raise ValueError("can't search for choices of this kind: " + kind)

    assert_not_equal(len(util.find_descendants_by_text_re(cm, search_for)),
                     0, "Number of elements found")


@Given("a context menu is not visible")
@Then("a context menu is not visible")
def context_menu_is_not_visible(context):
    wedutil.wait_until_a_context_menu_is_not_visible(context.util)


@Then("a context menu is visible close to where the user invoked it")
def step_impl(context):
    util = context.util

    menu = util.find_element((By.CLASS_NAME, "wed-context-menu"))
    # The click was in the middle of the trigger.
    trigger = context.context_menu_trigger
    target = trigger.location
    target["left"] += trigger.size["width"] / 2
    target["top"] += trigger.size["height"] / 2
    assert_equal(selenic.util.locations_within(
        util.element_screen_position(menu), target, 10), '')


@Then("a context menu is visible and completely inside the window")
def step_impl(context):
    util = context.util

    # Yep, we must use the dropdown-menu for this.
    menu = util.find_element((By.CSS_SELECTOR,
                              ".wed-context-menu>.dropdown-menu"))
    assert_true(util.completely_visible_to_user(menu),
                "menu is completely visible")


@When(ur"the user uses the keyboard to bring up the context menu on "
      ur"(?P<choice>a placeholder|text)")
def step_impl(context, choice):
    driver = context.driver
    util = context.util

    class_name = None
    if choice == "a placeholder":
        class_name = "_placeholder"
    elif choice == "text":
        class_name = "title"
    else:
        raise ValueError("unknown choice: " + choice)

    where = util.find_element((By.CLASS_NAME, class_name))

    # IF YOU CHANGE THIS, CHANGE THE TRIGGER
    ActionChains(driver)\
        .click(where) \
        .perform()

    ActionChains(driver) \
        .key_down(Keys.CONTROL) \
        .send_keys("/") \
        .key_up(Keys.CONTROL) \
        .perform()

    # THIS TRIGGER WORKS ONLY BECAUSE OF .click(where) above.
    context.context_menu_trigger = Trigger(util, where)
    context.context_menu_for = where if choice == "a placeholder" else None


@When(ur"^the user uses the keyboard to bring up the context menu$")
def step_impl(context):
    driver = context.driver

    ActionChains(driver) \
        .key_down(Keys.CONTROL) \
        .send_keys("/") \
        .key_up(Keys.CONTROL) \
        .perform()


@when(u'the user brings up the context menu on the selection')
def step_impl(context):
    driver = context.driver

    pos = wedutil.point_in_selection(driver)

    # Selenium does not like floats.
    trigger = Trigger(location={"left": int(pos["x"]), "top": int(pos["y"])},
                      size={'width': 0, 'height': 0})

    ActionChains(driver) \
        .move_to_element_with_offset(context.origin_object, pos["x"],
                                     pos["y"]) \
        .context_click() \
        .perform()

    context.context_menu_trigger = trigger
    context.context_menu_for = None


@given(u'^that the user has brought up the context menu over a selection$')
def step_impl(context):
    context.execute_steps(u"""
    When the user selects text
    And the user brings up the context menu on the selection
    Then a context menu is visible close to where the user invoked it
    And the context menu contains choices for wrapping text in new elements.
    """)


@when(u'^the user clicks (?P<choice>the first context menu option|a choice '
      u'for wrapping text in new elements|'
      u'a choice for creating an element (?:before|after) the selected '
      u'element)$')
def step_impl(context, choice):
    util = context.util

    cm = util.find_element((By.CLASS_NAME, "wed-context-menu"))

    # The following branches also normalize ``choice`` to shorter values
    if choice == "the first context menu option":
        choice = "first"
        link = util.wait(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, ".wed-context-menu li>a")))
    elif choice == "a choice for wrapping text in new elements":
        choice = "wrap"
        link = util.wait(EC.element_to_be_clickable((By.PARTIAL_LINK_TEXT,
                                                     "Wrap in ")))
    elif (choice ==
          "a choice for creating an element before the selected element"):
        choice = "before"
        link = util.find_descendants_by_text_re(cm,
                                                "^Create new .+? before")[0]
        if link.tag_name != "a":
            link = link.find_elements_by_xpath("descendant::a")[0]

        def cond(*_):
            return link.is_displayed()
        util.wait(cond)
    elif (choice ==
          "a choice for creating an element after the selected element"):
        choice = "after"
        link = util.find_descendants_by_text_re(cm,
                                                "^Create new .+? after")[0]
        if link.tag_name != "a":
            link = link.find_elements_by_xpath("a")[0]

        def cond(*_):
            return link.is_displayed()
        util.wait(cond)
    else:
        raise ValueError("can't handle this type of choice: " + choice)

    # Record some information likely to be useful later.
    for_element = context.context_menu_for
    if for_element:
        if choice in ("before", "after"):
            info = {}
            context.context_menu_pre_transformation_info = info
            info["preceding"] = for_element.find_elements_by_xpath(
                "preceding-sibling::*")
            info["following"] = for_element.find_elements_by_xpath(
                "following-sibling::*")
    context.clicked_context_menu_item = \
        util.get_text_excluding_children(link).strip()
    link.click()


@When(ur"the user clicks on a placeholder that will serve to bring up "
      ur"a context menu")
def step_impl(context):
    driver = context.driver
    util = context.util

    where = util.find_element((By.CLASS_NAME, "_placeholder"))

    ActionChains(driver)\
        .click(where) \
        .perform()

    context.context_menu_trigger = Trigger(util, where)
    context.context_menu_for = where
