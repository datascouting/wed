from urlparse import urljoin
import json
import re

import requests

from nose.tools import assert_equal  # pylint: disable=E0611
from behave import step_matcher

from selenic.util import Result, Condition


step_matcher("re")


@when('^the user saves$')
def step_impl(context):
    util = context.util
    util.ctrl_equivalent_x('S')

last_obj_re = re.compile('.*}{')

flip_rend_style_re = re.compile(ur'(style=".*?") (rend=".*?")')
flip_xmlns_re = re.compile(ur'(xmlns:math=".*?") (xmlns=".*?")')

_SCENARIO_TO_EXPECTED_DATA = {
    "serializes namespaces properly":
    u"""\
<TEI xmlns="http://www.tei-c.org/ns/1.0"><teiHeader><fileDesc>\
<titleStmt><title>abcd</title></titleStmt><publicationStmt><p/>\
</publicationStmt><sourceDesc><p/></sourceDesc></fileDesc></teiHeader>\
<text><body><p><hi/>Blah blah <term>blah</term> blah.</p>\
<p><term>blah</term></p><p><ref/></p><p><hi>a</hi><hi>b</hi>c</p>\
<p>abcdefghij</p><p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\
<hi>aaaaaaaa aaaaaaaaaaa</hi>abcd</p><p>abcd abcd abcd abcd abcd abcd \
abcd \
abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd \
abcd \
abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd \
abcd \
abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd abcd \
abcd \
abcd abcd abcd abcd abcd abcd abcd abcd</p>\
<p rend="rend_value" style="style_value">Blah</p><p rend="abc">Blah</p>\
<p part="">Blah</p><div sample=""/><p rend="foo"/><p><monogr>\
This paragraph and its content are designed to test how error markers \
are shown for inline elements that end up spanning multiple lines. \
This paragraph and its content are designed to test how error markers \
are shown for inline elements that end up spanning multiple lines. \
This paragraph and its content are designed to test how error markers \
are shown for inline elements that end up spanning multiple lines.\
</monogr></p></body></text></TEI>""",
    "serializes multiple top namespaces properly": """\
<TEI xmlns="http://www.tei-c.org/ns/1.0" \
xmlns:math="http://www.w3.org/1998/Math/MathML"><teiHeader><fileDesc>\
<titleStmt><title/></titleStmt><publicationStmt><p/></publicationStmt>\
<sourceDesc><p/></sourceDesc></fileDesc></teiHeader><text><body><p>\
<hi/><formula><math:math/></formula></p></body></text></TEI>"""
}


@then('^the data saved is properly serialized$')
def step_impl(context):
    util = context.util

    expected = {
        u'command': u'save',
        u'data': _SCENARIO_TO_EXPECTED_DATA[context.scenario.name]
    }

    def cond(_driver):
        resp = requests.get(urljoin(context.local_server,
                                    "/build/ajax/save.txt"))
        text = resp.text.replace('\n***\n', '').strip()
        text = last_obj_re.sub('{', text)
        actual = json.loads(text)
        # We don't care about the version here.
        del actual["version"]
        if util.ie and u"data" in actual:
            actual[u"data"] =  \
                flip_rend_style_re.sub(ur'\2 \1',
                                       actual[u"data"])
            actual[u"data"] = \
                flip_xmlns_re.sub(ur'\2 \1',
                                  actual[u"data"])
        return Result(actual == expected, [actual, expected])

    result = Condition(util, cond).wait()

    assert_equal.__self__.maxDiff = None
    if not result:
        assert_equal(result.payload[0], result.payload[1])


@then(ur'^the modification status shows the document is unmodified$')
def step_impl(context):
    def check(driver):
        return driver.execute_script("""
        return wed_editor._$modification_status.hasClass("label-success");
        """)

    context.util.wait(check)
