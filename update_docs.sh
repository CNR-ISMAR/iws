git pull
cd docs
#activate virtualenv
workon iws
rm -rf _build/en/html/ 
make html
rsync -avz _build/en/html/ ../volumes/statics/static/docs/html/
make latexpdf
cp _build/en/latex/*.pdf ../volumes/statics/static/docs/pdf/
