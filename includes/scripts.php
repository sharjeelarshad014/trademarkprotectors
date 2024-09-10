<script type="text/javascript" src="/trademarkprotectors/assets/js/vendors.js"></script>
<script type="text/javascript" src="/trademarkprotectors/assets/js/fingerPrint.js"></script>
<script type="text/javascript" src="/trademarkprotectors/assets/js/functions.js"></script>
<script type="text/javascript" src="/trademarkprotectors/assets/js/form-functions.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<!-- Include jQuery Mousewheel Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>


<script>

    // function showTextsSequentially() {
    //     const $texts = $('.loader-text');
    //     let currentIndex = 0;

    //     function showNextText() {
    //         // Fade out the current text
    //         $texts.eq(currentIndex).css('opacity', 0);

    //         // Move to the next text
    //         currentIndex++;

    //         // If we have reached the end, stop the animation
    //         if (currentIndex >= $texts.length) {
    //             return; // Exit and stop further calls
    //         }

    //         // Fade in the next text after a delay
    //         setTimeout(() => {
    //             $texts.eq(currentIndex).css('opacity', 1);
    //         }, 250); // Delay matches the fade-out transition time

    //         // Schedule the next text change
    //         setTimeout(showNextText, 900); // Total delay (0.3s fade-out + 0.5s display)
    //     }

    //     // Start by showing the first text
    //     $texts.eq(currentIndex).css('opacity', 1);

    //     // Begin the sequence
    //     setTimeout(showNextText, 900); // Initial delay to start the loop
    // }

    // $(window).one('load', function() {
    //     // Start text animation
    //     showTextsSequentially();

    //     // Trigger the slide-out animation for .loader-back elements
    //     setTimeout(function() {
    //         $('.loader-back').addClass('animate');

    //         // Hide the loader after the animations
    //         setTimeout(function() {
    //             const $loader = $('#loader');
    //             $loader.css('opacity', 0);
    //             setTimeout(function() {
    //                 $loader.css('display', 'none');
    //             }, 2000); // Match this timing with the slide-out animation duration
    //         }, 2000); // Initial delay to ensure animations are visible
    //     }, 4000); // Delay to allow text animations to run before adding slide-out animations
    // });

function showTextsSequentially() {
    const $texts = $('.loader-text');
    let currentIndex = 0;

    function showNextText() {
        // Fade out the current text
        $texts.eq(currentIndex).css('opacity', 0);

        // Move to the next text
        currentIndex++;

        // If we have reached the end, stop the animation
        if (currentIndex >= $texts.length) {
            return; // Exit and stop further calls
        }

        // Fade in the next text after a delay
        setTimeout(() => {
            $texts.eq(currentIndex).css('opacity', 1);
        }, 250); // Delay matches the fade-out transition time

        // Schedule the next text change
        setTimeout(showNextText, 900); // Total delay (0.3s fade-out + 0.6s display)
    }

    // Start by showing the first text
    $texts.eq(currentIndex).css('opacity', 1);

    // Begin the sequence
    setTimeout(showNextText, 900); // Initial delay to start the loop
}

    </script>