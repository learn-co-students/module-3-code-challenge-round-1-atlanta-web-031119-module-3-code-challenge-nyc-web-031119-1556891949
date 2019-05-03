document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2531 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image_id = 2531 //Enter your assigned imageId here

    fetch(`https://randopic.herokuapp.com/images/${image_id}`)
    .then((response) => {
      return response.json()
    }).then((response) => { 
      console.log(response)
      renderDOM(response)
    })
  
  const comments = document.querySelector("#comments")

  function renderDOM(response) {
    const image_card = document.querySelector("#image_card")
    const image = document.querySelector("#image")
    const name = document.querySelector("#name")
    const likes = document.querySelector("#likes")
    const like_button = document.querySelector("#like_button")

    image_card.dataset.id = response.id

    image.src = response.url

    name.innerText = response.name 

    likes.innerHTML = response.like_count

    like_button.innerHTML = "Like"

    like_button.addEventListener('click', function(event) {
      addLikes(image_id)
    })
  }

  function addLikes(image_id) {
    console.log("hitting this")
    let addLike = {
      image_id: image_id
    }

    fetch('https://randopic.herokuapp.com/likes/', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST",
      body: JSON.stringify(addLike)
      }).then(function(response){
        console.log(response)
        return response.json()
      }).then(function(response){
        console.log("response", response)
      }) 
      // image_card = event.target.parentElement
      // image_card.querySelector("likes").innerHTML = response.like_count
  }

  function useForm(event) {
    console.log("hitting this")

  event.preventDefault()

    let newComment = {
      image_id: image_id,
      content: event.target.comment.value
    }

    fetch('https://randopic.herokuapp.com/comments/', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST",
      body: JSON.stringify(newComment)
    }).then(function(response){
      console.log("response1", response)
      return response.json()
    }).then(function(response){
      console.log(response)
      // image_card = event.target.parentElement
      // image_card.querySelector("comments").innerHTML = response.comments  
      
          let li = document.createElement("li")
          li.innerText = response.content
          comments.appendChild(li)
    })
  }

  document.querySelector("#comment_form").addEventListener("submit", useForm)

})

// I cannot persist my likes and comments after a page refresh (updating the DOM) for some reason. 
// I tried using the querySelector and the parentElement. 
