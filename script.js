const key = 'e9fba0c7';
var movieid;
var currentPage = 1;
var starrating;
var totalPages = 100;

//next and prev buttons
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

// making array to store comment and rating and fetching 
var arrayrate=JSON.parse(localStorage.getItem('arrayrate')) || [];
fetch('http://www.omdbapi.com/?i=tt3896198&apikey=e9fba0c7')
    .then(res => res.json())
    .then(data => console.log(data));

    var searchstart = document.getElementById('Input');
    var displaySearchList = document.getElementsByClassName('detailsbox');
    searchstart.addEventListener('input', checkmovies);



//on load function
window.addEventListener('load', () => { 
    if(searchstart.value==""){
       onloadfunc();
        
    }

})

// Display when nothing is searcehd
async function onloadfunc(){
    const url = `https://www.omdbapi.com/?s=${("ave").trim()}&page=${currentPage}&apikey=${key}`
    const res = await fetch(`${url}`);
    const data = await res.json();
   

    if (data.Search) {
        //Calling the function to display list of the movies related to the user search
        displaylist(data.Search)
    }
}

//display when searched

async function checkmovies() {
    
    const url = `https://www.omdbapi.com/?s=${(searchstart.value).trim()}&page=${currentPage}&apikey=${key}`
    const res = await fetch(`${url}`);
    const data = await res.json();
   

    if (data.Search) {
        //Calling the function to display list of the movies related to the user search
        displaylist(data.Search)
    }
}







//Display list on homepage



async function displaylist(movies) {
    var output = '';
    //Traversing over the movies list which is passed as an argument to our function
    for (item of movies) {

        var id = item.imdbID;

        var img = '';
        if (item.Poster != 'N/A') {
            img = item.Poster;
        }
        
        

        
        output += `

        <div class="eachitem">
            <div class="movieimg">
            <a href="moviebox.html?id=${id}"><img src=${img} alt="Missing Image"></a>
            </div>
            <div class="moviecontent">
            <div class="moviecontent-box">        
            <p class="movietitle"><a href="moviebox.html?id=${id}">${item.Title}</a></p>   
              </div>
            </div>
        </div>

       `
    }
    
    document.querySelector('.detailsbox').innerHTML = output;
    
}


// To display details of movie on differnt page

async function onemoviedetails() {
   
    var idsearch = new URLSearchParams(window.location.search);
    var mainid = idsearch.get('id')
    movieid=mainid;
    const url = `https://www.omdbapi.com/?i=${mainid}&apikey=${key}`


    const res = await fetch(`${url}`);
    const data = await res.json();
    
    
    var output = `

    <div class="detmovieimg">
        <img src=${data.Poster} alt="No image">
    </div>
    <div class="detmovie">

    
        <div class="detailsboxhead">
            
                <h2>${data.Title}</h2>
           
            <li style="font-size:15px"><strong>Rating: </strong>${data.imdbRating}/10</li>
        </div>

        <div class="setbox">
        <ul class="listdetails">
            <li><strong>Actors: </strong>${data.Actors}</li>
            <li><strong>Director: </strong>${data.Director}</li>
            <li><strong>Writers: </strong>${data.Writer}</li>
        </ul>
        <ul class="listdetails">
            <li><strong>Genre: </strong>${data.Genre}</li>
           
            <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
        </ul>
        </div>
        <p  class="plotbox">${data.Plot}</p>
        
        <div class="ratingmovie" id="ratemovie">


            <div class="ratemoviebox">
            <h3>Rate the movie :</h3>
    
            <div class="stars" onclick="starcnt()">
            <a>⭐</a>
            <a>⭐</a>
            <a>⭐</a>
            <a>⭐</a>
            <a>⭐</a>
          </div>
            
    </div>
    
            <input id="commentbox" type="text" placeholder="enter a comment"/>
    
            <button type="submit"  id="submitrating" onclick="ratingstore()">Submit</div>
    </div>
    </div> 
    `
    
    document.querySelector('.movie-container').innerHTML = output

}

// Store rating in the local storage

function ratingstore(){
   
    
   const commentmade=document.getElementById("commentbox");
    
   const rateitem ={
    parentid:movieid,
    starscount :starrating,
    content:commentmade.value

   }
   commentmade.value=""
   
   
console.log(rateitem);

   arrayrate.push(rateitem);
   
   localStorage.setItem('arrayrate', JSON.stringify(arrayrate));

}

//next and prev button

prev.addEventListener('click', () => {
    if(currentPage > 1){
        currentPage=currentPage-1;

        if(searchstart.value!=""){
      checkmovies();
        }
        else{
            onloadfunc();
        }
      current.innerHTML=currentPage;
    }
  })
  


  next.addEventListener('click', () => {
    if(currentPage <= totalPages){
        currentPage=currentPage+1;
        if(searchstart.value!=""){
            checkmovies();
              }
              else{
                  onloadfunc();
              }
        current.innerHTML=currentPage;
    }
  })



//to get the rating

 function starcnt(){
    const stars = document.querySelectorAll(".stars a");

stars.forEach((star, idx) => {
   
  star.addEventListener("click", () => {
    starrating=idx+1;
    stars.forEach((otherstar,otheridx) =>{
      
        if(otheridx<=idx){
            
            otherstar.classList.add("active");
        }
        else{
            otherstar.classList.remove("active");
        }
    })
  });
});
 }