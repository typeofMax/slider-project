const imagesData = [{
    url: "img/slider-1.jpg",
    city: "Rostov-on-Don",
    cityApart:  "LCD admiral",
    area: "81 m2",
    repairTime: "3.5 months"
}, {
    url: "img/slider-2.jpg",
    city: "Sochi",
    cityApart: "Thieves",
    area: "105 m2",
    repairTime: "4 months"
}, {
    url: "img/slider-3.jpg",
    city: "Rostov-on-Don",
    cityApart: "Patriotic",
    area: "93 m2",
    repairTime: "3 months"
}]

function initSlider() {
    if (!imagesData || !imagesData.length) return;

    let mediaDiv = document.querySelector(".slider-media");
    let sliderImg = mediaDiv.querySelector(".slider-imgs");
    let navDiv = document.querySelector(".slider-navigation-buttons");
    let aboutProject = document.querySelector(".slider-description-completed-about");
    let containerSlider = document.querySelector(".container-slider");

    initImagesData();
    initArrows();
    initCircles();
    initUrls();

    function initImagesData() {
        imagesData.forEach((imgData, index) => {
            let active = "";
            if (index === 0) active = " active";
            let imgTag = `<img src="${imagesData[index].url}" data-index="${index}" class="img-slider${active}" alt="${imagesData[index].city} ${imagesData[index].cityApart}">`;
            sliderImg.innerHTML += imgTag;

            let cityTag = `<span data-index="${index}" class="no-active${active}">${imagesData[index].city}<br>
                           ${imagesData[index].cityApart}</span>`
            aboutProject.querySelector(".city-data").innerHTML += cityTag;

            let areaTag = `<span data-index="${index}" class="no-active${active}">${imagesData[index].area}</span>`;
            aboutProject.querySelector(".apartment-data").innerHTML += areaTag;

            let timeTag = `<span data-index="${index}" class="no-active${active}">${imagesData[index].repairTime}</span>`;
            aboutProject.querySelector(".time-data").innerHTML += timeTag;
        });
    }

    function initArrows() {        

        navDiv.querySelectorAll(".slider-arrow").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let curNumber = +sliderImg.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? imagesData.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === imagesData.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        })
    }

    function initCircles() {
        imagesData.forEach((image, index) => {
            let circle = `<div class="nav-circle ${index===0 ? "active" : ""}" data-index="${index}"></div>`;
            navDiv.querySelector(".circles").innerHTML += circle;
        });
        navDiv.querySelectorAll(".nav-circle").forEach(circle => {
            circle.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
        });
    }

    function initUrls() {
        mediaDiv.querySelectorAll(".url-project").forEach(urlProject => {
            urlProject.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
        });
    }

    function moveSlider(num) {

        containerSlider.querySelectorAll(".active").forEach((index) => {
            index.classList.remove("active");
        });

        containerSlider.querySelectorAll(`[data-index="${num}"]`).forEach((index) => {
            index.classList.add("active");
        });

    }
}

document.addEventListener("DOMContentLoaded", initSlider);