const click = document.querySelector('.showbtn')
const container = document.querySelector(".DynamicContainer")
const inputText = document.querySelector(".inputtext")
var pageNo = 1;
  const apiUrl = `https://api.unsplash.com/search/photos?page=${pageNo}&query=india&client_id=rmvxOp3brqNJdI354zKWvC778gp_gEPCkwzcaTrHdXs`;

  click.addEventListener('click', ()=>{
    fetchData(apiUrl)
    pageNo++
  } );
  
  inputText.addEventListener('input', (value)=>{
    if(inputText.value===''){
      fetchData(apiUrl)
    }
    container.innerHTML= '<div> </div>'
    const newApiUrl = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputText.value}&client_id=rmvxOp3brqNJdI354zKWvC778gp_gEPCkwzcaTrHdXs`;
    fetchData(newApiUrl)
  } );
  
  async function fetchImage(query) {
    const res = await fetch(query);
    const data = await res.json();
    return data.results;
  }

  const UI =(image)=>{
    container.insertAdjacentHTML("beforeend",
    `
    <div class="mainContainer">
    <div class="imgCard">
        <img src=${image.urls.small} alt=${image.alt_description} class="imge">
        <a href=${image.links.html} target="_blank">${image.alt_description}</a>
    </div>
</div>
    `
    )
  }

  const fetchData =async(query)=>{
    const images = await fetchImage(query);
    images.forEach(element => {
      UI(element)
    });
  }
  fetchData(apiUrl)
  