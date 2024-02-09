run npm install
to create a zip folder for getMovies
run the zip command within the getMovies directory

 zip -r ../getmovies.zip ./*

If problems with node_modules then 

 npm cache clean --force
 npm audit fix --force
