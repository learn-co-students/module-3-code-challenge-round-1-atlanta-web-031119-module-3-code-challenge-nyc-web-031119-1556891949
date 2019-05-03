let imageId = 2565 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchImage();
})

function fetchImage(){
  fetch(imageURL)
  .then((res)=>res.json())
  .then(data=> renderPage(data))
  .catch((error)=>console.log(error))
}

function renderPage(data){
  handleImage(data)
  handleTitle(data)
  handleLikes(data)
  handleComments(data)
}

function handleImage(data){
  let img = document.querySelector('#image')
  img.src = data.url
}

function handleTitle(data){
  let title = document.querySelector('#name')
  title.innerText = data.name
}

function handleLikes(data){
  let likes = document.querySelector('#likes')
  likes.innerText = data.like_count
}

function handleComments(data){
  let ul = document.querySelector('#comments')
  comments = data.comments
  comments.forEach((comment)=>{
    let li = document.createElement('li')
    li.id = comment.id
    li.image_id = comment.image_id
    li.innerText = comment.content
    ul.appendChild(li)
  })
}

const likeButton = document.querySelector('#like_button')
likeButton.addEventListener('click', addLike)

function addLike(){
  let likes = document.querySelector('#likes')
  let currentLikes = parseInt(likes.innerText)
  currentLikes += 1
  likes.innerText = `${currentLikes}`
  updateLikes(currentLikes)
}

function updateLikes(currentLikes){
  fetch(likeURL,{
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      like_count: currentLikes
    })
  })
}

const commentForm = document.querySelector('#comment_form')
commentForm.addEventListener('submit',handleForm)

function handleForm(e){
  e.preventDefault()
  let ul = document.querySelector('#comments')
  let li = document.createElement('li')
  comment = e.target.comment.value
  li.innerText = comment
  ul.appendChild(li)
  persistComment(comment)
}

function persistComment(comment){
  console.log(comment)
  fetch(commentsURL,{
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })
}
