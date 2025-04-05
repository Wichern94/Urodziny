//  deklarujemy zmienne wstazki
const ribbonLeft = document.querySelector(".ribbon.left");
const ribbonRight = document.querySelector(".ribbon.right");
const presentBox = document.querySelector(".present-box");
const lidBox = document.querySelector(".lid-box" );

// Śledzimy flagi
let isStretchingLeft = false;
let isStretchingRight = false;

// zmienna dla pozycji myszy
let startX = null

// pobieramy deufaltowe szerokosci
let initialWidthLeft = document.querySelector(".ribbon.left").offsetWidth;
let initialWidthRight = document.querySelector(".ribbon.right").offsetWidth;
console.log(initialWidthLeft);


// wyznaczamy maksymalna szerokosc rozciągniecia

const maxWidth = window.innerWidth / 2;

// funkcja sprawdzajaca ktora strona jest kliknieta

function handleMouseDown(e,side) {
    startX = e.clientX;
    console.log(`kliknieto w ${side}`);

    if(side === "left") {
        isStretchingLeft = true;
    } else if (side === "right") {
        isStretchingRight = true;
    }
  };

// funkcja sprawdzajaca czy uzytkownik aktualnie rozciaga
function handleMouseMove(e) {
    requestAnimationFrame(() =>{
    if (isStretchingLeft) {
        const difference = Math.abs(startX - e.clientX) ;
        const newScale = Math.min(2, 1 + difference / maxWidth);
        const newTranslate = Math.min(newScale - 1, 0);
        
        
        ribbonLeft.style.transform = `scaleX(${newScale}) rotate(-45deg) translate(-20px, -20px) `;
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
    
    ribbonLeft.style.setProperty("--rotate", "-45deg");
    ribbonRight.style.setProperty("--rotate", "135deg");

    // dodajemy animacje podskakiwania
    ribbon.classList.remove("spin-bounce");
    setTimeout(() => {
ribbon.classList.add("spin-bounce");
    },10);
    
    // ribbonRight.classList.add("spin-bounce");

    // jak animacja sie skonczy polsekundy pozniej ribbon znika
    ribbon.addEventListener("animationend", () =>{
        console.log(`animacja ${side} skonczona, ukrywam`);
        
        ribbon.style.display = "none;"
       
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
    presentBox.classList.add("stopped"),
    lidBox.classList.add("stopped");
   };
   
  
    
        
    
        
        
        


//  dodajemy nasłuchiwanie na zdarzenie myszy
ribbonLeft.addEventListener("mousedown", (e) => handleMouseDown(e, "left"));
ribbonRight.addEventListener("mousedown", (e) => handleMouseDown(e,"right"));
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
ribbonLeft.addEventListener("mouseenter", stopShake);
ribbonRight.addEventListener("mouseenter", stopShake);
