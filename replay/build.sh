#!/bin/bash

NODEPATH=/usr/local/node/bin/
export PATH=$NODEPATH:$PATH

fe=$(pwd)
output=$fe/../replay-www-fe-compiled

output_public=$output/public

build_env=$1


cd $fe

git checkout -- .
git pull

/usr/local/node/bin/npm install

if [[ $build_env == "fast" ]]; then
    /usr/local/node/bin/npm run build-test
else
    /usr/local/node/bin/npm run build-live
fi

# npm run build-live

test -d $output_public || mkdir -p $output_public
test -d $output/view/playback || mkdir -p $output/view/playback
test -d $output_public/asset/playback || mkdir -p $output_public/asset/playback

mv $fe/public/index.html $output/view/playback/index.html
cp -r $fe/public/* $output_public/asset/playback