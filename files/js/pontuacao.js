if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'pontuacao'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'pontuacao'.");
}
var pontuacao = function (_, Kotlin) {
  'use strict';
  var toString = Kotlin.toString;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  function main$lambda(closure$xhttp) {
    return function () {
      var areaDePontos = document.getElementById('scores');
      ensureNotNull(areaDePontos).innerHTML = '<h1>Scores<\/h1>' + toString(closure$xhttp.v.responseText.replaceAll(';', ''));
      return Unit;
    };
  }
  function main() {
    var xhttp = {v: new XMLHttpRequest()};
    xhttp.v.open('GET', 'http://0.0.0.0:8080/dados.txt', true);
    xhttp.v.onreadystatechange = main$lambda(xhttp);
    xhttp.v.send();
  }
  _.main = main;
  main();
  Kotlin.defineModule('pontuacao', _);
  return _;
}(typeof pontuacao === 'undefined' ? {} : pontuacao, kotlin);
