// function triggerHover() {
//     const hoverItems = document.querySelectorAll('.heroSection .screen-hover_effect');
//     hoverItems.forEach((item) => {
//         $(".heroSection .screen-hover_effect .screen1").hide();
//         $(".heroSection .screen-hover_effect .screen2").show();
//         console.log(item)
//     });
// }

// // Call the function to trigger hover on elements with class "hoverItem"

// $(".slider1").hover((e) => {
//     heroSectionSlide()
// })

// $(".slider1").mouseleave(() => {
//     $(".slider2").addClass('border-purple');
//     $(".slider1").removeClass('border-purple');
//     $(".heroSection").removeClass("flex-row-reverse")
//     $(".heroSection .screen-hover_effect .screen2").hide();
//     $(".heroSection .screen-hover_effect .screen1").show();
// })

// const heroSectionSlide = () => {
//     $(".slider1").addClass('border-purple');
//     $(".slider2").removeClass('border-purple');
//     $(".heroSection").addClass("flex-row-reverse")
//     $(".heroSection .screen-hover_effect .screen1").hide();
//     $(".heroSection .screen-hover_effect .screen2").show();
// }

// setInterval(() => {
//     heroSectionSlide()
//     setTimeout(() => {
//         $(".slider2").addClass('border-purple');
//         $(".slider1").removeClass('border-purple');
//         $(".heroSection").removeClass("flex-row-reverse")
//         $(".heroSection .screen-hover_effect .screen2").hide();
//         $(".heroSection .screen-hover_effect .screen1").show();
//     }, 3000);
// }, 6000);