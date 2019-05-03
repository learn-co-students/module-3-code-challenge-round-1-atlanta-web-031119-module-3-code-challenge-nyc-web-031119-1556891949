document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2563

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage(imageURL)

  document.querySelector('#like_button').addEventListener('click', handleLikes)
  document.querySelector('#comment_form').addEventListener('submit', handleForm)
})


function getImage(imageURL) {
  fetch(imageURL)
  .then(res => res.json())
  .then(renderImage)
}

function renderImage(image) {
  console.log(image)
  let pic = document.querySelector('#image')
  pic.src = image.url 
  pic.dataset.id = image.id

  let title = document.querySelector('#name')
  title.innerText = image.name

  let likes = document.querySelector('#likes')
  likes.innerText = image.like_count

  renderComments(image)

}

function renderComments(image) {
  let list = document.querySelector('#comments')

  image.comments.forEach(function(comment) {
    let listItem = document.createElement('li')
    
    listItem.innerText = comment.content
    // let delBtn = document.createElement('button')
    // delBtn.innerText = "Delete"
    // delBtn.addEventListener('click', handleDelete)
    // listItem.appendChild(delBtn)
    list.appendChild(listItem)
  })


}

function handleLikes(e) {
  let likeCount = document.querySelector('#likes')
  let currentCount = likeCount.innerText
  likeCount.innerText = parseInt(currentCount) + 1
  fetch(`https://randopic.herokuapp.com/likes/`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: 2563
    })
    

  })
    
}

function handleForm(e) {
  e.preventDefault()
  console.log('form test', e.target[0].value)
  let list = document.querySelector('#comments')
  let newComment = document.createElement('li')
  newComment.innerText = e.target[0].value
  list.appendChild(newComment)
  fetch(`https://randopic.herokuapp.com/comments/`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: 2563,
      content: `${e.target[0].value}`
    })
  })
  e.target.reset()
}

function handleDelete(e) {
  console.log(e.target.parentElement)
}