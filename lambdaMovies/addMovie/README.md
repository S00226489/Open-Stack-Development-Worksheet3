run npm install
to create a zip folder for addMovie
run the zip command within the addMovie directory

 zip -r ../addmovie.zip ./*

If problems with node_modules then 

 npm cache clean --force
 npm audit fix --force
