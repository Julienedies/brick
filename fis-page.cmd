::fis server start --type node --port 3000 --root ./ & 
fis release --file fis/page.js --dest local -D  --clean --watch
