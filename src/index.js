document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2558 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  document.querySelector('#comment_form').addEventListener('submit', handleSubmit)
  document.querySelector('#like_button').addEventListener('click', handleLike)

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(data => getImage(data))
})

function getImage(image){
  let img = document.querySelector('#image')
  img.src = image.url

  let imgName = document.querySelector('#name')
  imgName.innerText = image.name

  let imgLikes = document.querySelector('#likes')
  imgLikes.innerText = image.like_count
}

function handleSubmit(e){
  e.preventDefault()
  let ul = document.querySelector('#comments')

  let comment = document.createElement('li')
  comment.innerText = document.querySelector('#comment_input').value

  ul.appendChild(comment)

  e.target.reset()

  //add (POST) fetch request to update database
}

function handleLike(e){
  let span = document.querySelector('#likes')
  span.innerText = parseInt(span.innerText) + 1

  //add (POST) fetch request to update database 
}
