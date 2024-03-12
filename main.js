const addDialog = document.querySelector("dialog#add-dialog");
const addButton = document.querySelector("#add-button");
const closeBtn = document.querySelector("dialog#add-dialog > .close-btn");

addButton.addEventListener("click", () => {
  addDialog.showModal();
});

closeBtn.addEventListener("click", () => {
  addDialog.close();
});
