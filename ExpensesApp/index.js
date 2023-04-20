var buttons = 1;
var widgets = 1;

var countInputs1, countInputs2;

const categories = [];

const wallets = [];

const renderWidget = (title) => {
  const content = `
    <div class="widget">
        <div class="top-aside">
          <h2>${title}</h2>
          <button id="button${buttons}" class="aside-button">+</button>
        </div>
        <ul class="widget-item-container" id="widget-item-container${widgets}">
        
        </ul>
        <br><hr>
    </div>
`;
  buttons++;
  widgets++;
  return content;
};



(function () {
  
  const aside = document.querySelector(".aside");
  aside.innerHTML += renderWidget("Wallets", wallets);
  aside.innerHTML += renderWidget("Categories", categories);
  

})();

