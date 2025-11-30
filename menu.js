let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');
let btnClose = menu.querySelector('.btn-close-menu'); // Seleciona o botão 'X' dentro do menu

function closeMenu() {
    menu.classList.remove('open-menu');
    overlay.style.display = 'none';
}

// 1. ABRIR MENU (clicando no ícone de lista)
btnMenu.addEventListener('click', ()=>{
  menu.classList.add('open-menu');
  overlay.style.display = 'block'; 
});

// 2. FECHAR MENU (clicando no botão 'X' dentro do menu)
btnClose.addEventListener('click', closeMenu);

// 3. FECHAR MENU (clicando no overlay/fora da nav)
overlay.addEventListener('click', closeMenu);

// NOTA: A lógica para fechar ao clicar nos links internos já está correta no script.js.