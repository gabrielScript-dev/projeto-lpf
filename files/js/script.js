if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'script'.");
}
var script = function (_, Kotlin) {
  'use strict';
  var Random = Kotlin.kotlin.random.Random;
  var equals = Kotlin.equals;
  var unboxChar = Kotlin.unboxChar;
  var contains = Kotlin.kotlin.text.contains_sgbm27$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var toString = Kotlin.toString;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var rodada;
  var chances;
  var pontucaoTotal;
  var palavraSecreta;
  var area;
  function palavras() {
    var palavras = ['mouse', 'sagaz', 'mexer', 'termo', 'senso', 'nobre', 'algoz', 'afeto', 'ponto', 'plena', 'sutil', 'vigor', 'fazer', 'audaz', 'sanar', 'assim', 'inato', 'cerne', 'ideia', 'fosse', 'round', 'abrir', 'hiato', 'desde', 'poder', 'moral', 'torpe', 'muito', 'honra', 'justo', 'gozar', 'anexo', 'etnia', 'sobre', 'sonho', 'tange', 'lapso', 'expor', 'haver', 'amigo', 'carma', 'velho', 'sonsa', 'ideal', 'claro', 'doido', 'horda', 'inata', 'capaz', 'xeque'];
    var random = Random.Default.nextInt_za3lpa$(palavras.length);
    console.log(palavras[random]);
    return palavras[random];
  }
  function proximaRodada(pontuacaoDaRodada) {
    palavraSecreta = palavras();
    pontucaoTotal = pontucaoTotal + pontuacaoDaRodada | 0;
    chances = 5;
    rodada = rodada + 1 | 0;
  }
  function ehIgual(s) {
    return equals(s, palavraSecreta);
  }
  function temLetrasEmComum(s) {
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
      if (unboxChar(x) === palavraSecreta.charCodeAt(i)) {
        transform$result = '<span class="green">' + String.fromCharCode(x) + '<\/span>';
      } else if (contains(palavraSecreta, unboxChar(x))) {
        transform$result = '<span class="yellow">' + String.fromCharCode(x) + '<\/span>';
      } else {
        transform$result = '<span>' + String.fromCharCode(x) + '<\/span>';
      }
      tmp$_1.call(destination, transform$result);
    }
    return destination;
  }
  function verificarEntrada(s) {
    if (equals(s, '')) {
      window.alert('INFORME UMA PALAVRA, POR FAVOR!');
      return false;
    } else if (s.length > 5 || s.length < 5) {
      window.alert('A PALAVRA PRECISA TER SOMENTE 5 LETRAS!');
      return false;
    } else {
      return true;
    }
  }
  function imprimirPalavra(palavra) {
    var letrasEmComum = temLetrasEmComum(palavra);
    var novaPalavra = replace(letrasEmComum.toString(), ',', ' ');
    return '<div class="jogadas"><h1> ' + novaPalavra.toUpperCase() + '<\/h1><\/div>';
  }
  function imprimirResultado$lambda() {
    ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + '<h1>Voc\xEA acertou!<\/h1>';
    return Unit;
  }
  function imprimirResultado$lambda_0() {
    ensureNotNull(area).innerHTML = ' ';
    return Unit;
  }
  function imprimirResultado$lambda_1() {
    ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + '<h1>Voc\xEA errou!<\/h1>';
    return Unit;
  }
  function imprimirResultado$lambda_2() {
    ensureNotNull(area).innerHTML = ' ';
    return Unit;
  }
  function imprimirResultado(acertou) {
    if (acertou) {
      window.setTimeout(imprimirResultado$lambda, 1000);
      window.setTimeout(imprimirResultado$lambda_0, 3000);
    } else {
      window.setTimeout(imprimirResultado$lambda_1, 1000);
      window.setTimeout(imprimirResultado$lambda_2, 3000);
    }
  }
  function verificarPalavra(s) {
    var result = ehIgual(s);
    ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + imprimirPalavra(s);
    return result;
  }
  function fimDeJogo(pontuacao) {
    return '\n' + '\t\t<h1> Voc\xEA ganhou! <\/h1>' + '\n' + '\t\t<form method=' + '"' + 'POST' + '"' + ' action=' + '"' + 'salvar_pontuacao' + '"' + '>' + '\n' + '\t\t\tNome: <input name=' + '"' + 'nome_usuario' + '"' + ' type=' + '"' + 'text' + '"' + '>' + '\n' + '\t\t\t<input name =' + '"' + 'pontos' + '"' + ' type=' + '"' + 'hidden' + '"' + ' value=' + '"' + pontuacao + '"' + '> ' + '\n' + '\t\t\t<input type=' + '"' + 'submit' + '"' + ' value=' + '"' + 'Enviar' + '"' + '>' + '\n' + '\t\t<\/form>' + '\n' + '\t';
  }
  function jogar$lambda() {
    ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + fimDeJogo(pontucaoTotal);
    return Unit;
  }
  function jogar() {
    var tmp$;
    var entrada = Kotlin.isType(tmp$ = document.getElementById('entrada'), HTMLInputElement) ? tmp$ : throwCCE();
    var palavra = entrada.value;
    var teste = Regex_init('-?[0-9]+(\\.[0-9]+)?').containsMatchIn_6bul2c$(palavra);
    console.log(teste);
    entrada.value = '';
    if (verificarEntrada(palavra)) {
      if (verificarPalavra(palavra.toLowerCase())) {
        imprimirResultado(true);
        proximaRodada(chances * 100 | 0);
      } else {
        chances = chances - 1 | 0;
      }
      if (chances === 0) {
        imprimirResultado(false);
        proximaRodada(chances);
      }
      console.log('rodada atual: ' + toString(rodada));
      if (rodada === 2) {
        console.log('fim de jogo! ' + toString(pontucaoTotal));
        window.setTimeout(jogar$lambda, 4000);
      }
    }
  }
  Object.defineProperty(_, 'rodada', {
    get: function () {
      return rodada;
    },
    set: function (value) {
      rodada = value;
    }
  });
  Object.defineProperty(_, 'chances', {
    get: function () {
      return chances;
    },
    set: function (value) {
      chances = value;
    }
  });
  Object.defineProperty(_, 'pontucaoTotal', {
    get: function () {
      return pontucaoTotal;
    },
    set: function (value) {
      pontucaoTotal = value;
    }
  });
  Object.defineProperty(_, 'palavraSecreta', {
    get: function () {
      return palavraSecreta;
    },
    set: function (value) {
      palavraSecreta = value;
    }
  });
  Object.defineProperty(_, 'area', {
    get: function () {
      return area;
    }
  });
  _.palavras = palavras;
  _.proximaRodada_za3lpa$ = proximaRodada;
  _.ehIgual_61zpoe$ = ehIgual;
  _.temLetrasEmComum_61zpoe$ = temLetrasEmComum;
  _.verificarEntrada_61zpoe$ = verificarEntrada;
  _.imprimirPalavra_61zpoe$ = imprimirPalavra;
  _.imprimirResultado_6taknv$ = imprimirResultado;
  _.verificarPalavra_61zpoe$ = verificarPalavra;
  _.fimDeJogo_za3lpa$ = fimDeJogo;
  _.jogar = jogar;
  rodada = 0;
  chances = 5;
  pontucaoTotal = 0;
  palavraSecreta = palavras();
  area = document.getElementById('palavras');
  Kotlin.defineModule('script', _);
  return _;
}(typeof script === 'undefined' ? {} : script, kotlin);
