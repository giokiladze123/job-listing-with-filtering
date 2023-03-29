import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".statistics")
const section = document.querySelector(".section")

const createDomElement = (tag, className, src, id, text, event, eventFc) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  
  if (src) {
    element.src = src;
  }

  if (id) {
    element.id = id
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



for (let index = 0; index < data.length; index++) {
  const {id, company, logo, new:isNew, featured,
     position, role, level, postedAt, contract,
     location, languages, tools } = data[index];

     
     const statisticBox = createDomElement("div","card");
     const logoElement = createDomElement("img","card-img",logo);
     const companyName = createDomElement("p","company-name", null, null,company);
     const newBtn = createDomElement("button","new-btn", null, null, "new!");
     const featuredBtn = createDomElement("button", "featured-btn", null, null, "featured");
     const buttonText = createDomElement("div", "title-btn");
     const positionAvatar = createDomElement("p","position", null, null, position);

     section.append(statisticBox);
     statisticBox.append(logoElement);
     statisticBox.append(buttonText);
     buttonText.append(companyName);
     buttonText.append(newBtn);
     buttonText.append(featuredBtn);
     statisticBox.append(positionAvatar);
     
}