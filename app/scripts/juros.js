/* exported juros */
/**
 * Calcula juros.
 * @param {object} params Parâmetros para o cálculo.
 * @return {number} Montante.
 */
/* eslint-env browser */
var juros = (function() {
  'use strict';
  return {
    calcularJuros: function(params) {
      var montante = params.investimento *
        Math.pow(1 + params.juros / 100, params.periodo);
      return Math.round(montante * 100) / 100;
    },

    calcularJurosComAporteMensal: function(params) {
      var months = params.tempoEmMeses;
      var futureValue = params.investimentoInicial;
      var investment = params.aporteMensal;
      var monthlyRate = params.taxaMensal;

      for (var i = 1; i <= months; i++) {
        futureValue = futureValue * (1 + monthlyRate) + investment;
      }

      return Math.round(futureValue * 100) / 100;
    }
  };
})();

if (typeof module === 'object' && module.exports) {
  module.exports = juros;
} else {
  window.juros = juros;
}
