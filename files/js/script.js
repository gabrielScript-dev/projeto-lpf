if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'script'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'script'.");
}var script = function (_, Kotlin) {
  'use strict';
  var equals = Kotlin.equals;
  var unboxChar = Kotlin.unboxChar;
  var contains = Kotlin.kotlin.text.contains_sgbm27$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwCCE = Kotlin.throwCCE;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var chances;
  var palavraSecreta;
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
  function jogar() {
    var tmp$;
    var area = document.getElementById('palavras');
    if (chances === 0) {
      ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + '<h1> Voc\xEA perdeu!<\/h1>';
    } else {
      var entrada = Kotlin.isType(tmp$ = document.getElementById('entrada'), HTMLInputElement) ? tmp$ : throwCCE();
      var palavra = entrada.value;
      if (ehIgual(palavra)) {
        ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + ('\n' + '\t\t\t\t<section class=' + '\\' + '"' + 'vencendor' + '\\' + '"' + '>' + '\n' + '\t\t\t\t\t<h1 class=' + '\\' + '"' + 'vencendor-titulo' + '\\' + '"' + '> Voc\xEA ganhou! <\/h1>' + '\n' + '\t\t\t\t\t<form method=' + '"' + 'POST' + '"' + ' action=' + '"' + 'salvar_pontuacao' + '"' + '>' + '\n' + '\t\t\t\t\tNome: <input name=' + '"' + 'nome_usuario' + '"' + ' type=' + '"' + 'text' + '"' + '>' + '\n' + '\t\t\t\t\t<input name =' + '"' + 'pontos' + '"' + ' type=' + '"' + 'hidden' + '"' + ' value=' + '"' + (chances * 100 | 0) + '"' + '> ' + '\n' + '\t\t\t\t\t<input type=' + '"' + 'submit' + '"' + ' value=' + '"' + 'Enviar' + '"' + '>' + '\n' + '\t\t\t\t\t<\/form>' + '\n' + '\t\t\t\t<\/section>' + '\n' + '\t\t\t');
      } else {
        var letrasEmComum = temLetrasEmComum(palavra);
        var novaPalavra = replace(letrasEmComum.toString(), ',', ' ');
        ensureNotNull(area).innerHTML = ensureNotNull(area).innerHTML + ('<div class="jogadas"><h1> ' + novaPalavra.toUpperCase() + '<\/h1><\/div>');
      }
      entrada.value = '';
      chances = chances - 1 | 0;
    }
  }
  function main() {
  }
  Object.defineProperty(_, 'chances', {
    get: function () {
      return chances;
    },
    set: function (value) {
      chances = value;
    }
  });
  Object.defineProperty(_, 'palavraSecreta', {
    get: function () {
      return palavraSecreta;
    }
  });
  _.ehIgual_61zpoe$ = ehIgual;
  _.temLetrasEmComum_61zpoe$ = temLetrasEmComum;
  _.jogar = jogar;
  _.main = main;
  chances = 5;
  palavraSecreta = 'poder';
  main();
  Kotlin.defineModule('script', _);
  return _;
}(typeof script === 'undefined' ? {} : script, kotlin);
