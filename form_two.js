const decrementBtns = document.querySelectorAll('.decrement');
const incrementBtns = document.querySelectorAll('.increment');
const passengerCounts = document.querySelectorAll('.passenger__count');

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

document.addEventListener("DOMContentLoaded", function () {
    function autocomplete(input, arr) {
        let currentFocus;

        input.addEventListener("input", function () {
            let a, b, i, val = this.value;

            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;

            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);

            let c = 0
            for (i = 0; i < arr.length; i++) {
                if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                    b = document.createElement("DIV");
                    b.setAttribute("class", "autocomplete-item");
                    const startIndex = arr[i].toUpperCase().indexOf(val.toUpperCase());
                    b.innerHTML = arr[i].substring(0, startIndex) + "<strong>" + arr[i].substr(startIndex, val.length) + "</strong>" + arr[i].substring(startIndex + val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                    b.addEventListener("click", function () {
                        input.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                    c++
                }
                if (c >= 10) {
                    break;
                }
            }
        });

        input.addEventListener("keydown", function (e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByClassName("autocomplete-item");
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
                if (elmnt != x[i] && elmnt != input) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    function fetchAutocompleteData() {
        return fetch('https://raw.githubusercontent.com/pixbs/webflow_output/master/data.json')
            .then(response => response.json())
            .then(data => {
                return data; // Assuming data is an array of strings
            })
            .catch(error => {
                console.error('Error fetching autocomplete data:', error);
                return [];
            });
    }

    fetchAutocompleteData().then(countries => {
        const inputs = document.querySelectorAll("input.autocomplete");
        inputs.forEach(input => {
            autocomplete(input, countries);
        });
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