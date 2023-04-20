const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const myDiv1 = document.getElementById("widget-item-container1");
const myDiv2 = document.getElementById("widget-item-container2");

const colorsCat = ["#F0F5FF", "#E3FFEF", "#F5EBFF", "#FFF5ED", "#FFF4F4", "99FFFF"];
const cat ={
  ut : `<div class="icons2" style="background-color: #2F80ED"><i class="fa-solid fa-house"></i></div>`,
  sa : `<div class="icons2" style="background-color: #219653"><i class="fa-solid fa-vault"></i></div>`,
  sh : `<div class="icons2" style="background-color: #833AB4"><i class="fa-solid fa-basket-shopping"></i></div>`,
  pe : `<div class="icons2" style="background-color: #F2994A"><i class="fa-regular fa-user"></i></div>`,
  he : `<div class="icons2" style="background-color: #EB5757"><i class="fa-regular fa-heart"></i></div>`,
  jo : `<div class="icons2" style="background-color: #EBAEC9"><i class="fa-solid fa-plane-departure"></i></div>`
}

const colorsWal =["#2D9CDB", "#27AE60", "magenta", "orange", "#833AB4"];

button1.addEventListener("click", function() {

    button1.disabled = true;
    button2.disabled = true;

    const w = JSON.parse(localStorage.getItem('wallets'));
    if(w == null)
      countInputs1 = 1;
    else
      countInputs1 = w.length+1;

    var culoareW = localStorage.getItem('colorW');
  
    const newDiv = `
    <li>
    <div class="widget-item">
        <div class="icons" style="background-color:${colorsWal[culoareW]}"><i class="fa-brands fa-google-wallet"></i></div>
        <div class="widget-content-positioning">
        <div class="widget-item-name1" id="widget-name${countInputs1}">
            <input type="text" class="nameInput" id="wallNameInput${countInputs1}" placeholder="Wallet name...">
        </div>
        <div class="widget-item-balance1" id="widget-balance${countInputs1}">
            <input type="text" class="balanceInput" id="wallBalanceInput${countInputs1}" placeholder="Balance...">
        </div>
        </div>
    </div>
    </li>`;
    
    var iconStyle = `<div class="icons" style="background-color:${colorsWal[culoareW]}"><i class="fa-brands fa-google-wallet"></i></div>`;
    culoareW++;
    localStorage.setItem('colorW', culoareW);

    myDiv1.innerHTML += newDiv;


    var inputValue1, inputValue2;
    var myClassElements1 = document.querySelector("li:last-child .widget-item-name1");
    var myClassElements2 = document.querySelector("li:last-child .widget-item-balance1");

    const inputElement1 = document.getElementById(`wallNameInput${countInputs1}`);
        inputElement1.addEventListener("blur", function() {
        inputValue1 = inputElement1.value;
    });

    const inputElement2 = document.getElementById(`wallBalanceInput${countInputs1}`);
        inputElement2.addEventListener("blur", function() {
        
        inputValue2 = inputElement2.value;

        var copWallets;
        if (localStorage.getItem('wallets') === null) {
            var copWallets = [];
          } else {
            var copWallets = JSON.parse(localStorage.getItem('wallets'));
        }

        copWallets.push({name: inputValue1, balance: inputValue2, icon: iconStyle});
        localStorage.setItem('wallets', JSON.stringify(copWallets));

        myClassElements1.innerHTML += copWallets[copWallets.length - 1].name;
        myClassElements2.innerHTML += copWallets[copWallets.length - 1].balance;

        var nameD = document.querySelector(".nameInput");
        var balD = document.querySelector(".balanceInput");
        nameD.remove();
        balD.remove();
    
        button1.disabled = false;
        button2.disabled = false;

    });

    countInputs1++;
    localStorage.setItem('widget', countInputs1.toString());
  });



  button2.addEventListener("click", function() {

    button1.disabled = true;
    button2.disabled = true;
    if(localStorage.getItem('widget1') == null) 
    {
      countInputs2 = 1;
      localStorage.setItem('widget', countInputs2.toString());
    }
    else
      countInputs2 = JSON.parse(localStorage.getItem('widget1'));
    
    const newDiv = `
    <li>
    <div class="widget-item">
        <div class="icons2"></div>
        <div class="widget-content-positioning">
        <div class="widget-item-name2" id="widget-name-c${countInputs2}">
            <input type="text" class="nameInput" id="catNameInput${countInputs2}" placeholder="Category name...">
        </div>
        <div class="widget-item-balance2" id="widget-balance-c${countInputs2}">
            <input type="text" class="balanceInput" id="catBalanceInput${countInputs2}" placeholder="Balance...">
        </div>
        </div>
    </div>
    </li>`;
    
    myDiv2.innerHTML += newDiv;
    
    var inputValue1, inputValue2;
    var myClassElements1 = document.querySelector("li:last-child .widget-item-name2");
    var myClassElements2 = document.querySelector("li:last-child .widget-item-balance2");
    var myClassElements3 = document.querySelector("li:last-child .icons2");

    const inputElement1 = document.getElementById(`catNameInput${countInputs2}`);
        inputElement1.addEventListener("blur", function() {
        inputValue1 = inputElement1.value;
    });

    const inputElement2 = document.getElementById(`catBalanceInput${countInputs2}`);
        inputElement2.addEventListener("blur", function() {
        
        inputValue2 = inputElement2.value;

        var copCat;
        if (localStorage.getItem('categories') === null) {
            var copCat = [];
          } else {
            var copCat = JSON.parse(localStorage.getItem('categories'));
        }

        if(inputValue1[0] == 'U' && inputValue1[1] == 't')
          copCat.push({name: inputValue1, balance: inputValue2, icon: cat.ut});
        else if(inputValue1[0] == 'S' && inputValue1[1] == 'a')
          copCat.push({name: inputValue1, balance: inputValue2, icon: cat.sa});
        else if(inputValue1[0] == 'S' && inputValue1[1] == 'h')
          copCat.push({name: inputValue1, balance: inputValue2, icon: cat.sh});
        else if(inputValue1[0] == 'P' && inputValue1[1] == 'e')
          copCat.push({name: inputValue1, balance: inputValue2, icon: cat.pe});
        else if(inputValue1[0] == 'H' && inputValue1[1] == 'e')
          copCat.push({name: inputValue1, balance: inputValue2, icon: cat.he});
        else if(inputValue1[0] == 'J' && inputValue1[1] == 'o')
          copCat.push({name: inputValue1, balance: inputValue2, icon: cat.jo});
        else
          copCat.push({name: inputValue1, balance: inputValue2, icon: `<div class="icons2" style="background-color: #F2994A"><i class="fa-solid fa-feather-pointed"></i></div>`});
  
        localStorage.setItem('categories', JSON.stringify(copCat));

        myClassElements1.innerHTML += copCat[copCat.length - 1].name;
        myClassElements2.innerHTML += copCat[copCat.length - 1].balance;
        myClassElements3.innerHTML += copCat[copCat.length - 1].icon;
        

        var nameD = document.querySelector(".nameInput");
        var balD = document.querySelector(".balanceInput");
        nameD.remove();
        balD.remove();

        button1.disabled = false;
        button2.disabled = false;
    
    });

    countInputs2++;
    localStorage.setItem('widget1', countInputs2.toString());
  });

  ///Stocarea elementelor din lista in Local Storage
  (function() {
    const w = JSON.parse(localStorage.getItem('wallets')) || [];
    const c = JSON.parse(localStorage.getItem('categories')) || [];
  
    function rebuildWallets() {
      const myDiv = document.getElementById('widget-item-container1');
      let html = '';
  
      const logari = JSON.parse(localStorage.getItem('logExps'));

      var balantaPortofel;
      for (let i = 0; i < w.length; i++) {

      balantaPortofel = parseInt(w[i].balance);

        if(logari != null){
          for(let j=0; j<logari.length; j++)
            if(logari[j][0].trim() == w[i].name.trim())
            {
              var suma = parseInt(logari[j][3].replace(/\D/g, '')); 
              if(logari[j][4] == "option2")
                balantaPortofel -= suma;
              else
                balantaPortofel += suma;
            }
        }

        html += `
          <li>
            <div class="widget-item">
              <div class="icons" style="background-color:${colorsWal[i]}"><i class="fa-brands fa-google-wallet"></i></div>
              <div class="widget-content-positioning">
                <div class="widget-item-name1" id="widget-name${i+1}" >${w[i].name}</div>
                <div class="widget-item-balance1" id="widget-balance${i+1}">${balantaPortofel}</div>
              </div>
            </div>
          </li>`;
      }

      myDiv.innerHTML = html;
    }

    function rebuildCategory() {
        const myDiv = document.getElementById('widget-item-container2');
        let html = '';
    
        const logari = JSON.parse(localStorage.getItem('logExps'));
        var balantaCategorie;
        for (let i = 0; i < c.length; i++) {

          balantaCategorie = parseInt(c[i].balance);

          if(logari != null)
          {
            for(let j=0; j<logari.length; j++){
              if(logari[j][1].trim() == c[i].name.trim())
              {
                var suma = parseInt(logari[j][3].replace(/\D/g, '')); 
                if(logari[j][4] == "option2")
                  balantaCategorie += suma;
              }
            }
          }

          html += `
            <li>
              <div class="widget-item">
                ${c[i].icon}
                <div class="widget-content-positioning">
                  <div class="widget-item-name1" id="widget-name-c${i+1}">${c[i].name}</div>
                  <div class="widget-item-balance1" id="widget-balance-c${i+1}">${balantaCategorie}</div>
                </div>
              </div>
            </li>`;
        }
  
        myDiv.innerHTML = html;
      }

  
    rebuildWallets();
    rebuildCategory()
  })();




