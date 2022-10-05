let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener('click', () =>{
 if(pagina < 1000){
    pagina += 1;
    cargarPelicula();
 }
})

btnAnterior.addEventListener('click', () =>{
    if(pagina > 1){
       pagina -= 1;
       cargarPelicula();
    }
   })



const cargarPelicula = async() => {
 try {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d0019168bf23f910ac2d3685875cd063&language=es-ES&page=${pagina}`)
    
    console.log(resp)

    if(resp.status === 200){
        const datos = await resp.json();

        let peliculas = '';
        datos.results.forEach(pelicula => {
          peliculas += `
          <div class='pelicula'>
               <img class='poster' src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'>pelis Dany
          
          
          <h3 class='titulo'>${pelicula.title}</h3> 
          </div>
          `;
        } );
    
        document.getElementById('contenedor').innerHTML = peliculas;


    
    }else if(resp.status === 401){
        console.log('pusiste la llave mal')
    }else if(resp.status === 404){
        console.log('la pelicula que busca no existe')
    }else{
        console.log('no se puede saber que paso')
    }


 } catch (error) {
    console.log(error);
 }

};

cargarPelicula();