document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2562 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  let span = document.getElementById("likes")
  span.innerText = 0
  
  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchImage(imageURL)
})

  function fetchImage(imageURL){

  fetch(imageURL)
  .then(response => response.json())   
  .then(data => addImage(data))



}

function addImage(data){

  let div = document.getElementById("image_card")
  let img = document.getElementById("image")
  img.src = data.url
  let h4 = document.getElementById("name")
  h4.innerText = data.name
  let likeBtn =document.getElementById("like_button")  
  likeBtn.addEventListener("click",handleLike)
  let span = document.getElementById("likes")
  span.innerText = data.like_count
  let form = document.getElementById("comment_form")
  form.addEventListener("submit",handleSubmit)
  let comment = document.getElementById("comment_input")
  //debugger
   let ul = document.getElementById("comments")
   data.comments.forEach(comment => {
    console.log(comment.content)
    let li = document.createElement("li")
    li.innerText = comment.content
    let deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.addEventListener("click",handleDelete)
    ul.appendChild(li)
    ul.appendChild(deleteBtn)
  });


}

  function handleDelete(e){
  console.log("delet")
  e.target.remove()
}


    function handleSubmit(e) {
    e.preventDefault()
    let comment = document.getElementById("comment_input").value
    console.log (comment.value)
    let ul = document.getElementById("comments")
    let li = document.createElement("li")
    li.innerText = comment
    ul.appendChild(li)
    e.target.reset()
    let data = {
    image_id: 2562,
    content: comment  
  
    }

  fetch('https://randopic.herokuapp.com/comments/', {
    method: 'post',
    body: JSON.stringify(data),
    headers:{
    'Content-Type': 'application/json'
    }
    })  
}




function handleLike(e)
{
  let span = document.getElementById("likes")
  let likeCount = parseInt(span.innerText) + 1
  

  span.innerText = likeCount

  let data = {
  image_id: 2562,
  like_count: likeCount  

  }
   
    fetch('https://randopic.herokuapp.com/likes/', {
    method: 'post',
    body: JSON.stringify(data),
    headers:{
    'Content-Type': 'application/json'
    }
      })
        //.then(function(response) {
        //   response.json();



}

  





