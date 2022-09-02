const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]
];

const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];

const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];

const O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
];

const PECAS = [
    [Z, "red"],
    [S, "green"],
    [T, "brown"],
    [O, "blue"],
    [L, "yellow"],
    [I, "orange"],
    [J, "gray"]
];

const LINHA = 20;
const COLUNA = 10;
const TAMANHO = 30;
const VAGO = "purple";

//Dados const
const score = document.getElementById("teste1");
const nivel = document.getElementById("teste2");
const linha = document.getElementById("teste3");
const pecava = document.getElementById("pecavermelha");
const pecave = document.getElementById("pecaverde");
const pecama = document.getElementById("pecamarrom");
const pecaaz = document.getElementById("pecaazul");
const pecaama = document.getElementById("pecaamarela");
const pecala = document.getElementById("pecalaranja");
const pecaci = document.getElementById("pecacinza");

//Dados pt2 var
var scoreE = 0;
var linhasE = 0;
var nivelE = 1;
var linhasContadas = 0;
var linhasDeUmaVez = 0;
var scoreFim;
var ContadorZ = 0;
var ContadorS = 0;
var ContadorT = 0;
var ContadorO = 0;
var ContadorL = 0;
var ContadorI = 0;
var ContadorJ = 0;

var peca;
var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");

onkeydown = controlarPeca;

iniciarTabuleiro();

desenharTabuleiro();

gerarPeca();

inicioDescida = Date.now();

descerPeca();


// Sub-rotinas (funções)

function iniciarTabuleiro() {
    for (var i = 0; i < LINHA; i++) {
        tabuleiro[i] = [];

        for (var j = 0; j < COLUNA; j++) {
            tabuleiro[i][j] = VAGO;
        }
    }
}

function desenharTabuleiro() {
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}


//tabuleiro();



function desenharQuadrado(x, y, cor) {
    c.fillStyle = cor;
    c.fillRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);

    c.strokeStyle = "black";
    c.strokeRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);
}

function gerarPeca() {
    var r = Math.floor(Math.random() * PECAS.length);

    peca = {
        tetramino: PECAS[r][0],
        cor: PECAS[r][1],
        tetraminoN: 0,
        tetraminoAtivo: [[]],
        x: 3,
        y: -2
    };

    peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];

    // Contador de cada uma das peças !!!
    if (peca.tetramino === PECAS[0][0] && fimDeJogo === false) {
        ContadorZ++;
    } else if (peca.tetramino === PECAS[1][0] && fimDeJogo === false) {
        ContadorS++;
    } else if (peca.tetramino === PECAS[2][0] && fimDeJogo === false) {
        ContadorT++;
    } else if (peca.tetramino === PECAS[3][0] && fimDeJogo === false) {
        ContadorO++;
    } else if (peca.tetramino === PECAS[4][0] && fimDeJogo === false) {
        ContadorL++;
    } else if (peca.tetramino === PECAS[5][0] && fimDeJogo === false) {
        ContadorI++;
    } else if (peca.tetramino === PECAS[6][0] && fimDeJogo === false) {
        ContadorJ++;
    }
    pecava.innerHTML = "Peças vermelhas : " + ContadorZ;
    pecave.innerHTML = "Peças verdes :  : " + ContadorS;
    pecama.innerHTML = "Peças marrons :  : " + ContadorT;
    pecaaz.innerHTML = "Peças azuis : " + ContadorO;
    pecaama.innerHTML = "Peças amarelas : " + ContadorL;
    pecala.innerHTML = "Peças laranjas : " + ContadorI;
    pecaci.innerHTML = "Peças cinzas : " + ContadorJ;
}

function descerPeca() {
    var agora = Date.now();
    var delta = agora - inicioDescida;

    if (delta > (1000 / nivelE) && fimDeJogo === false) {
        moverAbaixo();
        inicioDescida = Date.now();
    }

    if (!fimDeJogo) {
        requestAnimationFrame(descerPeca);
    } else {
        scoreFim = scoreE;
        document.getElementById("scoreFinal").innerText = "Score: " + scoreFim;
        document.getElementById("scoreFinal").style.display = "block";
        document.getElementById("teste1").style.display = "none";
    }
}

function moverAbaixo() {
    if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.y++;
        desenharPeca();
    } else {
        travarPeca();
        gerarPeca();
    }

}

function moverDireita() {
    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
    }
}

function moverEsquerda() {
    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
    }
}

function colisao(x, y, p) {
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }

            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;

            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }

            if (novoY < 0) {
                continue;
            }

            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }

    return false;
}

function apagarPeca() {
    preencherPeca(VAGO);
}

function desenharPeca() {
    preencherPeca(peca.cor);
}

function preencherPeca(cor) {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

function travarPeca() {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (!peca.tetraminoAtivo[i][j]) {
                //som de travar peça aqui
                document.getElementById("pecatravar").play("travarpeca.mp3");
                continue;
            }

            if (peca.y + i < 0) {
                document.getElementById("fimdejogo").innerText = "Você Perdeu Bobalhão!"
                fimDeJogo = true;
                mostrarEst2();
                document.getElementById("fimdogame").play("bassdropfimdejogo.mp3");
                break;
            }
            tabuleiro[peca.y + i][peca.x + j] = peca.cor;
        }
    }

    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;

        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }

        if (linhaCheia) {
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y - 1][j];
                    //quebrar linha
                    document.getElementById('linhaquebrar').play("quebrarlines.mp3");
                }
            }

            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }

            linhasE++; linhasContadas++; linhasDeUmaVez++;
        }
        if (linhasE >= 10) {
            nivelE++;
            linhasE = 0;
            linhasContadas = 0;
        }
    }
    //Aqui tem-se o bonus para a eliminação de 1 ou mais linhas ao mesmo tempo.
    if (linhasDeUmaVez == 1) {
        scoreE = scoreE + (100 * nivelE);
        linhasDeUmaVez = 0;
    } else if (linhasDeUmaVez == 2) {
        scoreE = scoreE + (300 * nivelE);
        linhasDeUmaVez = 0;
    } else if (linhasDeUmaVez == 3) {
        scoreE = scoreE + (500 * nivelE);
        linhasDeUmaVez = 0;
    } else if (linhasDeUmaVez == 4) {
        scoreE = scoreE + (800 * nivelE);
        linhasDeUmaVez = 0;
    }

    desenharTabuleiro();

    // PLACAR DA ESQUERDA

    nivel.innerHTML = "Nível : " + nivelE;
    score.innerHTML = "Score : " + scoreE;
    linha.innerHTML = "Linhas Eliminadas : " + linhasContadas;

}

function rodarPeca() {
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA / 2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }

    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function rodarPecaEsquerda() {
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA / 2) {
            recuo = 1;
        } else {
            recuo = -1;
        }
    }

    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x -= recuo;
        peca.tetraminoN = (peca.tetraminoN + 3) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento) {
    var tecla = evento.keyCode;

    if (tecla == 37) {
        moverEsquerda();
        inicioDescida = Date.now();
        document.getElementById('baixolado').play("pecalado.mp3");
    } else if (tecla == 38) {
        rodarPeca();
        inicioDescida = Date.now();
        document.getElementById('pecarodar').play("somdeclick.mp3");
    } else if (tecla == 39) {
        moverDireita();
        inicioDescida = Date.now();
        document.getElementById('baixolado').play("pecalado.mp3");
    } else if (tecla == 40) {
        moverAbaixo();
        scoreE = scoreE + 1;
        document.getElementById("teste1").innerText = "Score: " + scoreE;
        document.getElementById('baixolado').play("pecalado.mp3");
    } else if (tecla == 90) {
        rodarPecaEsquerda();
        inicioDescida = Date.now();
        document.getElementById('pecarodar').play("somdeclick.mp3");
    } else if (tecla == 32) {
        moverAbaixo();
        moverAbaixo();
        scoreE = scoreE + 2;
        document.getElementById("teste1").innerText = "Score: " + scoreE;
        document.getElementById('baixolado').play("pecalado.mp3");
    }
}

function mostrarEst2() {
    document.getElementById("est2").style.display = "block";
}
