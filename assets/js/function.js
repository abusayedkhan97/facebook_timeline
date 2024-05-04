function formatPostTime(postDate) {
  const currentDate = new Date();
  // Convert the string to a Date object
  const parsedPostDate = new Date(postDate);
  const diff = currentDate - parsedPostDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return parsedPostDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
// send data ls
const sendDataLS = (key, data) => {
  const getData = JSON.parse(localStorage.getItem(key));
  let postData = [];
  if (getData) {
    postData = getData;
  }
  postData.push(data);

  localStorage.setItem(key, JSON.stringify(postData));
};

// get data ls
const getDataLS = (key) => {
  const getData = JSON.parse(localStorage.getItem(key));
  if (getData) {
    return getData;
  }
};
// Id generate
function generateUniqueNumber() {
  let numbers = []; // Array to store generated numbers
  let randomNumber;

  do {
    randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
  } while (numbers.includes(randomNumber)); // Check if the number is already generated

  numbers.push(randomNumber); // Add the number to the array

  return randomNumber;
}

// post video show function
const embedVideo = (video) => {
  let videoUrl =
    "https://www.facebook.com/plugins/video.php?height=314&href=" +
    encodeURIComponent(video) +
    "&show_text=false";
  return videoUrl;
};

// Comment show function

const commentShow = (id) => {
  const commentShowData = document.getElementById("commentShowData");

  let commetlist = "";
  const data = getDataLS("data"); //Get data form LocalStorage
  const commentFilter = data.filter((item) => item.id == id); //Data filrer with id
  const allComment = commentFilter[0].allComment; //Get Single post All data

  if (allComment) {
    allComment.forEach((comment) => {
      commetlist += `
      <div class="comment-box">
      <img src="${commentFilter[0].athorPhoto}" alt="">
      <div class="commentShow">
        <p class="name">${commentFilter[0].athorName}</p>
        <p class="comment">${comment}</p>
      </div>
      </div>
      `;
    });
    console.log(commetlist);
  }
  commentShowData.innerHTML = commetlist;
};
