const logExpenseButton = document.querySelector('.logExpense');
const bodyElement = document.querySelector('body');
var data, iconita;
var storageExp = [], copExps;


logExpenseButton.addEventListener('click', function() {
  bodyElement.classList.add('blur');

  const modalElement = document.createElement('div');
  modalElement.classList.add('modal');
  modalElement.innerHTML = `
    <div class="topForm">
        <h3>Log Expense Form</h3>
        <button class="close-modal">X</button>
    </div>
    <form class="formular">
        <label>Choose Wallet: </label>
            <input type="text" name="portofel" placeholder="${clickedItem} (currentWallet)"><br>
        <label>Choose Category: </label>
            <input type="text" name="categorie"><br>
        <label>Name of action: </label>
            <input type="text" name="actiune"><br>
        <label>Sum of: </label>
            <input type="text" placeholder="RON" name="suma"><br>
            <ul class="listaCheckBox">
            <li>
              <input type="checkbox" id="option1" name="option1" value="option1">
              <label>Income</label>
            </li>
            <li>
              <input type="checkbox" id="option2" name="option2" value="option2">
              <label>Expanse</label>
            </li>
          </ul>
        <button type="submit" class="submit">Submit Action</button>
    </form>
`;

    var contor = localStorage.getItem('contor');

    ///punem formularul intr-o varibila de tip obiect
    var formular1 = modalElement.querySelector(".formular");
    formular1.addEventListener('submit', function(event){

        event.preventDefault();

        var formData = new FormData(formular1);
        data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value; 
        }
        bodyElement.classList.remove('blur');
        modalElement.remove();

        var valoriData = [];
        for (const property in data) 
            valoriData.push(data[property]);

        if(valoriData[0] == clickedItem)
        {
            contor = parseInt(contor) + 1;
            localStorage.setItem('contor', contor.toString());  

            var copCategories = JSON.parse(localStorage.getItem('categories'));

            for(let j=0; j<copCategories.length; j++)
                if(valoriData[1] == copCategories[j].name)
                {
                    iconita = copCategories[j].icon;
                    break;
                }

            var istoric = document.querySelector(".history");
            istoric.innerHTML += `
                <div class="istoricElement" >
                    <div class="leftside">
                        ${iconita}
                        <div class="left" id="left${contor}"></div>
                    </div>
                    <div class="rightside">
                        <div class="right" id="right${contor}"></div>
                        <button class="deleteW" onclick="removeDiv(this)" style="background-color: #e0e0e0; margin-right: 20px;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`;

            var element1 = document.getElementById(`left${contor}`);
            var element2 = document.getElementById(`right${contor}`);

            var dataCurenta = new Date();
            var ziuaCurenta = dataCurenta.getDate();
            var lunaCurenta = dataCurenta.getMonth() + 1;
            var anulCurent = dataCurenta.getFullYear();
            var dataString = ziuaCurenta + "/" + lunaCurenta + "/" + anulCurent;
            
            valoriData.push(dataString);
            valoriData.push(iconita);    

            element1.innerHTML += `<div class="numeActiune">${valoriData[2]}<div>`;
            element1.innerHTML += `<div class="dataCalendaristica">${dataString}<div>`;
            if(valoriData[4] == 'option2')
                element2.innerHTML += `<div style="color: red">${"-" + valoriData[3]}<div>`;
            else
                element2.innerHTML += `<div style="color: green">${"+" + valoriData[3]}<div>`;

            ///stocam expense si incomes
            storageExp.push(valoriData);

            copExps = JSON.parse(localStorage.getItem('logExps'));
            if(copExps === null)
                localStorage.setItem('logExps', JSON.stringify(storageExp));
            else
            {
                copExps.push(valoriData);
                localStorage.setItem('logExps', JSON.stringify(copExps));
            }

            copExps = JSON.parse(localStorage.getItem('logExps'));
        
            ///Update valori expense and income

            if(copExps[contor-1][0] == clickedItem){
                var updateExp = document.querySelector(".sumaCheltuieli");
                var updateInc = document.querySelector(".sumaVenituri");
                var suma = parseInt(copExps[contor-1][3].replace(/\D/g, '')); 

                if(copExps[contor-1][4] == "option2")
                {
                    var numar = parseInt(updateExp.innerText);
                    numar = numar + suma;
                    updateExp.innerHTML = numar;

                    ///Update valori in aside

                    const w1 = JSON.parse(localStorage.getItem('wallets'));
                    const c1 = JSON.parse(localStorage.getItem('categories'));


                    for (let i = 1; i <= w1.length; i++)
                    {
                        var id = `widget-name${i}`;
                        var nameAside = document.getElementById(id);
                        
                        if(nameAside.textContent.trim() == clickedItem)
                        {
                            id = `widget-balance${i}`;
                            var balanceAside = document.getElementById(id);
                            let balanta = parseInt(balanceAside.innerText);
                            balanta = balanta - suma;
                            balanceAside.innerHTML = balanta;
                        }
                    }

                    for (let i = 1; i <= c1.length; i++)
                    {
                        var id = `widget-name-c${i}`;
                        var nameAside = document.getElementById(id);
                        
                        if(nameAside.textContent.trim() == copExps[contor-1][1].trim()){
            
                            var id1 = `widget-balance-c${i}`;
                            var balanceAside = document.getElementById(id1);

                            let balanta = parseInt(balanceAside.innerText);
                            balanta = balanta + suma;
                            balanceAside.innerHTML = balanta;
                        }
                            
                    }

                }
                else
                {
                    let numar = parseInt(updateInc.innerText);
                    numar = numar + suma;
                    updateInc.innerHTML = numar;

                    const w1 = JSON.parse(localStorage.getItem('wallets'));
                    for (let i = 1; i <= w1.length; i++)
                    {
                        var id = `widget-name${i}`;
                        var nameAside = document.getElementById(id);
                        
                        if(nameAside.textContent.trim() == clickedItem.trim())
                        {
                            id = `widget-balance${i}`;
                            var balanceAside = document.getElementById(id);
                            let balanta = parseInt(balanceAside.innerText);
                            balanta = balanta + suma;
                            balanceAside.innerHTML = balanta;
                        }
                    }
                }
            }
            
        }

    });


    const closeModalButton = modalElement.querySelector('.close-modal');
    closeModalButton.addEventListener('click', function() {
        bodyElement.classList.remove('blur');
        modalElement.remove();
    });


    bodyElement.appendChild(modalElement);

});

function removeDiv(button) {
    var div = button.parentNode.parentNode;
    var div2 = button.parentNode.previousElementSibling;
    var div3 = div2.querySelector(".left");
    var copExps = JSON.parse(localStorage.getItem('logExps'));

    var word = div3.textContent.split(" ")[0];
    var letters = word.match(/^[a-zA-Z]*/)[0];

    for(let i=0; i<copExps.length; i++)
        if(copExps[i][2].trim() == letters)
        {
            copExps.splice(i,1);
            var contor = localStorage.getItem('contor');
            contor--;
            localStorage.setItem('contor', contor);
        }

    localStorage.setItem('logExps', JSON.stringify(copExps));
    
    div.remove();
}