var portofel = document.getElementById("widget-item-container1");
var numePort='', sumaPort='';
var clickedItem;

portofel.addEventListener("click", function(event) {

    clickedItem = event.target;
    
    if(clickedItem.tagName !== 'INPUT'){
        clickedItem = event.target.innerText;
        var titlu = document.querySelector(".walletTitle");
        titlu.innerHTML= "";

        var wal = JSON.parse(localStorage.getItem('wallets'));
        for(let i=0; i<wal.length; i++)
            if(wal[i].name.trim() == clickedItem)
                titlu.innerHTML += wal[i].icon; 
        titlu.innerHTML += `<div class="titluWal">${clickedItem} Wallet</div>`;

        const portof = JSON.parse(localStorage.getItem('wallets'));

        ///Luam textul pe care l-am apasat si verifica cu numele din obiect ca sa vedem in ce wallet ne aflam
        for(let prop in portof)
            if(clickedItem === portof[prop].name){
                numePort = portof[prop].name;
                sumaPort = portof[prop].balance;
            }

        var venituri = document.querySelector(".inc");
        var cheltuieli = document.querySelector(".exp");
        var his = document.querySelector(".history");

        styleBox(venituri, cheltuieli);

        document.querySelector(".logExpense").disabled = false;
        document.querySelector(".statistics").disabled = false;
        venituri.innerHTML = "";
        cheltuieli.innerHTML = "";
        venituri.innerHTML += `<i class="fa-solid fa-arrow-trend-up fa-lg" style="color: #00ff1e; margin-right: 10px;"></i>`;
        venituri.innerHTML += `<div class="pozitionare"></div>`;
        var poz = document.querySelector(".pozitionare");
        poz.innerHTML += `<div class="titluCaseta">Total Incomes</div>`;
        poz.innerHTML += `<div class="sumaVenituri">${sumaPort}</div>`;

        cheltuieli.innerHTML += `<i class="fa-solid fa-arrow-trend-down fa-lg" style="color: #ff0000; margin-right: 10px;"></i>`;
        cheltuieli.innerHTML += `<div class="pozitionare1"></div>`;
        var poz1 = document.querySelector(".pozitionare1");
        poz1.innerHTML += `<div class="titluCaseta">Total Expenses</div>`;
        poz1.innerHTML += `<div class="sumaCheltuieli">0</div>`;

        his.innerHTML = `<h5>History</h5>`;

        ///Mentinem salvate log-urile
        var updateExp = document.querySelector(".sumaCheltuieli");
        var updateInc = document.querySelector(".sumaVenituri");

        var contor1 = 1;
        copExps = JSON.parse(localStorage.getItem('logExps'));
        if(copExps != null){
            for(let i=0; i<copExps.length; i++)
                if(copExps[i][0] == clickedItem)
                {

                    var istoric = document.querySelector(".history");
                    istoric.innerHTML += `
                        <div class="istoricElement" >
                            <div class="leftside">
                                <div id="iconita${contor1}"></div>
                                <div class="left" id="left${contor1}"></div>
                            </div>
                            <div class="rightside">
                                <div class="right" id="right${contor1}"></div>
                                <button class="deleteW" style="background-color: #e0e0e0; margin-right: 20px;" onclick="removeDiv(this)"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>`;

                    var element1 = document.getElementById(`left${contor1}`);
                    var element2 = document.getElementById(`right${contor1}`);
                    var element3 = document.getElementById(`iconita${contor1}`);



                    element1.innerHTML += `<div class="numeActiune">${copExps[i][2]}<div>`;
                    element1.innerHTML += `<div class="dataCalendaristica">${copExps[i][5]}<div>`;
                    if(copExps[i][4] == 'option2')
                        element2.innerHTML += `<div style="color: red">${"-" + copExps[i][3]}<div>`;
                    else
                        element2.innerHTML += `<div style="color: green">${"+" + copExps[i][3]}<div>`;
                    element3.innerHTML += copExps[i][6];

                    /// update in div-uri
                    let suma = parseInt(copExps[i][3].replace(/\D/g, '')); 

                    if(copExps[i][4] == "option2")
                    {
                        let numar = parseInt(updateExp.innerText);
                        numar = numar + suma;
                        updateExp.innerHTML = numar;
                    }
                    else{

                        let numar = parseInt(updateInc.innerText);
                        numar = numar + suma;
                        updateInc.innerHTML = numar;
                    }

                    contor1++;
                }
        }

    }
});

function styleBox(venituri, cheltuieli){
    venituri.style.backgroundColor = "white";
    cheltuieli.style.backgroundColor = "white";
    venituri.style.border = "1px solid #F3F4F6";
    cheltuieli.style.border = "1px solid #F3F4F6";
    venituri.style.boxShadow = "0px 1px 2px rgba(0, 0, 0, 0.05)";
    cheltuieli.style.boxShadow = "0px 1px 2px rgba(0, 0, 0, 0.05)";
}