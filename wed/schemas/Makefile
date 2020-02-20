# Local makefile for when once in a while we need to regenerate these
# schemas.

.SECONDEXPANSION:
all: tei-simplified-rng.js tei-math-rng.js

tei-simplified-rng.js: tei_all.rng
tei-math-rng.js: tei-math.rng

%.js:
	../node_modules/.bin/salve-convert --allow-incomplete-types=1 $< $@
