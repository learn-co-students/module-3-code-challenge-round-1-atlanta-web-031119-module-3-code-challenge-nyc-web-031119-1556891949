const myImageUrl = `https://randopic.herokuapp.com/images/2557`

// let imageId = prompt(`Enter #ID:`)
let imageId = 2557
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`
  
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getImageData(imageURL, imageId)
})


function getImageData(imageURL, imageId) {
  fetch(imageURL)
  .catch(errors => console.log(`Errors:`, errors))
  .then(res => res.json())
  .then(image => buildImage(image))
}

function buildImage(imageData) {
  console.log(imageData)
  // {id: 2557, url: "http://blog.flatironschool.com/wp-content/uploads/2017/02/Campus_Normal-352x200.png", name: "Lovelace Graffiti Wall", like_count: 0, comments: Array(1)}
  let img = document.querySelector(`#image`)
  img.src = imageData.url
  
  let h4 = document.querySelector(`#name`)
  h4.innerHTML = imageData.name
  
  let span = document.querySelector(`#likes`)
  span.innerHTML = imageData.like_count
  
  let likeBtn = document.querySelector(`#like_button`)
  likeBtn.addEventListener('click', (e) => {
    imageData.like_count += 1
    span.innerText = imageData.like_count
    addLike(e, imageData)})
  
  let ul = document.querySelector(`#comments`)
  clearNode(ul)
  
  for (let comment of imageData.comments) {
    let li = document.createElement('li')
    li.innerText = comment.content
    let delBtn = document.createElement('button')
    delBtn.dataset.id = comment.id
    delBtn.innerHTML = `Remove`
    delBtn.addEventListener("click", (e) => {
      delBtn.parentElement.remove()
      delComment(e)
    })
    li.appendChild(delBtn)
    ul.appendChild(li)
  }

  let form = document.querySelector(`#comment_form`)
  form.addEventListener(`submit`, (e) => {
    let li = document.createElement('li')
    li.innerHTML = e.target.comment.value
    ul.appendChild(li)
    addComment(e, imageData)
  })
}

function clearNode(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

function addLike(e, imageData) {
  console.log(imageData.id)
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageData.id
    })
  }).then(res => console.log(res))
}

function addComment(e, imageData) {
  e.preventDefault()
  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageData.id,
      content: e.target.comment.value
    })
  }).then(res => console.log(res))
  e.target.reset()
  getImageData(imageURL, imageData.id)
}

function delComment(e) {
  fetch(commentsURL + e.target.dataset.id, {
    method: "DELETE"
  })
}