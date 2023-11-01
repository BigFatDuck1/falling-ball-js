
let previous_scroll = 0;

document.addEventListener('scroll', function() {
    //scrollTop is the difference between top of content and top of container
    //i.e. the gap between what cannot be seen and the height of the viewport
    let scroll_top = Math.floor(document.documentElement.scrollTop);
    console.log(scroll_top);
    //Viewport height
    let viewport_height = document.querySelector("html").clientHeight;
    //Content height
    let content_height = document.querySelector("body").scrollHeight;
    //console.log(content_height - viewport_height); 
    //console.log(`scrollTop: ${scroll_top}`);
    let max_scrollTop = content_height - viewport_height;
    //Reached bottom
    if (scroll_top == max_scrollTop) {
        console.log("Bottom of page");
        document.querySelector(".ball").classList.add("fall");        
    }   
    //If scrolling back up
    if (scroll_top < max_scrollTop) {
        document.querySelector(".ball").classList.remove("fall");
        document.querySelector(".ball").textContent = "🏀";
    }
});

//Change to a football on transition end
document.querySelector(".ball").addEventListener("transitionend", function() {
    //scrollTop is the difference between top of content and top of container
    //i.e. the gap between what cannot be seen and the height of the viewport
    let scroll_top = Math.floor(document.documentElement.scrollTop);
    //Viewport height
    let viewport_height = document.querySelector("html").clientHeight;
    //Content height
    let content_height = document.querySelector("body").scrollHeight;

    //This is necessary because otherwise on upwards transition end, the ball will also change to a football
    if (scroll_top == content_height - viewport_height) {
        document.querySelector(".ball").textContent = "⚽️";
    }
}); 