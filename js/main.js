let insertComments = document.querySelector('.comments');
let layer = document.querySelector('.layer');
let deleteAlert = document.querySelector('.layer .delete-alert');
/* get information from API
let responseContent = new XMLHttpRequest();
responseContent.onreadystatechange = function() {
  if (responseContent.readyState == 4 && responseContent.status == 200) {
    let data = JSON.parse(responseContent.responseText);
    let comments = data.comments;
    let userName = data.currentUser.username;
    var commentHTML = '';
    var replyHTML = '';
    var replyYouHTML = '';
    comments.forEach((comment) => {

      let replies = comment.replies;
      if (replies.length > 0) {
        replies.forEach((reply) => {
          if (reply.user.username === userName) {
            replyYouHTML += createYourReply(reply.user.image.webp, reply.user.username, reply.createdAt, reply.replyingTo, reply.content, reply.score);
          } else {
            replyYouHTML = '';
            replyHTML += createReply(reply.user.image.webp, reply.user.username, reply.createdAt, reply.replyingTo, reply.content, reply.score);
          }
        });
      } else {
        replyHTML = '';
        replyYouHTML = '';
      }
      commentHTML += createComment(comment.user.image.webp, comment.user.username, comment.createdAt, comment.content, comment.score, replyHTML, replyYouHTML);
      replyHTML = '';
      replyYouHTML = '';
    });
    insertComments.innerHTML += commentHTML;
  }
};
responseContent.open("GET", "../data/data.json");
responseContent.send();
*/
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-comment')) {
    layer.classList.add('active');
    deleteAlert.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('yes')) {
        document.body.style.overflow = 'auto';
        layer.classList.remove('active');
        deleteAlert.classList.remove('show');
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
      }
      if (event.target.classList.contains('no') || event.target.classList.contains('layer')) {
        document.body.style.overflow = 'auto';
        layer.classList.remove('active');
        deleteAlert.classList.remove('show');
      }
    });
  }
  if (e.target.classList.contains('edit-comment')) {
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('layer')) {
        layer.classList.add('active');
      }
    });
    let editContent = e.target.parentNode.parentNode.parentNode.children[1];
    let oldComment = editContent.textContent;
    editContent.textContent = '';
    let textarea = document.createElement('textarea');
    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Update'));
    editContent.appendChild(textarea);
    editContent.appendChild(button);
    textarea.className = 'just-for-edit';
    button.className = 'edit-button';
    textarea.focus();
    e.target.parentNode.parentNode.parentNode.classList.add('scale');
    layer.classList.add('active');
    e.target.parentNode.style.pointerEvents = 'none';
    e.target.style.pointerEvents = 'none';
    e.target.parentNode.style.opacity = '.5';
    e.target.style.opacity = '.5';
    button.onclick = () => {
      e.target.parentNode.parentNode.parentNode.classList.remove('scale');
      layer.classList.remove('active');
      e.target.parentNode.style.pointerEvents = 'auto';
      e.target.style.pointerEvents = 'auto';
      e.target.parentNode.style.opacity = '1';
      e.target.style.opacity = '1';
      if (textarea.value.split(' ').join('') !== '') {
        editContent.textContent = textarea.value;
      } else {
        editContent.textContent = oldComment;
      }
      textarea.remove();
    };
  }
  if (e.target.classList.contains('edit-reply')) {
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('layer')) {
        layer.classList.add('active');
      }
    });
    let editContent = e.target.parentNode.parentNode.parentNode.children[1];
    let replyAsArray = editContent.textContent.split(' ');
    let replyingTo = replyAsArray.shift();
    let oldComment = replyAsArray.join(' ');
    editContent.innerHTML = '';
    let textarea = document.createElement('textarea');
    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Reply'));
    editContent.appendChild(textarea);
    editContent.appendChild(button);
    textarea.className = 'just-for-edit';
    button.className = 'edit-button';
    textarea.focus();
    e.target.parentNode.parentNode.parentNode.classList.add('scale');
    layer.classList.add('active');
    e.target.parentNode.style.pointerEvents = 'none';
    e.target.style.pointerEvents = 'none';
    e.target.parentNode.style.opacity = '.5';
    e.target.style.opacity = '.5';
    button.onclick = () => {
      e.target.parentNode.parentNode.parentNode.classList.remove('scale');
      layer.classList.remove('active');
      e.target.parentNode.style.pointerEvents = 'auto';
      e.target.style.pointerEvents = 'auto';
      e.target.parentNode.style.opacity = '1';
      e.target.style.opacity = '1';
      if (textarea.value.split(' ').join('') !== '') {
        editContent.innerHTML = `<span class='replying-to'>${replyingTo}</span> ${textarea.value}`;
      } else {
        editContent.innerHTML = `<span class='replying-to'>${replyingTo}</span> ${oldComment}`;
      }
      textarea.remove();
    };
  }
  if (e.target.classList.contains('delete-reply')) {
    layer.classList.add('active');
    deleteAlert.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('yes')) {
        document.body.style.overflow = 'auto';
        layer.classList.remove('active');
        deleteAlert.classList.remove('show');
        e.target.parentNode.parentNode.parentNode.remove();
      }
      if (event.target.classList.contains('no') || event.target.classList.contains('layer')) {
        document.body.style.overflow = 'auto';
        layer.classList.remove('active');
        deleteAlert.classList.remove('show');
      }
    });
  }
  if (e.target.classList.contains('reply-comment')) {
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('layer')) {
        layer.classList.add('active');
      }
    });
    let insertYourReply = e.target.parentNode.parentNode.parentNode.lastElementChild;
    let replyingTo = e.target.parentNode.parentNode.children[0].children[1].textContent;
    insertYourReply.innerHTML += createYourReply('images/avatars/image-juliusomo.webp', 'juliusomo', `at ${timeNow()}`, replyingTo, '', '0');
    insertYourReply.children[insertYourReply.children.length - 1].children[2].children[1].children[1].click();
  }
  if (e.target.classList.contains('reply-reply')) {
    let insertYourReply = e.target.parentNode.parentNode.parentNode;
    let replyingTo = e.target.parentNode.parentNode.children[0].children[1].textContent;
    insertYourReply.innerHTML += createYourReply('images/avatars/image-juliusomo.webp', 'juliusomo', `at ${timeNow()}`, replyingTo, '', '0');
    insertYourReply.children[insertYourReply.children.length - 1].children[2].children[1].children[1].click();
  }
  if (e.target.classList.contains('minus')) {
    let score = e.target.parentNode.children[1];
    let scoreAsNumber = Number(e.target.parentNode.children[1].textContent);
    if (scoreAsNumber > 0) {
      score.textContent = --scoreAsNumber;
      e.target.style.pointerEvents = 'none';
      e.target.parentNode.children[2].style.pointerEvents = 'none';
      e.target.style.opacity = '.5';
      e.target.parentNode.children[2].style.opacity = '.5';
    } else {
      e.target.style.pointerEvents = 'none';
      e.target.style.opacity = '.5';
    }
  }
  if (e.target.classList.contains('plus')) {
    let score = e.target.parentNode.children[1];
    let scoreAsNumber = Number(e.target.parentNode.children[1].textContent);
    score.textContent = ++scoreAsNumber;
    e.target.style.pointerEvents = 'none';
    e.target.parentNode.children[0].style.pointerEvents = 'none';
    e.target.style.opacity = '.5';
    e.target.parentNode.children[0].style.opacity = '.5';
  }
})

function sendComment() {
  let myComment = document.querySelector('.create-comment form textarea');
  if (validation()) {
    insertComments.innerHTML += createYourComment('images/avatars/image-juliusomo.webp', 'juliusomo', `at ${timeNow()}`, myComment.value, '0');
  }
}

function timeNow() {
  let h = '';
  let m = '';
  let s = '';
  if (new Date().getHours() < 10) {
    h = '0' + now.getHours();
  } else {
    h = new Date().getHours();
  }
  if (new Date().getMinutes() < 10) {
    m = '0' + new Date().getMinutes()
  } else {
    m = new Date().getMinutes();
  }
  if (new Date().getSeconds() < 10) {
    s = '0' + new Date().getSeconds();
  } else {
    s = new Date().getSeconds();
  }
  let timeNow = `${h}:${m}:${s}`;
  return timeNow;
}

function validation() {
  let myComment = document.querySelector('.create-comment form textarea');
  let sendBtn = document.querySelector('.create-comment form div button');
  let errorMsg = document.querySelector('.create-comment div .error');
  if (myComment.value.split(' ').join('') !== '') {
    errorMsg.classList.remove('active');
    sendBtn.classList.remove('disable');
    return true;
  } else {
    errorMsg.innerHTML = `
      <img src="images/error.svg" alt="error icon" /> 
      <span>Can't be empty</span>
    `;
    errorMsg.classList.add('active');
    sendBtn.classList.add('disable');
    return false;
  }
}

function createComment(image, name, time, content, score, reply, reply_you) {
  return `
    <div class="comment">
      <div class="content">
        <div class="user">
          <div class="image">
            <img src="${image}" alt="image ${name}" />
          </div>
          <span class="username">${name}</span>
          <span class="create-time">${time}</span>
        </div>
        <div class="text">${content}</div>
        <div class="options">
          <div class="score">
            <button class='minus'>
              <img src="images/icon-minus.svg" alt="icon minus" />
            </button>
            <span>${score}</span>
            <button class='plus'>
              <img src="images/icon-plus.svg" alt="icon plus" />
            </button>
          </div>
          <button class='reply-comment'>
            <img src="images/icon-reply.svg" alt="icon reply" />
            <span>Reply</span>
          </button>
        </div>
      </div>
      <div class='replies'>${reply+reply_you}</div>
    </div>
  `;
}

function createYourComment(image, name, time, content, score) {
  return `
    <div class="comment">
      <div class="content">
        <div class="user">
          <div class="image">
            <img src="${image}" alt="image ${name}" />
          </div>
          <span class="username">${name}</span>
          <span class='you'>you</span>
          <span class="create-time">${time}</span>
        </div>
        <div class="text">${content}</div>
        <div class="options">
          <div class="score">
            <button class='minus'>
              <img src="images/icon-minus.svg" alt="icon minus" />
            </button>
            <span>${score}</span>
            <button class='plus'>
              <img src="images/icon-plus.svg" alt="icon plus" />
            </button>
          </div>
          <div class="control">
            <button class='delete-comment'>
              <img src="images/icon-delete.svg" alt="icon delete" />
              <span>Delete</span>
            </button>
            <button class='edit-comment'>
              <img src="images/icon-edit.svg" alt="icon edit" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createYourReply(image, name, time, reply_to, content, score) {
  return `
    <div class="reply-you">
      <div class="user">
        <div class="image">
          <img src="${image}" alt="image ${name}" />
        </div>
        <span class="username">${name}</span>
        <span class='you'>you</span>
        <span class="create-time">${time}</span>
      </div>
      <div class="text"><span class="replying-to">@${reply_to}</span> ${content}</div>
      <div class="options">
        <div class="score">
          <button class='minus'>
            <img src="images/icon-minus.svg" alt="icon minus" />
          </button>
          <span>${score}</span>
          <button class='plus'>
            <img src="images/icon-plus.svg" alt="icon plus" />
          </button>
        </div>
        <div class="control">
          <button class='delete-reply'>
            <img src="images/icon-delete.svg" alt="icon delete" />
            <span>Delete</span>
          </button>
          <button class='edit-reply'>
            <img src="images/icon-edit.svg" alt="icon edit" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
function createReply(image, name, time, reply_to, content, score) {
  return `
    <div class="reply">
      <div class="user">
        <div class="image">
          <img src="${image}" alt="image ${name}" />
        </div>
        <span class="username">${name}</span>
        <span class="create-time">${time}</span>
      </div>
      <div class="text"><span class="replying-to">@${reply_to}</span> ${content}</div>
      <div class="options">
        <div class="score">
          <button class='minus'>
              <img src="images/icon-minus.svg" alt="icon minus" />
            </button>
            <span>${score}</span>
            <button class='plus'>
              <img src="images/icon-plus.svg" alt="icon plus" />
            </button>
        </div>
        <button class='reply-reply'>
          <img src="images/icon-reply.svg" alt="icon reply" />
          <span>Reply</span>
        </button>
      </div>
    </div>
  `;
}