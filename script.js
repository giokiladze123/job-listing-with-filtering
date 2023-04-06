import data from "./data.json" assert { type: "json" };

const searchBar = document.querySelector(".search-bar");
const section = document.querySelector(".section");
const searchBarButtons = document.querySelector(".searchBarButtons");
const clear = document.querySelector(".clear");


let bar = [];

const createDomElement = (tag, className, src, id, text, event, eventFc) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (src) {
    element.src = src;
  }

  if (id) {
    element.id = id;
  }
  if (text) {
    element.textContent = text;
  }

  if (event) {
    element[event] = () => {
      eventFc();
    };
  }

  return element;
};

makeJobs(data);


function filterData() {
  const filterArray = data.filter((item) => {
    return bar.every(
      (element) => 
        element === item.level ||
        item.languages.includes(element) ||
        element === item.role ||
        item.tools.includes(element)
    );
  });
  return filterArray;
}




function makeButtons() {
  searchBarButtons.innerHTML = "";
  for (let index = 0; index < bar.length; index++) {
    const string = bar[index];
    const stringButton = createDomElement(
      "button",
      "category-btn",
      null,
      null,
      string
    );
    const removeBackground = createDomElement("div", "removeBackground");
    const remove = createDomElement(
      "img",
      "remove",
      "./images/icon-remove.svg"
    );

    searchBarButtons.append(stringButton);
    stringButton.append(removeBackground);
    removeBackground.append(remove);

    remove.addEventListener("click", () => {
      bar.splice(index, 1);
      makeButtons();
      const newArray = filterData();
      makeJobs(newArray);

      if (bar.length === 0) {
        searchBar.style.display = "none";
      }

      if (bar.length > 0) {
        searchBar.style.display = "flex";
      }
    });
  }
}

clear.addEventListener("click", () => {
  searchBar.style.display = "none";
  bar = [];
  makeJobs(data);
});


function makeJobs(array) {
  section.innerHTML = ""
  for (let index = 0; index < array.length; index++) {
    const {
      id,
      company,
      logo,
      new: isNew,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = array[index];
  

    const imgTextContainer = createDomElement("div","imgTextContainer")
    const statisticBox = createDomElement("div", "card");
    const textContainer = createDomElement("div","textContainer");
    const statisticBoxBlue = createDomElement("div", "header-container");
    const logoElement = createDomElement("img", "card-img", logo);
    const companyName = createDomElement(
      "p",
      "company-name",
      null,
      null,
      company
    );
    const newBtn = createDomElement("button", "new-btn", null, null, "new!");
    const featuredBtn = createDomElement(
      "button",
      "featured-btn",
      null,
      null,
      "featured"
    );
    const buttonText = createDomElement("div", "title-btn");
    const positionAvatar = createDomElement(
      "p",
      "position",
      null,
      null,
      position
    );
    const workDescription = createDomElement("div", "description");
    const postedAtElement = createDomElement("p", "day", null, null, postedAt);
    const oval = createDomElement("img", "oval", "./images/Oval.svg");
    const contractElement = createDomElement("p", "time", null, null, contract);
    const secondOval = createDomElement("img", "oval", "./images/Oval.svg");
    const locationElement = createDomElement(
      "p",
      "location",
      null,
      null,
      location
    );
    const line = createDomElement("div", "line");
    const buttonsContainer = createDomElement("div", "buttons");
    const roleElement = createDomElement(
      "button",
      "category-btn",
      null,
      null,
      role
    );
    const levelElement = createDomElement(
      "button",
      "category-btn",
      null,
      null,
      level
    );
  
    roleElement.addEventListener("click", function () {
      if (!bar.includes(roleElement.textContent)) {
        bar.push(roleElement.textContent);
      }
     
      makeButtons();
      searchBar.style.display = "flex";
      const newArray = filterData();
      makeJobs(newArray);
    });
  
    levelElement.addEventListener("click", function () {
      if (!bar.includes(levelElement.textContent)) {
        bar.push(levelElement.textContent);
      }
     
      makeButtons();
      searchBar.style.display = "flex";
      const newArray = filterData();
      makeJobs(newArray);
    });
  

  
  
  
    buttonText.append(companyName);
    workDescription.append(postedAtElement);
    workDescription.append(oval);
    workDescription.append(contractElement);
    workDescription.append(secondOval);
    workDescription.append(locationElement);
    buttonsContainer.append(roleElement);
    buttonsContainer.append(levelElement);

  
    for (let index = 0; index < languages.length; index++) {
      const languagesElement = createDomElement(
        "button",
        "category-btn",
        null,
        null,
        languages[index]
      );
      buttonsContainer.append(languagesElement);
      languagesElement.addEventListener("click", function () {
        if (!bar.includes(languagesElement.textContent)) {
          bar.push(languagesElement.textContent);
        }
        makeButtons();
        searchBar.style.display = "flex";
        const newArray = filterData();
        makeJobs(newArray);
      });
    }
  
    for (let index = 0; index < tools.length; index++) {
      const toolsElement = createDomElement(
        "button",
        "category-btn",
        null,
        null,
        tools[index]
      );
      buttonsContainer.append(toolsElement);
      toolsElement.addEventListener("click", function () {
        if (!bar.includes(toolsElement.textContent)) {
          bar.push(toolsElement.textContent);
        }
        makeButtons();
        searchBar.style.display = "flex";
        const newArray = filterData();
        makeJobs(newArray);
      });
    }
  
    if (isNew) {
      buttonText.append(newBtn);
    }
  
    if (featured) {
      buttonText.append(featuredBtn);
    }
  
    if (featured) {
      section.append(statisticBoxBlue);
      statisticBoxBlue.append(imgTextContainer);
      
      statisticBoxBlue.append(textContainer);
      statisticBoxBlue.append(logoElement);
      statisticBoxBlue.append(line);
      textContainer.append(buttonText);
      imgTextContainer.append(logoElement);

      statisticBoxBlue.append(textContainer);
      textContainer.append(positionAvatar)
      textContainer.append(workDescription);
      statisticBoxBlue.append(buttonsContainer);
      imgTextContainer.append(textContainer);
    } else {
      section.append(statisticBox);
      statisticBox.append(imgTextContainer);
      statisticBox.append(logoElement);
      textContainer.append(buttonText);
      textContainer.append(positionAvatar)
      textContainer.append(workDescription);
      imgTextContainer.append(logoElement);
      statisticBox.append(line);
      statisticBox.append(textContainer);
      statisticBox.append(buttonsContainer);
      imgTextContainer.append(textContainer);
    }
  }


}