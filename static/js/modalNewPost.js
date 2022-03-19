// const modalForm = document.querySelector(".modal-form");
// const buttonNewPost = document.querySelector(".button-new-post");
// const buttonCloseModal = document.querySelector(".button-close-modal");
const itemNav = document.querySelector(".listener-logout");
const optionsLogout = document.querySelector(".options-logout");
const closeModalLogout = document.querySelector(".close-modal");
// const classText = modalForm.className;
const classItemNav = optionsLogout.className;

itemNav.addEventListener("click", () => {
  const arrayClass = classItemNav.split(" ");
  arrayClass.pop();
  optionsLogout.className = arrayClass.join(" ");
});

closeModalLogout.addEventListener("click", () => {
  optionsLogout.className = classItemNav;
});

// buttonNewPost.addEventListener("click", () => {
//   const arrayClass = classText.split(" ");
//   arrayClass.pop();
//   modalForm.className = arrayClass.join(" ");
// });

// buttonCloseModal.addEventListener("click", () => {
//   modalForm.className = classText;
// });