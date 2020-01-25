find out -name '*.html' -exec sed -i -e 's/href="\//href="\/website\//g' {} \;
find out -name '*.html' -exec sed -i -e 's/src="\//src="\/website\//g' {} \;