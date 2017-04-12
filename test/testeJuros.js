/*  */
var test = require('unit.js');

// read vanilla file and load its global function
eval(require('fs').readFileSync('./app/scripts/juros.js', 'utf8'));

describe('Calcular Juros', function() {
  it('Calcular Juros 1', function() {
    // arrange
    var params = {
      investimento: 10,
      juros: 10,
      periodo: 2
    };
    var expectedResult = 12.1;
    var j = juros();

    // act
    var result = j.calcularJuros(params);

    // assert
    test.value(result).isEqualTo(expectedResult);
  });

  it('Calcular Juros com investimento inicial de 1000 por 12 meses', function() {
    // arrange
    var params = {
      investimento: 1000,
      juros: 1,
      periodo: 12
    };
    var expectedResult = 1126.83;
    var j = juros();

    // act
    var result = j.calcularJuros(params);

    // assert
    test.value(result).isEqualTo(expectedResult);
  });

  it('Calcular Juros com investimento inicial de 1000', function() {
    // arrange
    var params = {
      investimento: 1000,
      juros: 1,
      periodo: 12
    };
    var expectedResult = 1126.83;
    var j = juros();

    // act
    var result = j.calcularJuros(params);

    // assert
    test.value(result).isEqualTo(expectedResult);
  });

  it('Calcular Juros com investimento inicial de 0 e aporte mensal de 800', function() {
    // arrange
    var params = {
      investimentoInicial: 1000,
      aporteMensal: 500,
      taxaMensal: .65 / 100,
      tempoEmMeses: 10 * 12
    };
    var expectedResult = 92635.44;
    var j = juros();

    // act
    var result = j.calcularJurosComAporteMensal(params);

    // assert
    test.value(result).isEqualTo(expectedResult);
  });

  it('Calcular Juros com investimento inicial de 1000 e aporte mensal de 500', function() {
    // arrange
    var params = {
      investimentoInicial: 1000,
      aporteMensal: 500,
      taxaMensal: .65 / 100,
      tempoEmMeses: 2 * 12
    };
    var expectedResult = 14109.49;
    var j = juros();

    // act
    var result = j.calcularJurosComAporteMensal(params);
    
    // assert
    test.value(result).isEqualTo(expectedResult);
  });
});
