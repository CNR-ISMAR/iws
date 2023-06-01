# TODO: /mnt/volums/statics/ should be a variable

rm -rf /mnt/volumes/statics/static/docs/
mkdir -p /mnt/volumes/statics/static/docs/
mkdir -p /mnt/volumes/statics/static/docs/html/
# mkdir -p /mnt/volumes/statics/static/docs/pdf/

make html
mv _build/en/html/* /mnt/volumes/statics/static/docs/html/

# TODO: add missing packages to run latexpdf
# make latexpdf
# mv _build/en/latex/*.pdf /mnt/volumes/statics/static/docs/pdf/
