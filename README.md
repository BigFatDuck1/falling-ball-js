# Falling ball

_A ball translates a bit when user begins to scroll, remains fixed as the user
continues scrolling, and when scrolling has reached the bottom of the page,
the ball falls to the "floor"._

[Demo here](https://bigfatduck1.github.io/falling-ball-js/)

## Docs

1. Initial translation is achieved with `position: sticky` and setting a top of `top: 100px`.

2. The ball falls through a set of `.divs` each at 200px each. There is no actual translation of the ball, the user just keep on scrolling, and it is the content that continues to move upwards in the background (that's why I added solid borders to each div).

3. When scrolling has reached the bottom of the page, the ball falls to the floor set by `var(--floor)`. This is done by modifying the `top` property of `position: sticky`: instead of 100px, it is modified to `top: 70vh`. Because of the `transition: top 2s ease-out`, the ball transitions to the new position (the distance between `100px` and `70vh`) over 2 seconds.

4. When has scrolling reached the bottom of the page? This is achieved by three DOM elements: `scrollTop`, `clientHeight`, and `scrollHeight`.

    * `scrollTop` is the difference between the top of the container and the top of the element _inside_ the container. When no scrolling has happened yet, `scrollTop = 0` because the top of the container coincides (occupies the same position) as the top of the element inside the container. Subsequent scrolling changes `scrollTop` to equal whatever the distance is between the top of the element (which is now unseen, because it is above the viewport) and the top of the container.

    In this case, the container is set to `document.documentElement`, which just so happens is equal to the root element as well as the viewport:\

    ```js
    let scroll_top = Math.floor(document.documentElement.scrollTop)
    ```

    Therefore, `scroll_top` changes when you change the size of the window i.e. viewport height.

    * Viewport height changes when the user resizes the window, so this needs to be obtained dynamically instead of being hard-coded. This is done through the clientHeight property:\

    ```js
     let viewport_height = document.querySelector("html").clientHeight;
     ```

    * The height of the content is independent of the size of the viewport - it is always composed of all the heights of all the children elements. This property is named `scrollHeight` (honestly, I was initially confused):

    ```js
    let content_height = document.querySelector("body").scrollHeight;
    ```

5. Whenever the user scrolled, there is an event listener that listens for this event. This calls a function that checks the current `scrollTop` (recall that this is a dynamic property). The maximum scroll height has already been defined: it is `content_height - viewport_height` because the only reason scrolling is necessary is because the contents have overflowed beyond the viewport, and by obtaining the difference, that difference is the maximum `scrollTop`. Whenever `scrollTop == (content_height - viewport_height)`, the called function adds a class named `.fall` to the basketball, which handles all the falling property, including transition (the falling part) and changing the basketball to a football.

    ```js
    document.addEventListener("scroll", function() {
        ...
        if (scroll_top == max_scrollTop) {
            console.log("Bottom of page");
            document.querySelector(".ball").classList.add("fall");        
        }
        ...
    });
    ```

6. The class `.fall` is removed whenever the user scrolls back up. This is done by detecting whether the `scrollTop` is less than `max_scrollTop` - in other words, is the distance decreasing?

    ```js
    if (scroll_top < max_scrollTop) {
        document.querySelector(".ball").classList.remove("fall");
    }
    ```

7. There is a bug: because the :basketball: changes to a :soccer: on transition end through `"transitionend"` event listener, it also turns into a :soccer: when the `.fall` class is removed and the ball goes back upwards i.e. when the user scrolls upwards. This is solved by changing the ball to a :basketball: when the user scrolls up:

    ```js
    if (scroll_top < max_scrollTop) {
        document.querySelector(".ball").classList.remove("fall");
        //Add this
        document.querySelector(".ball").textContent = "🏀";

    }
    ```

Voila! It's finished!
