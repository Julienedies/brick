#! /bin/bash

cd page/
fis server start --type node --port 3006 --root ../ &&  fis release --file ../fis/dev-page.js --dest local  -D  --watch  -L
