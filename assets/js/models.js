// create post and data send Local storage
const postForm = document.getElementById("create-post");

const alertText = document.getElementById("alert");
const modalClose = document.getElementById("modal-close");
postForm.onsubmit = (element) => {
  const postData = new FormData(element.target);
  const { athorName, athorPhoto, caption, photo, video, toggle } =
    Object.fromEntries(postData);

  let currentDate = new Date();
  if (!athorName.trim() || !athorPhoto.trim()) {
    element.preventDefault();
    alertText.style.display = "flex";
  } else {
    sendDataLS("data", {
      date: currentDate,
      id: generateUniqueNumber(),
      athorName,
      athorPhoto,
      caption,
      photo,
      video,
      toggle,
    });
    postForm.reset();
    modalClose.click();
  }
  allPostData();
};

// create comment data and send data LS

const commentId = (cmdid) => {
  commentShow(cmdid);
  
  const commentModal = document.getElementById("comment");
  const commentModalClose = document.getElementById("commentModalClose");
  commentModal.onsubmit = (element) => {
    element.preventDefault();
    const postData = new FormData(element.target);
    const { getComment } = Object.fromEntries(postData);
    
    const getData = getDataLS("data");
    const commentData = getData.map((item) => {
    const { id, date, athorName, athorPhoto, caption, photo, video, toggle } =item;
    let allComment = [];
    if (cmdid === id) {
        if (item.allComment) {
          allComment = item.allComment;
        }
        allComment.push(getComment);
        return {
          ...item,
          allComment,
        };
      } else {
        return item;
      }
    });

    localStorage.setItem("data", JSON.stringify(commentData));
    allPostData();
    commentModal.reset();
    commentShow(cmdid);
  };
};


// edite post
const editForm = document.getElementById("edit-post");
const editBtn = document.getElementById("edit");

const editFormData = new FormData(editForm);
const {} = Object.fromEntries(editFormData);

const editPost = (id) => {
  const getData = JSON.parse(localStorage.getItem("data"));
  getData.map((item) => {
    if (item.id == id) {
      const { athorName, athorPhoto, caption, photo, toggle, id } = item;
      editForm.querySelector('input[placeholder="Name"]').value = athorName;
      editForm.querySelector('input[placeholder="profile photo"]').value =
        athorPhoto;
      editForm.querySelector('input[placeholder="Caption"]').value = caption;
      editForm.querySelector('input[placeholder="Photo"]').value = photo;
      editForm.querySelector("#editeFormId").value = id;
      if (toggle == "on") {
        editForm.querySelector("#toggle").setAttribute("checked", "");
      } else {
        editForm.querySelector("#toggle").removeAttribute("checked", "");
      }
    }
  });
};

// Get the form and input elements
const photoField = postForm.querySelector('input[name="photo"]');
const videoField = postForm.querySelector('input[name="video"]');
// Add event listener to the photo field

photoField.addEventListener("input", () => {
  if (photoField.value.trim() !== "") {
    // Check if photo field has a value
    videoField.style.display = "none"; // Hide video field if photo field has input
  } else {
    videoField.style.display = ""; // Otherwise, show video field
  }
});

// Add event listener to the video field
videoField.addEventListener("input", () => {
  if (videoField.value.trim() !== "") {
    // Check if video field has a value
    photoField.style.display = "none"; // Hide photo field if video field has input
  } else {
    photoField.style.display = ""; // Otherwise, show photo field
  }
});

// delete post

const deletePost = (id) => {
  const getDataLS = JSON.parse(localStorage.getItem("data"));

  const deleteData = getDataLS.filter((item) => item.id != id);

  localStorage.setItem("data", JSON.stringify(deleteData));
  allPostData();
};
