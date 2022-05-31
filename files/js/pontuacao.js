if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'pontuacao'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'pontuacao'.");
}
var pontuacao = function (_, Kotlin) {
  'use strict';
  var ensureNotNull = Kotlin.ensureNotNull;
  function main$lambda(closure$xhttp) {
    return function () {
      var areaDePontos = document.getElementById('listaDePontos');
      ensureNotNull(areaDePontos).innerHTML = '\n' + '            <h1> Score: <\/h1>' + '\n' + '            <h2>' + closure$xhttp.v.responseText.toString() + '<\/h2>' + '\n' + '        ';
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
