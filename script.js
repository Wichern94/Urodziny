//  deklarujemy stałe 
const ribbonLeft = document.querySelector(".ribbon.left");
const ribbonRight = document.querySelector(".ribbon.right");
const presentBox = document.querySelector(".present-box");
const lidBox = document.querySelector(".lid-box" );
const shadow = document.querySelector(".shadow");
const giftCardOne = document.querySelector(".card1")
const giftCardSecond= document.querySelector(".card2")
const instructions = document.querySelector("#instruction")




// Śledzimy flagi
let isStretchingLeft = false;
let isStretchingRight = false;
let isLeftRibbonStretched = false;
let isRightRibbonStretched = false;
let isRibbonStretched = false;
let isLidOpen = false
let isCardOneAnimationed =false
let isCardSecondAnimationed =false
let isDraging = false;
let isDroppedInZone1 = false; // Flaga do sprawdzenia, czy element został upuszczony w strefie drop
let isDroppedInZone2 = false; // Flaga do sprawdzenia, czy element został upuszczony w strefie drop
let isPresentClosed = false;
let isPresentGone = false;
let isSteamCardDone = false; // Flaga dla karty Steam
let isVideoWatched = false; // Flaga dla karty z filmem

// zmienna dla pozycji myszy
let startX = null //<= dla wstazki
let elementStartX, elementStartY;
let newX = 0;
let newY = 0;
let dragStartX = 0;
let dragStartY = 0;

// pobieramy deufaltowe szerokosci
let initialWidthLeft = document.querySelector(".ribbon.left").offsetWidth;
let initialWidthRight = document.querySelector(".ribbon.right").offsetWidth;
console.log(initialWidthLeft);


// wyznaczamy maksymalna szerokosc rozciągniecia

const maxWidth = window.innerWidth / 2;

// funkcja sprawdzajaca ktora strona jest kliknieta

function handleMouseDown(e,side) {
    startX = e.clientX;//<= pozycja startowa
    console.log(`kliknieto w ${side}`);//<= sprawdzamy ktora strona

    if(side === "left") {  
        isStretchingLeft = true;
    } else if (side === "right") {
        isStretchingRight = true;
    }
  };

// funkcja sprawdzajaca czy uzytkownik aktualnie rozciaga
function handleMouseMove(e) {
    requestAnimationFrame(() => {
    if (isStretchingLeft) {
        const difference = Math.abs(startX - e.clientX) ; //<= odległość od pozycji startowej
        const newScale = Math.min(2, 1 + difference / maxWidth); //<= nowa szerokosc
        const newTranslate = Math.min(newScale - 1, 0);
        
        
        ribbonLeft.style.transform = `scaleX(${newScale}) rotate(-45deg) translate(-20px, -20px) `; //<= zapisujemy styl rozciagania
    };
    if (isStretchingRight) {
        // sprawdzamy jak daleko przeciągnieto mysz
        const difference = Math.abs(e.clientX - startX);
        // odejmujemy odległość myszy od pozycji startowej
        const newScale = Math.min(2, 1 + difference / maxWidth);
       
        const newTranslate = Math.max(newScale - 1, 0);
        
        // zapisujemy styl rozciagania
        ribbonRight.style.transform = `scaleX(${newScale}) rotate(135deg) translate(-20px, -20px)`;

         }
    });
};

// funkcja Podskakiwanie elementu i znikanie
function handleStretchingComplete(side) {
    // ustawiamy zmienna css na odpowiedni kąt oborotu
    console.log(`dodaje animacje dla ${side}`);

    let ribbon = side === "left" ? ribbonLeft : ribbonRight;
    
    ribbonLeft.style.setProperty("--rotate", "-45deg"); //<= ustawiamy kąt obrotu dla lewej wstazki
    ribbonRight.style.setProperty("--rotate", "135deg");

    // dodajemy animacje podskakiwania
    ribbon.classList.remove("spin-bounce");
    setTimeout(() => {
        ribbon.classList.add("spin-bounce");
    },10);
    
    

    // jak animacja sie skonczy polsekundy pozniej ribbon znika
    ribbon.addEventListener("animationend", () => {
        instructions.textContent = "👍";
        console.log(`animacja ${side} skonczona, ukrywam`);
        //<= ukrywamy wstazke
        ribbon.style.display = "none";
        if (side === "left") {
            isLeftRibbonStretched = true;
            console.log(isLeftRibbonStretched);
        } else if (side == "right") {
            isRightRibbonStretched = true;
            console.log(isRightRibbonStretched);
        }
        if (isLeftRibbonStretched && isRightRibbonStretched) {
            isRibbonStretched = true
            instructions.textContent = "Kliknij na Pokrywke";
            console.log(isRibbonStretched);
        }
            
    });
    
};
// funkcja sprwdzajaca czy wracamy do poczatkowej wartosci
function resetRibbonSize(side) {
    if (side === "left") {
        ribbonLeft.style.transform = "scaleX(1) rotate(-45deg) translate(0)";
        setTimeout(() => handleStretchingComplete("left"), 300);
    } else if (side === "right") {
        ribbonRight.style.transform = "scaleX(1) rotate(135deg) translate(0)";
        setTimeout(() => handleStretchingComplete("right"), 300);
    }
};

// funkcja do resetowania szerokosci po zakonczneiu rozciagania
function handleMouseUp() {
    if (isStretchingLeft) {
        isStretchingLeft = false; 
        resetRibbonSize("left");
        }
    if (isStretchingRight) {
        isStretchingRight = false;
        resetRibbonSize("right");
    }
};
   function stopShake(){
    
    setTimeout(()=> {
        presentBox.classList.remove("shaked"), //<= usuwamy animacje
        lidBox.classList.remove("shaked");
        shadow.classList.remove("shaked");
        presentBox.classList.add("lan"), //<= dodajemy animacje
        lidBox.classList.add("lan");
        shadow.classList.add("lan");
        },100);
        
    };
    // funkcja otwierania prezentu
    function OpenPresent(){
        if (isRibbonStretched) {
            instructions.textContent = "👉 Wyjmij Karty";
            console.log("wstazki rozciagniete moge otwierac");
            lidBox.style.cursor = "pointer"; //<= zmieniamy kursor na pointer
            lidBox.style.transform = "none"; //<= ustawiamy transformacje na none
            lidBox.offsetHeight; //<= wymuszamy przeliczenie wysokości
            lidBox.classList.add("open"); //<= dodajemy klase otwierania
        }  
        if (lidBox.classList.contains("open")) { //<= sprawdzamy czy klasa otwierania istnieje
            isLidOpen = true;
            console.log(`lid otwarty ${isLidOpen}`);
        }
        if(isLidOpen === false ) { 
           return 
        } 
        else {
            giftCardOne.classList.add("cardsUpForFirst");
            giftCardSecond.classList.add("cardsUpForSecond");
        }
            
            
            
        
            
            
        
        
        
            
           
            
            
        };
        // funkcja pokazajaca drop zone
        function dropZoneOn() {
            if (document.getElementById("drop1") && document.getElementById("drop2")) {
                console.log("drop zone juz istnieje");
                instructions.textContent = " "
                return; // Jeśli drop zone już istnieje, nie twórz jej ponownie
            }
            const dropContainer = document.createElement("div");
            dropContainer.className = "drop-container"; //tworzymy tutaj drop kontainer
            console.log( "drop conatiner stworzono");
            // Tworzymy pierwszy div 
            const dropOne = document.createElement("div");
            dropOne.id = "drop1"
            dropOne.className = "drop-area"
            dropOne.textContent = "Przeciągnij Tutaj"
            // Tworzymy drugi div 
            const dropTwo = document.createElement("div");
            dropTwo.id = "drop2"
            dropTwo.className = "drop-area"
            dropTwo.textContent = "Przeciągnij Tutaj"
            // tutaj dodje divy do kontenera
            dropContainer.appendChild(dropOne);
            dropContainer.appendChild(dropTwo);
            // dodaje kontener do body
            document.body.appendChild(dropContainer);
            // if(dropContainer.classList.contains("drop-container")) {
            //     dropContainer.classList.add(".dropZoneFull");
            //     console.log("zaraz przyjedzie");
                
            // }
        }
       
        

            

    // sprawdzamy czy karty  juz sa na gorze
        giftCardOne.addEventListener("animationend",() => {
            isCardOneAnimationed=true;
            giftCardOne.style.cursor = "grabbing";
            console.log(`pierwsza karta na gorze ${isCardOneAnimationed}`);
            if(isCardOneAnimationed && isCardSecondAnimationed) {
                 dropZoneOn()
             }      
         });
         giftCardSecond.addEventListener("animationend",() => {
             isCardSecondAnimationed=true;
             giftCardSecond.style.cursor = "grabbing"
             console.log(`druga karta na gorze ${isCardSecondAnimationed}`);
             if(isCardOneAnimationed && isCardSecondAnimationed) {
             
                  setTimeout( () => {
                     dropZoneOn()},1000)
              } 
               
          });
           
            

        //   obsluga drag and drop
let currentDraggedElement = null; // Zmienna przechowująca aktualnie przeciągany element

function mouseDown(e, element) {
    if (isCardSecondAnimationed && e) { // Sprawdzamy, czy karty są na górze
        console.log("Karty na górze, mogę przeciągać");
        isDraging = true; // Zmieniamy flagę na true
        }
        if(isDroppedInZone1 && isDroppedInZone2) {
            return 
        } else {
        dragStartX = e.clientX; // Zapisujemy pozycję startową
        dragStartY = e.clientY; // Zapisujemy pozycję startową

        currentDraggedElement = element; // Ustawiamy aktualnie przeciągany element
        elementStartX = element.offsetLeft; // Zapisujemy pozycję startową
        elementStartY = element.offsetTop; // Zapisujemy pozycję startową

        document.addEventListener("mousemove", mouseMove); // Dodajemy nasłuchiwanie na ruch myszki
        document.addEventListener("mouseup", mouseUp); // Dodajemy nasłuchiwanie na puszczenie myszki
    }
}

function mouseMove(e) {
    if (isDraging && currentDraggedElement) {
        newX = e.clientX - dragStartX; // Obliczamy nową pozycję x
        newY = e.clientY - dragStartY; // Obliczamy nową pozycję y

        currentDraggedElement.style.top = (elementStartY + newY) + "px"; // Ustawiamy nową pozycję y
        currentDraggedElement.style.left = (elementStartX + newX) + "px"; // Ustawiamy nową pozycję x

        currentDraggedElement.style.zIndex = "1000"; // Prezentujemy element na wierzchu
        currentDraggedElement.style.cursor = "grabbing"; // Zmieniamy kursor na chwytak
    }
}

function mouseUp(e) {
    const tolerance = 30;
    isDraging = false; // Zmieniamy flagę na false
    
    if (currentDraggedElement) {
        const dropOne = {
            left: document.getElementById("drop1").getBoundingClientRect().left - tolerance,
            right: document.getElementById("drop1").getBoundingClientRect().right + tolerance,
            top: document.getElementById("drop1").getBoundingClientRect().top - tolerance,
            bottom: document.getElementById("drop1").getBoundingClientRect().bottom + tolerance,
        };
        
        const dropTwo = {
            left: document.getElementById("drop2").getBoundingClientRect().left - tolerance,
            right: document.getElementById("drop2").getBoundingClientRect().right + tolerance,
            top: document.getElementById("drop2").getBoundingClientRect().top - tolerance,
            bottom: document.getElementById("drop2").getBoundingClientRect().bottom + tolerance,
        };


        
        const draggedRect = currentDraggedElement.getBoundingClientRect(); // Pobieramy pozycję przeciąganego elementu
        console.log("DropOne:", dropOne);
        console.log("DropTwo:", dropTwo);
        console.log("DraggedRect:", draggedRect);

        if(
            draggedRect.left >= dropOne.left &&
            draggedRect.right <= dropOne.right &&
            draggedRect.top >= dropOne.top &&
            draggedRect.bottom <= dropOne.bottom
        ) {
            console.log("Pierwsza karta przeciągnięta do pierwszego dropa");
            instructions.textContent = "✔️"
            const dropZone = document.getElementById("drop1"); // Pobieramy element dropa
            dropZone.appendChild(currentDraggedElement); // Dodajemy element do pierwszego dropa
            currentDraggedElement.style.position = "absolute"; // Ustawiamy pozycję na absolute
            currentDraggedElement.classList.remove("cardsUpForFirst", "cardsUpForSecond");
            currentDraggedElement.style.top = "0"; // Ustawiamy pozycję w drop zone
            currentDraggedElement.style.left = "0";
            currentDraggedElement.style.width = "100%"; // Karta zajmuje całą szerokość drop zone
            currentDraggedElement.style.height = "100%"; // Karta zajmuje całą wysokość drop zone
            currentDraggedElement.style.cursor = "pointer";
            isDroppedInZone1 = true; // Ustawiamy flagę na true
            isDraging = false;
        }
        else if(
            draggedRect.left >= dropTwo.left &&
            draggedRect.right <= dropTwo.right &&
            draggedRect.top >= dropTwo.top &&
            draggedRect.bottom <= dropTwo.bottom
        ) {
            console.log("Druga karta przeciągnięta do drugiego dropa");
            instructions.textContent = "✔️"
            document.getElementById("drop2").appendChild(currentDraggedElement); // Dodajemy element do drugiego dropa
            currentDraggedElement.style.position = "absolute";
            currentDraggedElement.classList.remove("cardsUpForFirst", "cardsUpForSecond");
            currentDraggedElement.style.top = "0"; // Ustawiamy pozycję w drop zone
            currentDraggedElement.style.left = "0"; // Ustawiamy pozycję na absolute
            currentDraggedElement.style.width = "100%"; // Karta zajmuje całą szerokość drop zone
            currentDraggedElement.style.height = "100%"; // Karta zajmuje całą wysokość drop zone
            currentDraggedElement.style.cursor = "pointer";
            isDroppedInZone2 = true; // Ustawiamy flagę na true
            isDraging = false;
        }
        if (!isDroppedInZone1 && !isDroppedInZone2) {
            console.log("Karta nie została przeciągnięta do dropa, wraca na miejsce");
            currentDraggedElement.style.top = elementStartY + "px"; // Ustawiamy pozycję y na startową
            currentDraggedElement.style.left = elementStartX + "px"; // Ustawiamy pozycję x na startową
            currentDraggedElement.style.zIndex = "1"; // Przywracamy z-index

            
        }
    }

    currentDraggedElement = null; // Resetujemy aktualnie przeciągany element
    document.removeEventListener("mousemove", mouseMove); // Usuwamy nasłuchiwanie na ruch myszki
    document.removeEventListener("mouseup", mouseUp); // Usuwamy nasłuchiwanie na puszczenie myszki

if (isDroppedInZone1 && isDroppedInZone2){
        instructions.textContent = "👇 Zamknij Pudełko"}
};
//  funkcja zamykania prezentu
function closePresent() {
    if (isDroppedInZone1 && isDroppedInZone2){
        instructions.textContent = "👇 Zamknij Pudełko"
         
        isLidOpen = false; // flaga ze wieko jest zamkniete
        isDraging = false; // flaga ze juz nie przeciagamy
        console.log(isDraging);

        //usuwamy nasluchiwanie
        lidBox.removeEventListener("click",  OpenPresent);
        giftCardOne.removeEventListener("mousedown", (e) => mouseDown(e, giftCardOne));
        giftCardSecond.removeEventListener("mousedown", (e) => mouseDown(e, giftCardSecond));
        //usuwamy klasy
        lidBox.classList.remove("lan");
        lidBox.classList.add("close");
        lidBox.style.top = "";
        lidBox.addEventListener("animationend", ()=> {
            isPresentClosed = true;
            console.log(` to ${isPresentClosed} ze prezent zamknieto`);
            presentGoAway()
        },{ once: true })
        lidBox.classList.remove("open");
        giftCardOne.classList.remove("cardsUpForFirst");
        giftCardSecond.classList.remove("cardsUpForSecond");
    }
}
// funkcja usuwajaca zamkniety prezent
    function presentGoAway(){
        if (isPresentClosed) {
            instructions.style.top = "543px";
            instructions.textContent = "👇   przyjżyj się kartą     👇"
            lidBox.classList.remove("close");
            presentBox.classList.remove("lan");
            shadow.classList.remove("lan");
            lidBox.classList.add("present-hide");
            presentBox.classList.add("present-hide");
            shadow.classList.add("present-hide");
            presentBox.addEventListener("animationend", ()=> {
                isPresentGone = true;
                console.log(` to ${isPresentGone} ze prezent odjechał`);
            }, { once: true });

        }
    }
    
    //  funkcja interakcji z filmem
    function turnAroundBlackOne() {
       
        if (isPresentGone) {
            giftCardOne.classList.add("into-vid");
            giftCardOne.addEventListener("animationend" , () =>{
            const video = document.createElement("video");
            video.src ="assets/zyczenia.mp4";
            video.classList.add("video-to-middle")
            video.controls = true;
            video.autoplay = false;
            document.body.appendChild(video);
            video.addEventListener("ended", () => {
                isVideoWatched = true;
                checkDropZoneReady(); // Sprawdzamy, czy drop zone może wjechać
              });
            video.addEventListener("click", (e) => {
                e.stopPropagation();
              });
        },{ once: true })
       }
   }
//  usuwanie filmu
   document.body.addEventListener("click", () => {
    const existingVideo = document.querySelector(".video-to-middle");
    if (existingVideo) {
      existingVideo.classList.add("fade-out");
      existingVideo.addEventListener("animationend", () => {
        existingVideo.remove();
      }, { once: true });
    }
  });


//   funkcja interakcji z karta

function turnAroundSteamOne() {
       
    if (isPresentGone) {
        giftCardSecond.classList.add("into-key");
        giftCardSecond.addEventListener("animationend" , () =>{
        const steamKey = "QFN6P-3NIN9-34F98";
        const keyDiv = document.createElement("div");
        keyDiv.textContent = `Karta podarunkowa: ${steamKey}`;
        giftCardSecond.appendChild(keyDiv);

        const logo = document.createElement("img");
        logo.src = "assets/Steam_icon_logosvg.svg";
        logo.alt = "Steam Logo";
        logo.classList.add("steam-logo");
        giftCardSecond.appendChild(logo);

        // przycisk
        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Z kopiuj Sobie";
        giftCardSecond.appendChild(copyBtn);

        copyBtn.addEventListener("click",() =>{
            isSteamCardDone = true;
            checkDropZoneReady();
            navigator.clipboard.writeText(steamKey)
                .then( () => alert("klucz skopiowany!"))
                .catch( () => alert("Błąd kopiowania"));
        });
        
            
          
    }, { once: true });
   }
}

function checkDropZoneReady() {
    if (isSteamCardDone && isVideoWatched) {
      // Tutaj dodajemy kod, który uruchomi animację dla drop zone
      console.log("Obie karty gotowe! Drop zone wraca na ekran.");
      // Możesz tutaj np. dodać klasę do drop zone, żeby ją animować
      const dropMoveOut = document.querySelector(".drop-container")
      dropMoveOut.classList.add("drop-zone-out");
      dropMoveOut.addEventListener("animationend", (e) =>{
        if(e.animationName ==="dropZoneOffTable"){
        dropMoveOut.remove();

        instructions.textContent = "🐣🐣 Wesołych Świąt dla całej rodzinki🐣 oraz jeszcze raz 100 Lat"
        }
      })
    }
  }

            

           
            

        
           
            
           
                
            
                    
                
            
                    

            



            

            
        
        
        
    
    
        
        


// Dodajemy nasłuchiwanie na zdarzenie `mousedown` dla obu kart
giftCardOne.addEventListener("mousedown", (e) => mouseDown(e, giftCardOne));
giftCardSecond.addEventListener("mousedown", (e) => mouseDown(e, giftCardSecond));


//  dodajemy nasłuchiwanie na zdarzenie myszy
ribbonLeft.addEventListener("mousedown", (e) => handleMouseDown(e, "left"));//
ribbonRight.addEventListener("mousedown", (e) => handleMouseDown(e,"right"));
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
ribbonLeft.addEventListener("mouseenter", stopShake);
ribbonRight.addEventListener("mouseenter", stopShake);
lidBox.addEventListener("click",  OpenPresent);
lidBox.addEventListener("click",  closePresent);
giftCardOne.addEventListener("click", turnAroundBlackOne);
giftCardSecond.addEventListener("click", turnAroundSteamOne);






