'use strict';

function helpPeersOutSection(){
$('#peers').click(function(event){
  event.preventDefault();
  $('.nytimes').addClass('wpstuff');
  $('.homepage').addClass('wpstuff');
  $('.peers').removeClass('wpstuff');
  $('.getTextbooks').addClass('wpstuff');
  $('.promotepeers').empty();

})}

function helpPeersOut() {

$('#searchit').click(function(event){
const tag = document.getElementById("keyword").value;
console.log(tag);
const max = document.getElementById("maxresults").value;
console.log(max);
const url = `https://public-api.wordpress.com/rest/v1.1/read/tags/${tag}/posts?number=${max}&pretty=true`;
console.log(url);

function getWork(){
  fetch(url)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson));
}

function displayResults(responseJson){
  console.log(responseJson);
  const j = Number(max);
  if (j<=10 && j>=1){
  for (let i=0; i<j; i++){
  $('.promotepeers').append(`
  <p>Title: ${responseJson.posts[i].title}</p>
  <p>Link: <a href = "${responseJson.posts[i].URL}" target = "_blank">Go Here</a></p>`)}}
  else if (j>10){
    alert(`Max has to be less than 10`);
  }
  else{
    alert('Please enter a number between 1 and 10 for the max number of results you want to see. ')
  }}

$(getWork);
})}




function populateList(){

function getNYTlists(){
  fetch(`https://api.nytimes.com/svc/books/v3/lists/names?api-key=r25rkPiNJphGIYapIY8eLU3XiOb3dZGE`)
  .then(response => response.json())
  .then(responseJson => displayNYTResults(responseJson));
}

function displayNYTResults(responseJson){
  //console.log(responseJson);
  for (let i=0; i<55; i++){
    $('#typeofbook').append(`
    <option id = "${responseJson.results[i].list_name_encoded}" class = "${responseJson.results[i].display_name}">${responseJson.results[i].display_name}</option>`
    )
  }
}

$(getNYTlists());}


function readSection(){
  $('#read').click(function(event){
    event.preventDefault();
    $('.nytimes').removeClass('wpstuff');
    $('.homepage').addClass('wpstuff');
    $('.peers').addClass('wpstuff');
    $('.getTextbooks').addClass('wpstuff');
    $('.promotepeers').empty();
  })
}


function populateBooks(){

$("#nyt").click(function(event){
  const genre = document.getElementById("typeofbook").value;
  console.log(genre);
  const findlist = document.getElementsByClassName(genre)[0].id;
  console.log(findlist);

  const nytURL = `https://api.nytimes.com/svc/books/v3/lists/current/${findlist}.json?api-key=r25rkPiNJphGIYapIY8eLU3XiOb3dZGE&offset=(0,20)`;
  console.log(nytURL);

  function getNYTGenreList(){
  fetch(nytURL)
  .then(response => response.json())
  .then(responseJson => displayNYTResultsToUser(responseJson));
}
  function displayNYTResultsToUser(responseJson){
    console.log(responseJson);
    console.log(`hi`);
    console.log(`${responseJson.results.books[0].title}`);
    let total = Number(`${responseJson.num_results}`);
    console.log(total);
    $('.promotepeers').empty();
    if (total>=10){
      for (let i=0; i<10;i++){
        $('.promotepeers').append(`
        <h1>${responseJson.results.books[i].rank}</h1>
        <h2>${responseJson.results.books[i].title}</h2>
        <h3>${responseJson.results.books[i].author}</h3>
        <p>${responseJson.results.books[i].description}</p>
        <p><a href = '${responseJson.results.books[i].buy_links[0].url}' target = "_blank">Check it out!</a></p>
        `);}}
    else {
      for (let i=0; i<total;i++){
        $('.promotepeers').append(`
        <h1>${responseJson.results.books[i].rank}</h1>
        <h2>${responseJson.results.books[i].title}</h2>
        <h3>${responseJson.results.books[i].author}</h3>
        <p>${responseJson.results.books[i].description}</p>
        <p><a href = '${responseJson.results.books[i].buy_links[0].url}' target="_blank">Check it out!</a></p>
        `);}
    }}

    $(getNYTGenreList());
    
  }
  
)}








function bookReviews(){

$('#findreview').click(function(event){
function getNYTReviews(){
  const bookForReview = document.getElementById('bookreview').value;
  console.log(bookForReview);

  fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookForReview}&api-key=r25rkPiNJphGIYapIY8eLU3XiOb3dZGE`)
  .then(response => response.json())
  .then(responseJson => displayNYTReviews(responseJson));
}

function displayNYTReviews(responseJson){
  console.log(responseJson);
  $(`.promotepeers`).empty();
  let m = Number(responseJson.num_results);
  if (m>0){
    $('.promotepeers').append(`
    <h1>See Review Here: ${responseJson.results[0].url}</h1>`
    )
  }
  else{
    alert(`Sorry: no reviews available for this book`);
  }}
  $(getNYTReviews());

  })}

function studySection(){
  $('#study').click(function(event){
    event.preventDefault();
    $('.nytimes').addClass('wpstuff');
    $('.homepage').addClass('wpstuff');
    $('.peers').addClass('wpstuff');
    $('.getTextbooks').removeClass('wpstuff');
    $('.promotepeers').empty();
  })
}




function getTextbook(){
  $("#preview").click(function(event){
  const textURL = `https://www.googleapis.com/books/v1/volumes?id=63858393839-miumggrkjkjjrsie880suo12q4iq0sl2.apps.googleusercontent.com`

  let theBook = {
    q: String(document.getElementById(`textname`).value),
    inauthor:String(document.getElementById(`bookauthor`).value)
  }
function mappingBooks(tan){
  let parameters = Object.keys(tan);
  let inputFromUser = Object.values(tan);
  let completeURL = '';
  if (inputFromUser[0].length==0){
    alert("You must enter the name")
  }
  else if (inputFromUser[1].length<=1){
    completeURL = completeURL+`${parameters[0]}=${encodeURIComponent(inputFromUser[0])}`;
    }
    else{
      completeURL = completeURL+`${parameters[0]}=${encodeURIComponent(inputFromUser[0])}+${parameters[1]}=${encodeURIComponent(inputFromUser[1])}`

    }

    return completeURL;
  }
  

  function findTextorPreview(){
    const searchURL = `${textURL}&${mappingBooks(theBook)}`;
    console.log(searchURL);
    fetch (searchURL)
    .then(response=> response.json())
    .then(responseJson => showUserRequest(responseJson));

  }

  function showUserRequest(responseJson){
     $(`.promotepeers`).empty();
    const totalResults = Number(responseJson.totalItems);
    if (totalResults>=10){
      for (let i=0; i<10; i++){
        $('.promotepeers').append(`
    <h1>Title: ${responseJson.items[i].volumeInfo.title}</h1>
    <h2>Author: ${responseJson.items[i].volumeInfo.authors}</h2>
    <h3>Publisher: ${responseJson.items[i].volumeInfo.publisher}</h3>
    <h4>Published Date: ${responseJson.items[i].volumeInfo.publishedDate}</h4>
    <h5>Description: ${responseJson.items[i].volumeInfo.description}</h5>
    <p><b>Preview it here:</b> ${responseJson.items[i].volumeInfo.previewLink}</p>
    <p><b>See Purchasing Options:</b> ${responseJson.items[i].saleInfo.buyLink}</p>`)
  }}
  else {
    for (let i=0; i<totalResults; i++){
        $('.promotepeers').append(`
    <h1>Title: ${responseJson.items[i].volumeInfo.title}</h1>
    <h2>Author: ${responseJson.items[i].volumeInfo.authors}</h2>
    <h3>Publisher: ${responseJson.items[i].volumeInfo.publisher}</h3>
    <h4>Published Date: ${responseJson.items[i].volumeInfo.publishedDate}</h4>
    <h5>Description: ${responseJson.items[i].volumeInfo.description}</h5>
    <p><b>Preview it here:</b> ${responseJson.items[i].volumeInfo.previewLink}</p>
    <p><b>See Purchasing Options:</b> ${responseJson.items[i].saleInfo.buyLink}</p>`)
  }}}

  $(findTextorPreview());
  
})
}

function homePageSection(){
  $("#home").click(function(event){
    event.preventDefault();
    $('.nytimes').addClass('wpstuff');
    $('.homepage').removeClass('wpstuff');
    $('.peers').addClass('wpstuff');
    $('.getTextbooks').addClass('wpstuff');
    $('.promotepeers').empty();

  })
}



  

/*$(helpPeersOutSection());
$(helpPeersOut());
$(readSection());
$(populateList());
$(populateBooks());
$(bookReviews());
$(studySection());
$(getTextbook());
$(homePageSection());*/

function makeCapstoneWork(){
  helpPeersOutSection();
  helpPeersOut();
  readSection();
  populateList();
  populateBooks();
  bookReviews();
  studySection();
  getTextbook();
  homePageSection();
  };

$(makeCapstoneWork())





/*const mike = [{name:'kelly'},{name:`anne`}];
console.log(mike[1]);
const kailey = {
  name: 'rick',
  age: [3,4,5]};

console.log(kailey.age);
console.log(encodeURIComponent(`it's the little things`))
const myalin = `it's the little things`;
console.log(myalin.length);

function denote(cole){
  const m = cole.length;
  let myArray = ``;
  for (let i=0; i<m; i++){
    if (cole[i]!==" " && cole[i]!=="'"){
    myArray = myArray+`${cole[i]}`;
  }
    else{
      myArray = myArray + `-`;
    }}

    return myArray;

}

console.log(denote(myalin));


  const theNook = {
    q: `mike`,
    inauthor:`jelly`
  }

const jane = Object.keys(theNook)
console.log(jane);
const vinny = jane[0];
console.log(vinny);

const kent = theNook.vinny;
console.log(kent);

const mark = Object.values(theNook);
console.log(mark);
console.log(mark[1].length)

function nameSake(lin){
  let jason = Object.values(lin);
  let mason = Object.keys(lin);
  if (jason[1].length<=1){
    return `${mason[0]}=${jason[0]}`;}
    else{
      return `${mason[0]}=${jason[0]}+${mason[1]}=${jason[1]}`
    }
  }

console.log(nameSake(theNook));
console.log(theNook.length)*/