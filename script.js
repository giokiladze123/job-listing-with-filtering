import data from "./data.json" assert { type: "json" };

const searchBar = document.querySelector(".search-bar")
const section = document.querySelector(".section")
const searchBarButtons = document.querySelector(".searchBarButtons")
const clear =document.querySelector(".clear");

let bar = []



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



function makeButtons () {
  searchBarButtons.innerHTML = '';
  for (let index = 0; index < bar.length; index++) {
    const string = bar[index];
    const stringButton = createDomElement("button", "category-btn", null, null ,string );
    const removeBackground = createDomElement("div", "removeBackground");
    const remove = createDomElement("img", "remove", "./images/icon-remove.svg" );
   
  

    
    searchBarButtons.append(stringButton);
    stringButton.append(removeBackground);
    removeBackground.append(remove);
  


    remove.addEventListener("click", () => {
      bar.splice(index, 1); 
      makeButtons(); 
      
      
      if (bar.length === 0) {
        searchBar.style.display = 'none';
      }
      
    if (bar.length > 0) {
      searchBar.style.display = 'flex';

    }
     
    });



    
   
  }

   
}

clear.addEventListener("click", () => {
  searchBar.style.display = "none";
  bar = []
});







for (let index = 0; index < data.length; index++) {
  const {id, company, logo, new:isNew, featured,
     position, role, level, postedAt, contract,
     location, languages, tools } = data[index];

    
     const statisticBox = createDomElement("div","card");
     const statisticBoxBlue = createDomElement("div", "header-container")
     const logoElement = createDomElement("img","card-img",logo);
     const companyName = createDomElement("p","company-name", null, null,company);
     const newBtn = createDomElement("button","new-btn", null, null, "new!");
     const featuredBtn = createDomElement("button", "featured-btn", null, null, "featured");
     const buttonText = createDomElement("div", "title-btn");
     const positionAvatar = createDomElement("p","position", null, null, position);
     const workDescription = createDomElement("div","description");
     const postedAtElement =  createDomElement("p","day", null, null, postedAt);
     const oval = createDomElement("img","oval","./images/oval.svg");
     const contractElement = createDomElement("p","time", null, null, contract);
     const secondOval =createDomElement("img", "oval", "./images/oval.svg" );
     const locationElement = createDomElement("p", "location", null, null, location);
     const line = createDomElement("div", "line");
     const buttonsContainer = createDomElement("div", "buttons");
     const roleElement = createDomElement("button", "category-btn", null, null, role );
     const levelElement = createDomElement("button", "category-btn", null, null, level );



     
     roleElement.addEventListener("click",function(){
      bar.push(roleElement.textContent);
      makeButtons()
      searchBar.style.display = "flex"
      
     })


     levelElement.addEventListener("click", function(){
      bar.push(levelElement.textContent);
      makeButtons()
      searchBar.style.display = "flex"
     
     })


    
     buttonText.append(companyName);
     workDescription.append(postedAtElement);
     workDescription.append(oval);
     workDescription.append(contractElement);
     workDescription.append(secondOval);
     workDescription.append(locationElement);
     buttonsContainer.append(roleElement);
     buttonsContainer.append(levelElement);


     
     for (let index = 0; index < languages.length; index++) {
      const languagesElement = createDomElement("button", "category-btn", null, null, languages[index]);
      buttonsContainer.append(languagesElement);
      languagesElement.addEventListener("click", function(){
        bar.push(languagesElement.textContent);
        makeButtons()
        searchBar.style.display = "flex"
       
       })
    }

    for (let index = 0; index < tools.length; index++) {
      const toolsElement = createDomElement ("button", "category-btn", null, null, tools[index]);
      buttonsContainer.append(toolsElement);
      toolsElement.addEventListener("click", function(){
        bar.push(toolsElement.textContent);
        makeButtons()
        searchBar.style.display = "flex"
      
     })

    }
    

     if (isNew) {
      buttonText.append(newBtn);
     }

     if (featured) {
      buttonText.append(featuredBtn);
     }


     if (featured) {
      section.append(statisticBoxBlue)
      statisticBoxBlue.append(logoElement);
      statisticBoxBlue.append(buttonText);
      statisticBoxBlue.append(positionAvatar);
      statisticBoxBlue.append(workDescription);
      statisticBoxBlue.append(line);
      statisticBoxBlue.append(buttonsContainer);
     } else {
      section.append(statisticBox);
      statisticBox.append(logoElement);
      statisticBox.append(buttonText);
      statisticBox.append(positionAvatar);
      statisticBox.append(workDescription);
      statisticBox.append(line);
      statisticBox.append(buttonsContainer);
     }
  
}
