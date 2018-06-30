::fis server start --type node --port 3000 --root ./ & 
fis release --file fis/dev.js --dest local cs jhandy gushenwei -D  --clean --watch
