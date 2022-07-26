"use strict";

const groceryBud = document.querySelector(".groceryBud");
const submitButton = document.querySelector(".submit-btn");
const textInput = document.getElementById("grocery");
const testText = document.querySelector(".title");
const groceryItem = document.querySelector(".grocery-item");
const clearBtn = document.querySelector(".clear-btn");

const createParagraph = (type, attrType, attrName, textElem, parent) => {
  const newElement = document.createElement(type);
  newElement.setAttribute(attrType, attrName + parent);
  newElement.setAttribute("class", "paragraph-item");
  const textElement = document.createTextNode(textElem);
  newElement.appendChild(textElement);
  const myParent = document.getElementById(parent);
  myParent.appendChild(newElement);
};

let i = 0;

const createDelete = (type, attrType, parent, attrName, idElem, textElem) => {
  const newElement = document.createElement(type);
  newElement.setAttribute(attrType, attrName);
  newElement.setAttribute("id", idElem);
  const textElement = document.createTextNode(textElem);
  const myParent = document.getElementById(parent);
  newElement.appendChild(textElement);
  myParent.appendChild(newElement);

  newElement.addEventListener("click", () => {
    const getParent = document.getElementById(parent);
    getParent.remove();
  });
};

submitButton.addEventListener("click", () => {
  if (i < 10) {
    const groceryArticle = document.createElement("article");
    groceryArticle.setAttribute("class", "grocery-item");
    groceryArticle.setAttribute("id", `grocery${i}`);

    const element = document.querySelector(".grocery-container");
    element.appendChild(groceryArticle);
    i = i + 1;

    const parentId = groceryArticle.id;

    const eachParagraph = createParagraph(
      "p",
      "id",
      "p1",
      textInput.value,
      parentId
    );

    const newEdit = document.createElement("button");
    newEdit.setAttribute("class", "edit-btn");
    newEdit.setAttribute("id", "edit-btn" + parentId);
    const textEdit = document.createTextNode("Edit Item");
    newEdit.appendChild(textEdit);
    groceryArticle.appendChild(newEdit);
    let editedValue;

    newEdit.addEventListener("click", () => {
      const newInput = document.createElement("input");
      newInput.setAttribute("type", "text");
      newInput.setAttribute("id", "grocery" + parentId);
      newInput.setAttribute("placeholder", "Edit Item");
      newInput.setAttribute("maxlength", "23");

      newInput.setAttribute("class", "edit-input");
      groceryArticle.insertBefore(newInput, newEdit);
      newEdit.classList.add("hidden");
      newInput.focus();
      //groceryArticle.appendChild(newInput)
      newInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          editedValue = newInput.value;
          document.getElementById("p1" + parentId).innerHTML = editedValue;
          newInput.remove();
          newEdit.classList.remove("hidden");
        }
        newInput.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            newInput.remove();
            newEdit.classList.remove("hidden");
          }
        });
      });
    });
    //const createElement2 = (type, attrType, parent, attrName, idElem, textElem, target) => {

    const delBtn = createDelete(
      "button",
      "class",
      parentId,
      "delete-btn",
      "delete-btn" + parentId,
      "Delete Item"
    );

    element.insertBefore(groceryArticle, clearBtn);
  }
});

clearBtn.addEventListener("click", () => {
  const allArticles = document.querySelectorAll(".grocery-item");
  allArticles.forEach((grocery) => {
    grocery.remove();
  });
});
