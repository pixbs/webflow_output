const decrementBtns = document.querySelectorAll('.decrement');
const incrementBtns = document.querySelectorAll('.increment');
const passengerCounts = document.querySelectorAll('.passenger__count');

console.log(decrementBtns, incrementBtns, passengerCounts)

if (decrementBtns && incrementBtns && passengerCounts) {
    decrementBtns.forEach((decrementBtn, index) => {
        decrementBtn.addEventListener('click', () => {
            let count = parseInt(passengerCounts[index].innerHTML);
            
            if (count > 1) {
                passengerCounts[index].innerHTML = count - 1;
            }
        });
    });

    incrementBtns.forEach((incrementBtn, index) => {
        incrementBtn.addEventListener('click', () => {
            let count = parseInt(passengerCounts[index].innerHTML);
            
            passengerCounts[index].innerHTML = count + 1;
        });
    });
} else {
    console.error("Element(s) not found in the DOM");
}


document.addEventListener("DOMContentLoaded", function() {
		const airports = ["El Arish International Airport (AAC)\nEgypt","Rabah Bitat Airport (AAE)\nAlgeria","Apalachicola Regional Airport (AAF)\nUnited States of America","Arapoti Airport (AAG)\nBrazil","Aachen-Merzbr\u00fcck Airport (AAH)\nGermany","Arraias Airport (AAI)\nBrazil","Buariki Airport (AAK)\nKiribati","Aalborg Airport (AAL)\nDenmark","Malamala Airport (AAM)\nSouth Africa","Al Ain International Airport (AAN)\nUnited Arab Emirates","Anaco Airport (AAO)\nVenezuela","Anapa Vityazevo Airport (AAQ)\nRussia","Aarhus Airport (AAR)\nDenmark","Asau Airport (AAU)\nSamoa","Allah Valley Airport (AAV)\nPhilippines","Romeu Zema Airport (AAX)\nBrazil","Al Ghaidah International Airport (AAY)\nYemen","Quezaltenango Airport (AAZ)\nGuatemala","Abakan Airport (ABA)\nRussia","Asaba International Airport (ABB)\nNigeria"];

    function autocomplete(inp, arr) {
    let currentFocus;

    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        // Limit the number of suggestions to 10
        let count = 0;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
                count++;
            }
            if (count >= 10) {
                break; // Stop after 10 suggestions
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

    let inputs = document.querySelectorAll(".from__airport", ".to__airport");
    inputs.forEach(input => {
        autocomplete(input, airports);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons with class name starting with 'hide__form_'
    const buttons = document.querySelectorAll('[class^="hide__form_"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonClass = Array.from(button.classList).find(cls => cls.startsWith('hide__form_'));
            const number = buttonClass.split('hide__form_')[1];
            
            console.log('Button class:', buttonClass);
            console.log('Extracted number:', number);
            
            const inputGroup = document.querySelector(`.form_group_${number}`);
            console.log('Input group element:', inputGroup);
            
            if (inputGroup) {
                inputGroup.classList.add('hidden');
                console.log(`Added 'hidden' class to .form_group_${number}`);
            } else {
                console.log(`No element found with class .form_group_${number}`);
            }
        });
    });

		let currentElementIndex = 1;
    const totalElements = 3; 

    const showNextButton = document.querySelector('.show_next');
    showNextButton.addEventListener('click', function() {
        const inputGroup = document.querySelector(`.form_group_${currentElementIndex}`);
        console.log('Input group element to show:', inputGroup);
        if (inputGroup) {
            inputGroup.classList.remove('hidden');
            console.log(`Removed 'hidden' class from .form_group_${currentElementIndex}`);
        } else {
            console.log(`No element found with class .form_group_${currentElementIndex}`);
        }
        
        currentElementIndex++;
        if (currentElementIndex > totalElements) {
            currentElementIndex = 1;
        }
    });
});