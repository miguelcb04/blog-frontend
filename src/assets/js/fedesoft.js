"use strict";
//jquery
//Initialize fedesoft modal



//truncatewords       letras y palabras
// for (let post of res.posts) {
//     // Ingresamos el título y contenido del post
//     postList.innerHTML += `
//     <div class="column">
//         <div class="flat-card post-container is-long" data-post-id="${post.id}" data-post-category="${post.category}">
//             <div class="left-image is-md">
//                 <img src="${post.image}" data-demo-src="${post.demoSrc}" alt="${post.title}">
//             </div>
//             <div class="post-info">
//                 <a class="post-details-link" href="">
//                     <h3 class="post-name featured">${post.author}</h3>
//                 </a>
//                 <p class="post-description">${post.post}</p>
//                 <p class="post-more">
//                     <span>Leer más</span>
//                 </p>
//             </div>
//         </div>
//     </div>
// `;
// }    





function initInfoModal() {
    if ((localStorage.getItem('update') === undefined) || (localStorage.getItem('update') === null)) {
        setTimeout(function () {
            $('#info-modal').addClass('is-active');
        }, 3000)
    }

    $('#info-modal .close-link').on('click', function () {
        if ($('#info-modal-toggle').prop('checked') === true) {
            localStorage.setItem('update', true);
        }
        $(this).closest('#info-modal').removeClass('is-active');
        $(this).closest('#info-modal').find('iframe').remove();
    })
}


function truncateWords(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
    }
    return text;
}

function truncateLetters(text, limit) {
    if (text.length > limit) {
        return text.slice(0, limit) + "...";
    }
    return text;
}

function updatePosts(url) {

    let postList = document.getElementById("posts-list");
    let links = document.getElementById("links");


    if (url) {
        // Reiniciamos los posts actuales
        postList.innerHTML = "";
        // Llamamos a la API de posts con Fetch
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log('Response from API:', res); // Añade esto para depuración

                // Verificamos si res.posts es un array
                if (!Array.isArray(res.posts)) {
                    console.error('Response posts is not an array:', res.posts);
                    throw new TypeError("Response posts is not an array");
                }

                // Obtenemos y recorremos los posts obtenidos
                for (let post of res.posts) {
                    // Truncamos el autor y el contenido del post
                    const truncatedAuthor = truncateLetters(post.author, 50); // Cambia 50 por el número de letras que deseas
                    const truncatedPost = truncateLetters(post.post, 120); // Cambia 30 por el número de palabras que deseas

                    // Ingresamos el título y contenido del post
                    postList.innerHTML += `
                <div class="column">
                  <div class="flat-card post-container is-long" data-post-id="${post.id}" data-post-category="${post.category}">
                    <div class="left-image is-md">
                      <img src="${post.image}" data-demo-src="${post.demoSrc}" alt="${post.title}">
                    </div>
                    <div class="post-info">
                      <a class="post-details-link" href="">
                        <h3 class="post-name featured">${truncatedAuthor}</h3>
                      </a>
                      <p class="post-description">${truncatedPost}</p>
                      <p class="post-more">
                        <span>Leer más</span>
                      </p>
                    </div>
                  </div>
                </div>
              `;
                }

                // Pintamos los enlaces de siguiente o anterior de la paginación
                links.innerHTML = '<div class="pagination-container"></div>';
                const paginationContainer = document.querySelector('.pagination-container');
                console.log(res.page, res.total_posts);

                if (res.page > 1) {
                    paginationContainer.innerHTML += `<button class="pagination-button" onclick="updatePosts('http://localhost:3000/api/posts?page=${res.page - 1}')">Atrás</button>`;
                }
                if (res.page < res.total_posts) {
                    paginationContainer.innerHTML += `<button class="pagination-button" onclick="updatePosts('http://localhost:3000/api/posts?page=${res.page + 1}')">Siguiente</button>`;
                }
            })
            .catch(error => {
                console.error('Error fetching posts:', error); // Añade esto para depuración
            });
    }
}


$(document).ready(function () {


    // Llamada inicial a la API
    
    // updatePosts("http://localhost:3000/api/posts?page=1"); //En local
    updatePosts("https://blog-backend-beta-khaki.vercel.app/api/posts?page=1"); //En vercel 

    //Page loader
    if ($('.pageloader').length) {

        $('.pageloader').toggleClass('is-active');

        $(window).on('load', function () {
            setTimeout(function () {
                $('.pageloader').toggleClass('is-active');
                $('.infraloader').removeClass('is-active')
            }, 700);
        })
    }

    //Navbar Clone
    if ($('#navbar-clone').length) {
        $(window).scroll(function () {
            var height = $(window).scrollTop();
            if (height > 50) {
                $("#navbar-clone").addClass('is-active');
            } else {
                $("#navbar-clone").removeClass('is-active');
            }
        });
    }

    //Mobile menu toggle
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function () {
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
        .on('click', function (event) {
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
                    }, 550, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
})