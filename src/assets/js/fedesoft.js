"use strict";

//Initialize fedesoft modal
function initInfoModal(){
    if ((localStorage.getItem('update') === undefined) || (localStorage.getItem('update') === null)){
        setTimeout(function () {
            $('#info-modal').addClass('is-active');
        }, 3000)
    }

    $('#info-modal .close-link').on('click', function(){
        if ($('#info-modal-toggle').prop('checked') === true){
            localStorage.setItem('update', true);
        }
        $(this).closest('#info-modal').removeClass('is-active');
        $(this).closest('#info-modal').find('iframe').remove();
    })
}

$(document).ready(function() {

    //Page loader
    if ($('.pageloader').length) {

        $('.pageloader').toggleClass('is-active');

        $(window).on('load', function() {
            setTimeout( function() {
                $('.pageloader').toggleClass('is-active');
                $('.infraloader').removeClass('is-active')
            }, 700 );
        })
    }

    //Navbar Clone
    if ($('#navbar-clone').length) {
        $(window).scroll(function() {
            var height = $(window).scrollTop();
            if(height  > 50) {
                $("#navbar-clone").addClass('is-active');
            } else{
                $("#navbar-clone").removeClass('is-active');
            }
        });
    }

    //Mobile menu toggle
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function(){
            $('.navbar-burger').toggleClass('is-active');
            if ($('.navbar-menu').hasClass('is-active')) {
                $('.navbar-menu').removeClass('is-active');
                $('.navbar').removeClass('is-dark-mobile');
            } else {
                $('.navbar-menu').addClass('is-active');
                $('.navbar').addClass('is-dark-mobile');
            }
        });
    }

    //Initialize Feather Icons
    feather.replace();

    // Scroll to hash
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 550, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
})