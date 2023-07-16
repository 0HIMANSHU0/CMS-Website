console.log("Welcome to Content Management System Application.");

// if user add a note, add it to the localstorage :
showUsers();

let addBtn = document.getElementById("addbtn");
addBtn.addEventListener("click", function (e) {
  let addName = document.getElementById("addName");
  let addContent = document.getElementById("addContent");
  let addEmail = document.getElementById("addEmail");
  let addOccupation = document.getElementById("addOccupation");
  var fileInput = document.getElementById("image");
  var image = fileInput.files[0];
  image.src = URL.createObjectURL(image);
  // console.log(image);
  // console.log(image.src);

  let users = localStorage.getItem("users");
  if (users == null) {
    usersObj = [];
  } else {
    usersObj = JSON.parse(users);
  }
  let myObj = {
    Name: addName.value,
    Email: addEmail.value,
    Occupation: addOccupation.value,
    Content: addContent.value,
    Image: image.src,
  };
  // console.log(myObj);

  usersObj.push(myObj);
  localStorage.setItem("users", JSON.stringify(usersObj));
  addName.value = "";
  addEmail.value = "";
  addOccupation.value = "";
  addContent.value = "";
  fileInput.value = "";

  console.log(usersObj);
  showUsers();
});

// Function to show the users that are written by the User for the future use
// Function to show elements from LocalStorage.
function showUsers() {
  let users = localStorage.getItem("users");
  if (users == null) {
    usersObj = [];
  } else {
    usersObj = JSON.parse(users);
  }
  let html = "";
  usersObj.forEach(function (element, index) {
    html += `<div class="noteCard my-4 mx-2 form-control" style="width: 22rem; border: 2px solid #198754; border-radius: 6px; background: #bee6cb;">
    <div class="card-body">
     <h6 class="card-title m-1">User No: ${index + 1}</h6>
     <h5 class="card-title m-1">Name: ${element.Name}</h5>
     <p class="card-text m-1">Email: ${element.Email}</p>
     <p class="card-text m-1">Occupation: ${element.Occupation}</p>
     <p class="card-text m-1">Content: ${element.Content}</p>
     <div class="text-center m-3">
     <p class="card-text m-1">Image:</p>
     <img class="card-text m-1" style="height: 165px; border: 2px solid #198754; border-radius: 6px;" src="${
       element.Image
     }"></img>
     </div>
     <div class="text-center m-3">
     <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-success" style="font-size: 15px;
     border: 2px solid black;
 " >Delete User</button>
     </div>
    </div>
   </div>`;
  });
  let usersElm = document.getElementById("users");
  if (usersObj.length != 0) {
    usersElm.innerHTML = html;
  } else {
    usersElm.innerHTML = `Nothing to show here! Use the "Add Blog" section above to Add blog.`;
  }
}

// Function to delete a Note
function deleteNotes(index) {
  //  console.log("I am Deleting the Note", index);
  let users = localStorage.getItem("users");
  if (users == null) {
    usersObj = [];
  } else {
    usersObj = JSON.parse(users);
  }
  usersObj.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(usersObj));
  showUsers();
}

// To search in the Localstorage users
let search = document.getElementById("searchText");
search.addEventListener("input", function () {
  let inputVal = search.value;
  console.log("Input Event fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    let cardContent = element.getElementsByTagName("p")[2].innerText;
    console.log(cardText);
    if (
      cardText.includes(inputVal) ||
      cardTitle.includes(inputVal) ||
      cardContent.includes(inputVal)
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
