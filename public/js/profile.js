const newFormHandler = async (event) => {
  event.preventDefault();

  // creates post
  const title = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

// // update post
// const updateButtonHandler = async (event) => {
//   event.preventDefault();
//   const response = await fetch(`/api/post/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({ title, description }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   if (response.ok) {
//     document.location.replace(`/post/${post.id}`);
//   } else {
//     alert('Failed to update post');
//   }
// };

// update button close/appear
// function openForm() {
//   document.getElementById('myForm').style.display = 'block';
// }

// function closeForm() {
//   document.getElementById('myForm').style.display = 'none';
// }

// deletes post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
