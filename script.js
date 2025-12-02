/**
 * ===========================================
 * 1. LÓGICA DE INTERSECTION OBSERVER (ANIMAÇÃO)
 * ===========================================
 */
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const homeInformations = document.querySelectorAll('.hidden')
homeInformations.forEach((homeInformation) => myObserver.observe(homeInformation))


/**
 * ===========================================
 * 2. LÓGICA DO CARROSSEL DE PRODUTOS
 * Este bloco agora contém toda a funcionalidade necessária
 * para deslizar o track das imagens e sincronizar as descrições.
 * ===========================================
 */
document.addEventListener('DOMContentLoaded', () => {


    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    // 1. Seletores dos Elementos
    const carouselTrack = document.querySelector('.carousel-images-track');
    const descriptionItems = document.querySelectorAll('.carousel-description-item');
    const prevButton = document.querySelector('.carousel-navigation .prev');
    const nextButton = document.querySelector('.carousel-navigation .next');
    const images = document.querySelectorAll('.carousel-images-track img');



    // Verifica se todos os elementos existem
    if (carouselTrack && descriptionItems.length > 0 && prevButton && nextButton && images.length > 0) {
        let currentIndex = 0;
        const totalImages = images.length;

        // Obtém a largura da imagem para calcular o deslize
        const getImageWidth = () => images[0].clientWidth;

        function updateCarousel() {
            const imageWidth = getImageWidth();

            // 🐛 CORREÇÃO APLICADA AQUI:
            // Aplica a translação horizontal no track do carrossel.
            carouselTrack.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

            // Sincroniza a descrição do produto
            descriptionItems.forEach(item => {
                item.classList.remove('active');
            });

            const activeProduct = images[currentIndex].dataset.product;
            const currentDescription = document.querySelector(`.carousel-description-item[data-product="${activeProduct}"]`);

            if (currentDescription) {
                currentDescription.classList.add('active');
            }
        }

        // Navegação manual: Anterior (Com Loop)
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateCarousel();
        });

        // Navegação manual: Próximo (Com Loop)
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

      // Aplica o debounce para ajustar o carrossel se a janela for redimensionada
        const handleResize = debounce(() => updateCarousel());
        
        window.addEventListener('resize', handleResize);

        // Inicializa o carrossel no primeiro item
        updateCarousel();
    }
});


/**
 * ===========================================
 * 3. LÓGICA DE SCROLL SUAVE PARA LINKS INTERNOS
 * ===========================================
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId && targetId !== '#' && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                const menuMobile = document.getElementById('menu-mobile');
                if (menuMobile && menuMobile.classList.contains('open-menu')) {
                    menuMobile.classList.remove('open-menu');
                    const overlayMenu = document.getElementById('overlay-menu');
                    if (overlayMenu) {
                        overlayMenu.style.display = 'none';
                    }
                }
            }
        }
    });
});