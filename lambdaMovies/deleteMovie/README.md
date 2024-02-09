run npm install
to create a zip folder for deleteMovie
run the zip command within the deleteMovie directory

 zip -r ../deletemovie.zip ./*

If problems with node_modules then 

 npm cache clean --force
 npm audit fix --force
