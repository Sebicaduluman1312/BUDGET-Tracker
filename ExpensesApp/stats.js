const statButton = document.querySelector('.statistics');

statButton.addEventListener('click', function() {
    bodyElement.classList.add('blur1');

    const modalElement = document.createElement('div');
    modalElement.classList.add('modal1');

    modalElement.innerHTML = `
    <div style="display: flex; justify-content: flex-end;">
        <button class="close-modal1">X</button>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <div class="cata" style=" height: 100px; width: 80%; margin-top: 30px; display: flex; justify-content: space-between"; align-items: center;></div>
        <div class="sume" style=" height: 100px; width: 80%; margin-top: -50px; display: flex; justify-content: space-between"; align-items: center;></div>
    </div>
    <div class="graph" style="display: flex; justify-content: center; flex-direction: column;">
        <div class="sumtot" style="display: flex; justify-content: center;"></div>
    </div>

    `;

    var categs = JSON.parse(localStorage.getItem('logExps'));
    categs.sort(function(a, b) {
        if (a[0] < b[0]) {
          return -1;
        }
        if (a[0] > b[0]) {
          return 1;
        }
        if (a[1] < b[1]) {
          return -1;
        }
        if (a[1] > b[1]) {
          return 1;
        }
        return 0;
      });
      
    

    console.log(categs);

    var divv1 = modalElement.querySelector(".cata");
    var divv2 = modalElement.querySelector(".sume");
    var divv3 = modalElement.querySelector(".sumtot");
    categs[categs.length]=[]; 

    var statistica = [];

    var suma = 0;
    var num;
    var i;
    for(i=1; i<categs.length; i++)
        if(categs[i][0] == clickedItem && categs[i][4]=="option2")
        {
            if(categs[i][1] == categs[i-1][1])
            {
                var num1 = parseInt(categs[i][3].replace(/\D/g, ''));
                suma += num1;
                statistica[statistica.length-1] = num+num1;
                divv2.lastChild.innerText = num+num1;
            }
            else
            {
                divv1.innerHTML += categs[i][6];
                num = parseInt(categs[i][3].replace(/\D/g, ''));
                suma += num;
                statistica.push(num);
                divv2.innerHTML += `<div class="numere" style="width: 30px; white-space: nowrap; font-size: 13px; text-align: center;">${num}</div>`;
            }
        }

    if(categs[0][0] == clickedItem && categs[0][4]=="option2"){
        divv1.innerHTML += categs[0][6];
        num = parseInt(categs[0][3].replace(/\D/g, ''));
        suma += num;
        statistica.push(num);
        divv2.innerHTML += `<div class="numere" style="width: 30px; white-space: nowrap; font-size: 13px; text-align: center;">${num}</div>`;
    }

    console.log(statistica);

    divv3.innerHTML += `<h3>Suma totala cheltuita pe ${clickedItem} Wallet este de: ${suma} RON </h3>`;


    const closeModalButton = modalElement.querySelector('.close-modal1');
    closeModalButton.addEventListener('click', function() {
        bodyElement.classList.remove('blur1');
        modalElement.remove();
    });


    bodyElement.appendChild(modalElement);
});