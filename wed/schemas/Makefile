# Local makefile for when once in a while we need to regenerate these
# schemas.

.SECONDEXPANSION:
all: tei-simplified-rng.js simplified-rng.js tei-math-rng.js docbook.js ecarle6-rng.js

tei-simplified-rng.js: myTEI.rng
simplified-rng.js: simple.rng
tei-math-rng.js: tei-math.rng
docbook.js: docbook.rng
ecarle6-rng.js: ecarle6.rng

%.js:
	../node_modules/.bin/salve-convert --allow-incomplete-types=1 $< $@
