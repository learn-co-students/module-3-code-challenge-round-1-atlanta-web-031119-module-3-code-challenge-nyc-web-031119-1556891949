document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2560

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function getImage() {
    let imageId=2560
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    .then(obj => renderImage(obj))
  }

  function renderImage(obj)  {
    console.log('render arg', obj)

    const imageElem=document.querySelector('#image')
    const imageName=document.querySelector('#image-name')
    const imageComments=document.querySelector('#comments')
    const imageForm=document.querySelector('#comment_form')
    const imageLikes=document.querySelector('#likes')
    const likeButt=document.querySelector('#like_button')
    const DESTROYALL=document.createElement('button')

    console.log('image comments', obj.comments)
    console.log('image comments node', imageComments)

    imageElem.src=obj.url
    imageName.innerText=obj.name
    imageForm.addEventListener('submit', submitComment)
    imageLikes.innerText=obj.comments.length
    renderComments(imageComments, obj.comments)
    // imageComments.appendChild(renderComments(obj.comments))

  likeButt.addEventListener('click', submitLike)

  DESTROYALL.innerText='BLOW UP THE ENTIRE UNIVERSE'
  DESTROYALL.addEventListener('click', deleteDoc)
  document.querySelector('.container').appendChild(DESTROYALL)

  }

  // function renderComments(comments) {
  //   comments.forEach(function(comment) {
  //     let item=document.createElement('li')
  //     item.innerText=comment.content
  //     item.id=`${comment.content}`
  //     console.log('each comment', item)
  //     return item
  //   })
  // }

  function renderComments(commentUl, comments) {
    comments.forEach(function(comment) {
      let item=document.createElement('li')
      item.innerText=comment.content
      item.id=`${comment.content}`
      console.log('each comment', item)
      commentUl.appendChild(item)
    })
  }

  function submitComment(e) {
    e.preventDefault()
    console.log('form target', e.target[0].value)
    let imageComments=document.querySelector('#comments')
    let newComment=document.createElement('li')
    newComment.innerText=e.target[0].value
    imageComments.appendChild(newComment)

    fetch(`${commentsURL}`, {
      method: 'POST',
      body: JSON.stringify({
                image_id: imageId,
                content: e.target[0].value
                }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch(error => alert('comment submit fail', error))
    .then(alert('Successful comment Submitted'))

    reset(document.querySelector('#comment_input'))
  }

  function submitLike(e) {
    console.log('like button target', e.target)
    let imageLikes=document.querySelector('#likes')
    imageLikes.innerText=parseInt(imageLikes.innerText)+1

    fetch(`${likeURL}`, {
      method: 'POST',
      body: JSON.stringify({image_id: imageId}),
      headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch(error => alert('like button catch', error))
    .then(alert('Successful Like'))
  }

  getImage()

  function deleteDoc(e) {
    document.delete()
  }
})
// getImage()