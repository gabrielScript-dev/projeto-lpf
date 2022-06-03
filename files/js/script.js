if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'script'.");
}
var script = function (_, Kotlin) {
  'use strict';
  var Random = Kotlin.kotlin.random.Random;
  var unboxChar = Kotlin.unboxChar;
  var contains = Kotlin.kotlin.text.contains_sgbm27$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var equals = Kotlin.equals;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var toString = Kotlin.toString;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var partida;
  var area;
  function Palavra() {
    this.palavraSecreta_0 = null;
    this.palavraSecreta_0 = this.palavras();
  }
  Palavra.prototype.palavras = function () {
    var palavras = ['mouse', 'sagaz', 'mexer', 'termo', 'senso', 'nobre', 'algoz', 'afeto', 'ponto', 'plena', 'sutil', 'vigor', 'fazer', 'audaz', 'sanar', 'assim', 'inato', 'cerne', 'ideia', 'fosse', 'round', 'abrir', 'hiato', 'desde', 'poder', 'moral', 'torpe', 'muito', 'honra', 'justo', 'gozar', 'anexo', 'etnia', 'sobre', 'sonho', 'tange', 'lapso', 'expor', 'haver', 'amigo', 'carma', 'velho', 'sonsa', 'ideal', 'claro', 'doido', 'horda', 'inata', 'capaz', 'xeque'];
    var random = Random.Default.nextInt_za3lpa$(palavras.length);
    console.log(palavras[random]);
    return palavras[random];
  };
  Palavra.prototype.trocarPalavra = function () {
    this.palavraSecreta_0 = this.palavras();
  };
  Palavra.prototype.temLetrasEmComum_61zpoe$ = function (s) {
    var destination = ArrayList_init(s.length);
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = iterator(s);
    while (tmp$.hasNext()) {
      var item = unboxChar(tmp$.next());
      var tmp$_1 = destination.add_11rb$;
      var i = (tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0);
      var x = toBoxedChar(item);
      var transform$result;
      if (unboxChar(x) === this.palavraSecreta_0.charCodeAt(i)) {
        transform$result = '<span class="green">' + String.fromCharCode(x) + '<\/span>';
      } else if (contains(this.palavraSecreta_0, unboxChar(x))) {
        transform$result = '<span class="yellow">' + String.fromCharCode(x) + '<\/span>';
      } else {
        transform$result = '<span>' + String.fromCharCode(x) + '<\/span>';
      }
      tmp$_1.call(destination, transform$result);
    }
    var palavraComMarcacao = replace(destination.toString(), ',', ' ');
    return '<div class="jogadas"><h1> ' + palavraComMarcacao.toUpperCase() + '<\/h1><\/div>';
  };
  Palavra.prototype.ehIgual_61zpoe$ = function (palavraEscolhida) {
    return equals(palavraEscolhida, this.palavraSecreta_0);
  };
  Palavra.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Palavra',
    interfaces: []
  };
  function Partida(qtdRodadas) {
    this.rodadas = 0;
    this.chances = 0;
    this.pontuacaoTotal = 0;
    this.palavraSecreta_0 = null;
    this.chances = 5;
    this.pontuacaoTotal = 0;
    this.rodadas = qtdRodadas;
    this.palavraSecreta_0 = new Palavra();
  }
  Partida.prototype.proximaRodada_za3lpa$ = function (pontuacaoDaRodada) {
    this.pontuacaoTotal = this.pontuacaoTotal + pontuacaoDaRodada | 0;
    if (this.rodadas > 0) {
      this.palavraSecreta_0.trocarPalavra();
      this.chances = 5;
      this.rodadas = this.rodadas - 1 | 0;
    }
    console.log(pontuacaoDaRodada);
  };
  Partida.prototype.acertou_6taknv$ = function (acertou) {
    return acertou ? '<h1>Voc\xEA acertou!<\/h1>' : '<h1>Voc\xEA errou!<\/h1>';
  };
  Partida.prototype.palavraModificada_61zpoe$ = function (palavra) {
    return this.palavraSecreta_0.temLetrasEmComum_61zpoe$(palavra);
  };
  Partida.prototype.verificarPalavra_61zpoe$ = function (s) {
    var resultado = this.palavraSecreta_0.ehIgual_61zpoe$(s);
    return resultado;
  };
  Partida.prototype.fimDeJogo = function () {
    return '\n' + '            <h1> Game Over! <\/h1>' + '\n' + '            <form method=' + '"' + 'POST' + '"' + ' action=' + '"' + 'salvar_pontuacao' + '"' + '>' + '\n' + '                Nome: <input name=' + '"' + 'nome_usuario' + '"' + ' type=' + '"' + 'text' + '"' + '>' + '\n' + '                <input name =' + '"' + 'pontos' + '"' + ' type=' + '"' + 'hidden' + '"' + ' value=' + '"' + this.pontuacaoTotal + '"' + '> ' + '\n' + '                <input type=' + '"' + 'submit' + '"' + ' value=' + '"' + 'Enviar' + '"' + '>' + '\n' + '            <\/form>' + '\n' + '        ';
  };
  Partida.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Partida',
    interfaces: []
  };
  function verificarEntrada(entrada) {
    var s = replace(entrada, ' ', '');
    var regex = Regex_init('[@!#$%^&*()/0-9]');
    if (equals(s, '')) {
      window.alert('INFORME UMA PALAVRA, POR FAVOR!');
      return false;
    } else if (s.length > 5 || s.length < 5) {
      window.alert('A PALAVRA PRECISA TER SOMENTE 5 LETRAS!');
      return false;
    } else if (regex.containsMatchIn_6bul2c$(s)) {
      window.alert('A PALAVRA PRECISA TER SOMENTE 5 LETRAS!');
      return false;
    } else {
      return true;
    }
  }
  function imprimirResultado$lambda(closure$resultado) {
    return function () {
      ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + closure$resultado;
      return Unit;
    };
  }
  function imprimirResultado$lambda_0() {
    ensureNotNull(area).innerHTML = ' ';
    return Unit;
  }
  function imprimirResultado(resultado, tempo) {
    window.setTimeout(imprimirResultado$lambda(resultado), tempo);
    window.setTimeout(imprimirResultado$lambda_0, tempo + 2000 | 0);
  }
  function imprimirFimDeJogo$lambda(closure$s) {
    return function () {
      ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + closure$s;
      return Unit;
    };
  }
  function imprimirFimDeJogo(s, tempo) {
    window.setTimeout(imprimirFimDeJogo$lambda(s), tempo);
  }
  function jogar() {
    var tmp$;
    var entrada = Kotlin.isType(tmp$ = document.getElementById('entrada'), HTMLInputElement) ? tmp$ : throwCCE();
    var palavraAtual = entrada.value;
    entrada.value = '';
    if (verificarEntrada(palavraAtual)) {
      ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + partida.palavraModificada_61zpoe$(palavraAtual);
      var palavraCerta = partida.verificarPalavra_61zpoe$(palavraAtual.toLowerCase());
      var msgResultado = partida.acertou_6taknv$(palavraCerta);
      if (palavraCerta) {
        imprimirResultado(msgResultado, 1000);
        partida.proximaRodada_za3lpa$(partida.chances * 100 | 0);
      } else if (partida.chances === 1) {
        imprimirResultado(msgResultado, 1000);
        partida.proximaRodada_za3lpa$(partida.chances * 0 | 0);
      } else {
        partida.chances = partida.chances - 1 | 0;
      }
      if (partida.rodadas === 0) {
        console.log('pontuacao total: ' + toString(partida.pontuacaoTotal));
        imprimirFimDeJogo(partida.fimDeJogo(), 4000);
      }
    }
  }
  Object.defineProperty(_, 'partida', {
    get: function () {
      return partida;
    }
  });
  Object.defineProperty(_, 'area', {
    get: function () {
      return area;
    }
  });
  _.Palavra = Palavra;
  _.Partida = Partida;
  _.verificarEntrada_61zpoe$ = verificarEntrada;
  _.imprimirResultado_bm4lxs$ = imprimirResultado;
  _.imprimirFimDeJogo_bm4lxs$ = imprimirFimDeJogo;
  _.jogar = jogar;
  partida = new Partida(3);
  area = document.getElementById('palavras');
  Kotlin.defineModule('script', _);
  return _;
}(typeof script === 'undefined' ? {} : script, kotlin);
