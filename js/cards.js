
export class Cards {

    constructor(images) {
        this.images = images;
    }

    addCards(selector) {
        this._selector = selector;
        const container = document.querySelector(this._selector);
        const cardsArr = this._generateCards(this.images);
        container.innerHTML = cardsArr.join("");
    }

    startGame() {
        const cards = document.querySelectorAll(".flip-card-container.closed");

        cards.forEach(card => {
            card.addEventListener("click", (e) => {
                if (!card.classList.contains("good")) {
                    card.classList.toggle("show");
                    card.classList.toggle("closed");
                }
                this._checkCards();

            });
        });
    }
    _restart() {
        let goods = document.querySelectorAll(".flip-card-container.good");
        if (goods.length == this.images.length * 2) {
            let game = confirm("Do you want to play more ?");
            if (game) {

                goods.forEach(el => {
                    el.remove();
                });

                this.addCards(this._selector);
                this.startGame();
            }
        }
    }

    _generateCards(arr) {
        const tempArr = this._getRandomArr(arr.length);
        const cardsArr = tempArr.map(num => {
            return `
            <div class="flip-card-container closed">
                <div class="flip-card">
                    <div class="card-front">
                        <figure>
                        
                        <img src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Brohm Lake">
                        </figure>
                    </div>
                
                    <div class="card-back">
                        <figure>
                        <img src="${arr[num].imgUrl}" alt="${arr[num].name}">
                        </figure>
                    </div>
                </div>
            </div>
            `;
        });

        return cardsArr;
    }

    _getRandomArr(max) {
        let rand, temp;
        const res = [];

        for (let i = 0; i < max * 2; i++) {
            rand = parseInt(Math.random() * max);
            if (res.filter(num => num == rand).length == 2) {
                i--;
            } else {
                res.push(rand);
            }
        }
        return res;
    }

    _checkCards() {
        const opened = document.querySelectorAll(".show");

        if (opened.length >= 2) {
            let el1 = opened[0].querySelector(".card-back img");
            let el2 = opened[1].querySelector(".card-back img");

            if (el1.src == el2.src) {
                opened[0].classList.remove("show");
                opened[0].classList.add("good");
                opened[1].classList.remove("show");
                opened[1].classList.add("good");
            } else {
                this._closeCards();
            }
        }
        setTimeout(() => {
            this._restart();
        }, 600);

    }

    _closeCards() {
        const cards = document.querySelectorAll(".flip-card-container.show");

        cards.forEach(card => {
            setTimeout(function () {
                card.classList.remove("show");
                card.classList.add("closed");
            }, 600);
        });
    }


}
