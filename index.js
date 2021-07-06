const logo = document.querySelector("#logo");
const wrapper = document.querySelector(".wrapper");
const nav = document.querySelector("nav");
const button = document.querySelector("#button img");
const toAdd = document.querySelector(".to-add");
const draggables = document.querySelectorAll(".draggable");
const sidebars = document.querySelectorAll(".sidebars");
const mqList = window.matchMedia("(max-width:781px)");

// console.log(mqList);
const navFunction = (evt) => {
  if (evt.matches) {
    wrapper.remove();
    toAdd.insertAdjacentElement("afterbegin", wrapper);
  } else {
    wrapper.remove();
    wrapper.classList.remove("expand");
    nav.insertAdjacentElement("afterbegin", wrapper);
  }
};
navFunction(mqList);
mqList.addEventListener("change", navFunction);

button.addEventListener("click", () => {
  wrapper.classList.toggle("expand");
});
button.addEventListener("mousedown", () => {
  button.parentElement.classList.add("click-effect");
});
button.addEventListener("mouseup", () => {
  button.parentElement.classList.remove("click-effect");
});

window.addEventListener("scroll", (evt) => {
  if (window.scrollY > nav.offsetHeight + logo.offsetHeight) {
    nav.classList.add("scroll");
    wrapper.classList.add("scroll");
  } else {
    nav.classList.remove("scroll");
    wrapper.classList.remove("scroll");
  }
});

for (let draggable of draggables) {
  draggable.style.height = `${draggable.offsetWidth}px`;
}

window.addEventListener("resize", (evt) => {
  for (let draggable of draggables) {
    draggable.style.height = `${draggable.offsetWidth}px`;
  }
});

for (let draggable of draggables) {
  draggable.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", draggable.id);
    console.log(event.target);
    setTimeout(() => {
      draggable.className += " invisible";
    }, 0);
  });
  draggable.addEventListener("dragend", function (event) {
    console.log("end");
    draggable.className = "draggable";
  });
}
for (let sidebar of sidebars) {
  sidebar.addEventListener("dragleave", function (event) {
    event.target.classList.remove("selected");
    console.log("leave");
  });
  sidebar.addEventListener("dragenter", function (event) {
    console.log("enter");
  });
  sidebar.addEventListener("dragover", function (event) {
    event.preventDefault();
    sidebar.classList.add("selected");
    console.log("dragover");
  });
  sidebar.addEventListener("drop", function (event) {
    const toAdd = event.dataTransfer.getData("text/plain");
    console.log("target", event.target);
    sidebar.classList.remove("selected");
    sidebar.appendChild(document.querySelector(`#${toAdd}`));
  });
}
