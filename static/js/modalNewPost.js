const modalForm = document.querySelector(".modal-form");
const buttonNewPost = document.querySelector(".button-new-post");
const buttonCloseModal = document.querySelector(".button-close-modal");

const classText = modalForm.className;

buttonNewPost.addEventListener("click", () => {
  const arrayClass = classText.split(" ");
  arrayClass.pop();
  modalForm.className = arrayClass.join(" ");
});

buttonCloseModal.addEventListener("click", () => {
  modalForm.className = classText;
});
