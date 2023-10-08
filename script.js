const apiKey = 'MsWqKSrho1_RQk3WqBHu1lcq2Wcz7pS77HNX0xPdHB4';
let search = document.querySelector("#search");
let searchinput = document.querySelector("input");
let cont = document.querySelector("#resultcontainer");
let button = document.querySelector("button");
let arr = "";
let pages = 10;
let index = 0;
let shareicons = document.querySelector("#shareimg a");
let imagesrc = "";//for storing the src of the image to be shared
let closeicon = document.querySelector("#shareimg i");
let shareicondiv = document.querySelector("#shareimg");
let guidevideo = document.querySelector("#guide");

function addval() {

  const apiUrl = `https://api.unsplash.com/search/photos?query=${searchinput.value}&per_page=100&client_id=${apiKey}`;
  // Make the API request
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      cont.innerHTML = "";
      button.innerText="Show More";
      if (data.results.length > 0) {
        index=0;
        pages=10;
        guide.style.display = "none";
        button.style.display = "block";
        arr = data.results;
        console.log(arr);
        while (index < pages && index < arr.length){
          let newdiv = document.createElement('div');
          newdiv.classList.add('resultdiv');
          let loadimage=document.createElement('img');
          loadimage.src=arr[index].urls.full;
          let gifimage=document.createElement('img');
          gifimage.src="https://cdn.dribbble.com/users/241526/screenshots/954930/loader.gif";
          newdiv.innerHTML=
          `
          <div class="icons">
          <i class="fa fa-download" id="download"></i>
          <i class="fa fa-share" id="share"></i>
          <i class="fa fa-heart" id="like"></i>
          </div>`;
          newdiv.appendChild(gifimage);
          loadimage.onload=()=>{
            gifimage.style.display="none";
            newdiv.appendChild(loadimage);
            newdiv.querySelector('.icons').style.display="flex";
            loadimage.classList.add("blureffect");
          }
          newdiv.querySelector('#download').addEventListener("click", () => {
            const imgSrc = newdiv.querySelector("img").src;
            // Create a temporary anchor element
            const a = document.createElement("a");
            a.href = imgSrc;
            a.download = "image.jpg"; // You can set the filename here
            // Programmatically trigger a click on the anchor element to initiate the download
            a.click();
          })
          newdiv.querySelector('#share').addEventListener("click", () => {
            imagesrc = newdiv.querySelector("img").src;
            console.log(imagesrc);
            shareicondiv.style.display = "flex";
          })
          newdiv.querySelector('#like').addEventListener("click", () => {
            newdiv.querySelector("#like").classList.toggle('like');
          })
          cont.appendChild(newdiv);
          index++;
        }
        index = pages;
        pages += 10;
      }
      else {
        alert("No results founded try another keyword");
      }
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

}

//search button event listener
search.addEventListener("click", () => {
  addval();
})

//show more button event listener
button.addEventListener("click", () => {
  while (index < pages && index < arr.length) {
    let newdiv = document.createElement('div');
    newdiv.classList.add('resultdiv');
    let loadimage=document.createElement('img');
    loadimage.src=arr[index].urls.full;
    let gifimage=document.createElement('img');
    gifimage.src="https://cdn.dribbble.com/users/241526/screenshots/954930/loader.gif";
    newdiv.innerHTML =
      `
      <div class="icons">
      <i class="fa fa-download" id="download"></i>
      <i class="fa fa-share" id="share"></i>
      <i class="fa fa-heart" id="like"></i>
      </div>`;
    newdiv.appendChild(gifimage);
      loadimage.onload=()=>{
        gifimage.style.display="none";
        newdiv.appendChild(loadimage);
        newdiv.querySelector('.icons').style.display="flex";
        loadimage.classList.add("blureffect");
    }
    //for download button
    newdiv.querySelector('#download').addEventListener("click", () => {
      const imgSrc = newdiv.querySelector("img").src;
      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = imgSrc;
      console.log(a.href);
      a.download = "image.jpg"; // You can set the filename here
      // Programmatically trigger a click on the anchor element to initiate the download
      a.click();
    })
    newdiv.querySelector('#share').addEventListener("click", () => {
      imagesrc = newdiv.querySelector("img").src;
      console.log(imagesrc);
      shareicondiv.style.display = "flex";
    })
    cont.appendChild(newdiv);
    index++;
    newdiv.querySelector('#like').addEventListener("click",()=>{
        newdiv.querySelector("#like").classList.toggle('like');
    })
  }
  index = pages;
  pages += 10;
  if (pages > arr.length) {
    button.innerText = "No More Results";
  }
})
//for the share anchor element
shareicons.addEventListener("click", () => {
  shareicons.href = `whatsapp://send?text=%20${imagesrc}`;
})

//for close icon
closeicon.addEventListener("click", () => {
  shareicondiv.style.display = "none";
})
