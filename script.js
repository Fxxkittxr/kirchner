// --- DADOS (MOCK) ---
const produtos = [
    { id: 1, nome: "Compressor Embraco 1/4 HP 110v R134a", categoria: "Compressores", marca: "Embraco", preco: 489.90, img: "https://www.girellirefrigeracao.com.br/upload/produto/imagem/s_motor-compressor-embraco-1-4-r134a-emr-80hlr-110v-4.webp", destaque: true, freteGratis: true, maisVendido: true },
    { id: 2, nome: "Gás Refrigerante R134a 13.6kg DAC", categoria: "Gases", marca: "Chemours", preco: 750.00, img: "https://images.tcdn.com.br/img/img_prod/917493/gs_refrigerante_r134a_cilindro_dac_136kg_refrigera_1_20250725104042_c37fa1e16f7c.png", destaque: true, freteGratis: false, maisVendido: true },
    { id: 3, nome: "Kit Manifold R410a/R22 com Mangueiras", categoria: "Ferramentas", marca: "EOS", preco: 220.50, img: "https://cdn.awsli.com.br/2500x2500/767/767714/produto/2705210714e7c74890c.jpg", destaque: false, freteGratis: true, maisVendido: false },
    { id: 4, nome: "Capacitor 35uF 380VAC Fio", categoria: "Elétrica", marca: "Dugold", preco: 35.00, img: "https://http2.mlstatic.com/D_Q_NP_2X_923195-MLB71132121952_082023-T.webp", destaque: false, freteGratis: false, maisVendido: true },
    { id: 5, nome: "Bomba de Vácuo 6CFM Duplo Estágio", categoria: "Ferramentas", marca: "Suryha", preco: 1250.00, img: "https://http2.mlstatic.com/D_832190-MLB89996676994_082025-O.jpg", destaque: true, freteGratis: true, maisVendido: false },
    { id: 6, nome: "Controlador Full Gauge TC-900E Power", categoria: "Elétrica", marca: "Full Gauge", preco: 195.00, img: "https://fullgauge-strapi-prod-media-f340da7.s3.sa-east-1.amazonaws.com/TC_900_E_POWER_6ae05541ef.png", destaque: true, freteGratis: true, maisVendido: true },
    { id: 7, nome: "Kit Tubo Cobre 1/4 e 3/8 (5m)", categoria: "Instalação", marca: "Eluma", preco: 180.00, img: "https://cdn.awsli.com.br/2094/2094747/produto/307926074/d_730396-mlb79444751754_102024-o-1cp2nvpntv.jpg", destaque: false, freteGratis: false, maisVendido: true },
    { id: 8, nome: "Motor Ventilador Axial 300mm FN030-4EK.WC.V7", categoria: "Ventiladores", marca: "ZIEHLABEGG", preco: 145.00, img: "https://images.tcdn.com.br/img/img_prod/570101/motor_ventilador_axial_300mm_fn030_4ek_wc_v7_ziehlabegg_19299_2_e36b359c13ddc866bff3ca34b7b706f5_20251103121649.jpg", destaque: false, freteGratis: true, maisVendido: false },
];

const marcas = [
    { nome: "Embraco", img: "https://images.seeklogo.com/logo-png/31/2/embraco-logo-png_seeklogo-315841.png" },
    { nome: "Danfoss", img: "https://images.seeklogo.com/logo-png/3/2/danfoss-logo-png_seeklogo-38450.png" },
    { nome: "Full Gauge", img: "https://d5gag3xtge2og.cloudfront.net/producao/33153086/G/logo.png" },
    { nome: "EOS", img: "https://yt3.googleusercontent.com/UNjWYqIzIamCkv9-zapGRw2RHm8pjt1Mo0tMFLFdm2mKAd-7e4ykkzCI2KoVbnDxI1OXHez26A=s900-c-k-c0x00ffffff-no-rj" }, // Placeholder se nao carregar
    { nome: "Thebe", img: "https://images.seeklogo.com/logo-png/30/2/thebe-bombas-hidraulicas-logo-png_seeklogo-305741.png" },
];

const banners = [
    "https://via.placeholder.com/1200x300/0d47a1/ffffff?text=Ofertas+Imperdiveis+de+Verao",
    "https://via.placeholder.com/1200x300/c01a0e/ffffff?text=Ferramentas+em+ate+10x",
    "https://via.placeholder.com/1200x300/1a1a1a/ffffff?text=Frete+Gratis+Sul+e+Sudeste",
    "https://via.placeholder.com/1200x300/ff9800/ffffff?text=Pecas+Originais+Brastemp"
];

// --- ESTADO DA APLICAÇÃO ---
let carrinho = [];
let favoritos = [];
let bannerIndex = 0;
let bannerInterval = null;

// --- INICIALIZAÇÃO ---
window.onload = () => {
    renderHome();
    iniciarBanner();
    atualizarCarrinhoUI();
};

// --- NAVEGAÇÃO SPA ---
function navigateTo(viewId) {
    // Esconde todas as views
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    
    // Lógica específica para cada view
    if (viewId === 'home') {
        renderHome();
        document.getElementById('view-home').classList.add('active');
    } else if (viewId === 'favorites') {
        renderFavoritos();
        document.getElementById('view-favorites').classList.add('active');
    } else if (viewId === 'register') {
        document.getElementById('view-register').classList.add('active');
    }
    
    // Reseta scroll
    window.scrollTo(0, 0);
}

function iniciarBanner() {
    const img = document.getElementById('bannerImg');
    
    // 1. LIMPEZA: Se já existir um timer rodando, mata ele antes de criar outro.
    // Isso impede que os banners se sobreponham ou pisquem.
    if (bannerInterval) clearInterval(bannerInterval);

    // 2. CRIA O NOVO TIMER
    bannerInterval = setInterval(() => {
        // Passo A: Começa a sumir (fade-out)
        img.style.opacity = 0;

        // Passo B: Espera o tempo da transição do CSS (que é 1s = 1000ms)
        setTimeout(() => {
            // Avança o índice
            bannerIndex = (bannerIndex + 1) % banners.length;
            
            // Troca a imagem (enquanto ela está invisível)
            img.src = banners[bannerIndex];
            
            // IMPORTANTE: Só faz aparecer de novo quando a imagem carregar
            // Isso evita mostrar imagem quebrada ou espaço em branco se a net for lenta
            img.onload = () => {
                img.style.opacity = 1; // Fade-in
            };
            
            // Fallback: Se a imagem já estiver em cache, o onload pode não disparar
            // então forçamos a aparição após um breve momento por segurança
            setTimeout(() => img.style.opacity = 1, 50);

        }, 1000); // Esse 1000 deve ser igual ao tempo de transição no CSS

    }, 5000); // Troca de banner a cada 5 segundos (4s + 1s de transição)
}

// --- LOGICA DA HOME ---
function renderHome() {
    // Renderiza Seções
    renderHorizontalList('gridFreteGratis', produtos.filter(p => p.freteGratis));
    renderHorizontalList('gridDestaques', produtos.filter(p => p.destaque));
    renderHorizontalList('gridMaisProcurados', produtos.filter(p => p.maisVendido));
    
    // Renderiza Marcas
    const gridMarcas = document.getElementById('gridMarcas');
    gridMarcas.innerHTML = '';
    marcas.forEach(marca => {
        const div = document.createElement('div');
        div.className = 'brand-item';
        div.onclick = () => filtrarMarca(marca.nome);
        div.innerHTML = `<img src="${marca.img}" alt="${marca.nome}" onerror="this.src='https://via.placeholder.com/100?text=${marca.nome}'">`;
        gridMarcas.appendChild(div);
    });
}

function renderHorizontalList(containerId, lista) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // Se a lista estiver vazia, nem renderiza nada e esconde os botões
    if (lista.length === 0) {
        atualizarBotoesCarrossel(containerId);
        return;
    }

    lista.forEach(prod => container.appendChild(criarCard(prod)));
    
    // VERIFICAÇÃO IMEDIATA: Após adicionar os cards, verifica se precisa dos botões
    // O setTimeout(..., 0) garante que o navegador já renderizou o tamanho dos elementos
    setTimeout(() => {
        atualizarBotoesCarrossel(containerId);
    }, 0);
}

function criarCard(prod) {
    const div = document.createElement('div');
    div.className = 'card';
    
    // Verifica se já é favorito para marcar a classe 'active'
    const isFav = favoritos.includes(prod.id) ? 'active' : '';
    const iconFav = isFav ? 'favorite' : 'favorite_border';

    // AQUI ESTÁ A MUDANÇA:
    // 1. Adicionei a classe "fav-btn-${prod.id}" para identificar o botão.
    // 2. Removi o "this" do onclick, pois vamos buscar os botões pelo ID.
    div.innerHTML = `
        <div class="fav-btn ${isFav} fav-btn-${prod.id}" onclick="toggleFavorito(${prod.id})">
            <span class="material-icons">${iconFav}</span>
        </div>
        <div class="card-img-container" onclick="abrirProduto(${prod.id})">
            <img src="${prod.img}" alt="${prod.nome}">
        </div>
        <div class="card-body" onclick="abrirProduto(${prod.id})">
            ${prod.freteGratis ? '<span class="card-tag">Frete Grátis</span>' : ''}
            <div class="card-title">${prod.nome}</div>
            <div class="card-price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>
            <div class="card-installments">ou 10x de R$ ${(prod.preco/10).toFixed(2).replace('.', ',')}</div>
        </div>
    `;
    return div;
}

// --- BANNER ---
function iniciarBanner() {
    const img = document.getElementById('bannerImg');
    setInterval(() => {
        bannerIndex = (bannerIndex + 1) % banners.length;
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = banners[bannerIndex];
            img.style.opacity = 1;
        }, 200);
    }, 4000);
}

// --- DETALHES DO PRODUTO ---
function abrirProduto(id) {
    const prod = produtos.find(p => p.id === id);
    if (!prod) return;

    const content = document.getElementById('productDetailContent');
    content.innerHTML = `
        <div class="detail-gallery">
            <img src="${prod.img}" alt="${prod.nome}">
        </div>
        <div class="detail-info">
            <div class="detail-cat">${prod.categoria} | ${prod.marca}</div>
            <h1 class="detail-title">${prod.nome}</h1>
            <div class="detail-price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>
            <p style="margin-bottom:20px;">Código: #${prod.id}9938 | Em estoque</p>
            
            <div class="qty-selector">
                <label>Quantidade:</label>
                <input type="number" id="qtyInput" value="1" min="1">
            </div>

            <div class="action-buttons">
                <button class="btn-buy-now" onclick="comprarAgora(${prod.id})">
                    <img src="https://cdn-icons-png.flaticon.com/512/1384/1384023.png" alt="WhatsApp" style="width: 24px; height: 24px; object-fit: contain;">
                    Comprar Agora
                </button>
                <button class="btn-add-cart" onclick="adicionarCarrinhoDetalhe(${prod.id})">
                    Adicionar ao Carrinho
                </button>
            </div>

            <div style="margin-top: 30px; font-size: 14px; color: #555;">
                <h3>Descrição</h3>
                <p>Produto original ${prod.marca}, ideal para manutenção de sistemas de refrigeração. Alta durabilidade e garantia de 3 meses.</p>
            </div>
        </div>
    `;

    // Muda a view
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('view-product').classList.add('active');
    window.scrollTo(0, 0);
}

function comprarAgora(id) {
    const prod = produtos.find(p => p.id === id);
    const qtd = document.getElementById('qtyInput').value;
    const total = (prod.preco * qtd).toFixed(2);
    
    const msg = `Olá, gostaria de comprar agora:%0A- ${qtd}x ${prod.nome}%0AValor Total: R$ ${total}`;
    window.open(`https://wa.me/5547996270011?text=${msg}`, '_blank');
}

function adicionarCarrinho(id) {
    const prod = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        // Se já existe, só aumenta a quantidade
        itemExistente.qtd += 1;
    } else {
        // Se não existe, adiciona ao carrinho com qtd = 1
        // Usamos { ...prod } para criar uma cópia e não alterar o original
        carrinho.push({ ...prod, qtd: 1 });
    }
    
    atualizarCarrinhoUI();
    toggleCart(true);
}

// --- LISTAGEM E FILTROS ---
function filtrarCategoria(cat) {
    mostrarLista(produtos.filter(p => p.categoria === cat), `Categoria: ${cat}`);
}

function filtrarMarca(marca) {
    if(marca === 'Todas') mostrarLista(produtos, 'Todos os Produtos');
    else mostrarLista(produtos.filter(p => p.marca === marca), `Marca: ${marca}`);
}

function buscarProdutos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    if(!termo) return;
    mostrarLista(produtos.filter(p => p.nome.toLowerCase().includes(termo)), `Busca: "${termo}"`);
}

function mostrarLista(lista, titulo) {
    const grid = document.getElementById('gridListagem');
    document.getElementById('listTitle').innerText = titulo;
    grid.innerHTML = '';
    
    if(lista.length === 0) grid.innerHTML = '<p>Nenhum item encontrado.</p>';
    else lista.forEach(prod => grid.appendChild(criarCard(prod)));

    // Navegação
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('view-list').classList.add('active');
}

// --- FAVORITOS ---
function toggleFavorito(id) {
    // 1. Atualiza a lista de IDs (Array)
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(favId => favId !== id);
    } else {
        favoritos.push(id);
    }

    // 2. Atualiza TODOS os botões desse produto na tela
    // Busca todos os elementos que tenham a classe "fav-btn-1", "fav-btn-2", etc.
    const botoesNaTela = document.querySelectorAll(`.fav-btn-${id}`);

    botoesNaTela.forEach(btn => {
        if (favoritos.includes(id)) {
            // Se virou favorito: pinta de vermelho e põe coração cheio
            btn.classList.add('active');
            btn.querySelector('span').innerText = 'favorite';
        } else {
            // Se deixou de ser favorito: tira o vermelho e põe coração vazio
            btn.classList.remove('active');
            btn.querySelector('span').innerText = 'favorite_border';
        }
    });

    // 3. Se estivermos com a tela de "Meus Favoritos" aberta, atualiza ela também
    const viewFavorites = document.getElementById('view-favorites');
    if(viewFavorites && viewFavorites.classList.contains('active')) {
        renderFavoritos();
    }
}

function renderFavoritos() {
    const grid = document.getElementById('gridFavoritos');
    grid.innerHTML = '';
    const listaFav = produtos.filter(p => favoritos.includes(p.id));

    if(listaFav.length === 0) {
        grid.innerHTML = '<p>Você não possui favoritos.</p>';
    } else {
        listaFav.forEach(prod => grid.appendChild(criarCard(prod)));
    }
}

// --- CARRINHO & INTERFACE ---
function adicionarCarrinhoDetalhe(id) {
    // Pega a quantidade que está na caixinha de número
    const qtdInput = document.getElementById('qtyInput');
    const qtd = parseInt(qtdInput.value);

    // Encontra o produto no banco de dados
    const prod = produtos.find(p => p.id === id);
    
    // Verifica se já tem no carrinho
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        // Se já existe, soma a quantidade escolhida à quantidade atual
        itemExistente.qtd += qtd;
    } else {
        // Se não existe, cria o item com a quantidade escolhida
        carrinho.push({ ...prod, qtd: qtd });
    }
    
    // Atualiza a tela e abre o carrinho
    atualizarCarrinhoUI();
    toggleCart(true);
}

function atualizarCarrinhoUI() {
    // Atualiza a bolinha vermelha com a SOMA das quantidades
    const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    document.getElementById('cartCount').innerText = totalItens;

    // Calcula o preço total (Preço x Quantidade)
    const totalValor = carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
    document.getElementById('cartTotal').innerText = `R$ ${totalValor.toFixed(2).replace('.', ',')}`;
    
    const container = document.getElementById('cartItemsContainer');
    container.innerHTML = '';

    if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; margin-top: 20px;">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.img}">
                <div style="flex:1">
                    <div style="font-size:14px; font-weight:bold;">
                        <span style="color:var(--azul-escuro);">${item.qtd}x</span> ${item.nome}
                    </div>
                    <div style="color: #666; font-size: 12px;">Unit: R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                    <div style="color: var(--azul-escuro); font-weight:bold;">Total: R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</div>
                </div>
                
                <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
                    <button style="color: #e53935; border:none; background:none; cursor:pointer" onclick="removerDoCarrinho(${index})">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    }
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinhoUI();
}

function toggleCart(forceOpen) {
    const modal = document.getElementById('cartModal');
    const zapBtn = document.getElementById('whatsappBtn');
    
    if (forceOpen === true || !modal.classList.contains('open')) {
        modal.classList.add('open');
        zapBtn.classList.add('move-left');
    } else {
        modal.classList.remove('open');
        zapBtn.classList.remove('move-left');
    }
}

function toggleMenu() {
    document.getElementById('sidebarMenu').classList.toggle('open');
    document.getElementById('menuOverlay').classList.toggle('open');
}

function finalizarZap() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    
    let msg = "Olá, vim pelo site e gostaria de cotar:%0A%0A";
    
    carrinho.forEach(item => {
        // Formata a mensagem: 2x Nome do Produto (R$ Total)
        msg += `- *${item.qtd}x* ${item.nome} (R$ ${(item.preco * item.qtd).toFixed(2)})%0A`;
    });
    
    const totalTexto = document.getElementById('cartTotal').innerText;
    msg += `%0A*Total Geral: ${totalTexto}*`;
    
    window.open(`https://wa.me/5547996270011?text=${msg}`, '_blank');
}

// Enter na busca
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') buscarProdutos();
});

// --- FUNÇÃO DE ROLAGEM DO CARROSSEL ---
function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    
    // Calcula a largura de um card + espaçamento (aprox 220px + 20px gap)
    const scrollAmount = 240; 
    
    // Rola suavemente
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// --- CONTROLE INTELIGENTE DOS BOTÕES DO CARROSSEL ---

function atualizarBotoesCarrossel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Encontra o pai (wrapper) para achar os botões 'prev' e 'next' irmãos do container
    const wrapper = container.parentElement;
    const btnPrev = wrapper.querySelector('.nav-btn.prev');
    const btnNext = wrapper.querySelector('.nav-btn.next');

    // Lógica: Se o conteúdo total (scrollWidth) for maior que a área visível (clientWidth)
    // então precisamos dos botões. Caso contrário, escondemos.
    if (container.scrollWidth > container.clientWidth) {
        if(btnPrev) btnPrev.style.display = 'flex';
        if(btnNext) btnNext.style.display = 'flex';
    } else {
        if(btnPrev) btnPrev.style.display = 'none';
        if(btnNext) btnNext.style.display = 'none';
    }
}

// --- EVENTO DE REDIMENSIONAMENTO ---
// Se o usuário diminuir a janela, pode ser que os itens passem a precisar de scroll.
// Se aumentar, pode ser que caibam todos e não precise mais.
window.addEventListener('resize', () => {
    // Lista de todos os IDs de carrosséis que usamos
    const carrosseis = ['gridFreteGratis', 'gridDestaques', 'gridMaisProcurados', 'gridMarcas'];
    carrosseis.forEach(id => atualizarBotoesCarrossel(id));
});

// Seleciona os elementos
const menuOverlay = document.getElementById('menuOverlay');
const sidebarMenu = document.getElementById('sidebarMenu');

// Função para abrir/fechar o menu
function toggleMenu() {
    const isOpen = sidebarMenu.classList.contains('open');
    
    if(isOpen) {
        // Se estiver aberto, remove a classe 'open' (fecha)
        sidebarMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
    } else {
        // Se estiver fechado, adiciona a classe 'open' (abre)
        sidebarMenu.classList.add('open');
        menuOverlay.classList.add('open');
    }
}