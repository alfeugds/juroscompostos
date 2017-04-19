/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* global juros*/
/* eslint-env browser */
(function(juros) {
  'use strict';
  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    'serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error(
                    'The installing service worker became redundant.'
                  );

                default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  // var $form = document.getElementById('calcularJurosCompostos');

  var $btncalcular = document.getElementById('btncalcular');
  var $investimentoInicial = document.getElementById('investimentoInicial');
  var $aporteMensal = document.getElementById('aporteMensal');
  var $juros = document.getElementById('juros');
  var $periodo = document.getElementById('periodo');
  var $resultado = document.getElementById('resultado');
  var $resultadoExplicado = document.getElementById('resultadoExplicado');

  var $sectionResultado = document.getElementById('sectionResultado');

  var $layout = document.querySelector('.mdl-layout');

  var $drawer = document.querySelector('.mdl-layout__drawer');

  var $pages = document.querySelectorAll('section.page');

  var currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  function showResultado() {
    $sectionResultado.style.display = 'block';
  }
  function hideDrawer() {
    if ($drawer.classList.contains('is-visible')) {
      $layout.MaterialLayout.toggleDrawer();
    }
  }

  function showPage() {
    var href = this.getAttribute('href');
    var screenName = href.split('/')[1];

    var screen = document.getElementById(screenName);

    $pages.forEach(function(a) {
      a.classList.remove('is-visible');
    });
    screen.classList.add('is-visible');
    hideDrawer();
  }

  function setNavigationListeners() {
    var links = document.querySelectorAll('.spa-navigation-link');

    for (var i = 0; i < links.length; i++) {
      var l = links[i];
      l.addEventListener('click', showPage);
    }
  }

  $btncalcular.addEventListener('click', function() {
    var params = {
      investimentoInicial: $investimentoInicial.valueAsNumber,
      aporteMensal: $aporteMensal.valueAsNumber,
      taxaMensal: $juros.valueAsNumber,
      tempoEmMeses: $periodo.valueAsNumber * 12
    };

    var result = juros.calcularJurosComAporteMensal(params);
    result = currencyFormatter.format(result);
    var explanationResult = 'Com um Investimento Inicial de <span> {{investimentoInicial}} </span> e um Aporte Mensal de {{aporteMensal}}' +
      ' a uma taxa de {{juros}}% a.m. no período de {{periodo}} anos, o Montante será de {{montante}}.';
    explanationResult = explanationResult
        .replace(
          '{{investimentoInicial}}',
          currencyFormatter.format(params.investimentoInicial)
        )
        .replace(
          '{{aporteMensal}}',
          currencyFormatter.format(params.aporteMensal)
        )
        .replace('{{juros}}', currencyFormatter.format(params.taxaMensal))
        .replace('{{periodo}}', $periodo.valueAsNumber)
        .replace('{{montante}}', result);

    $resultadoExplicado.innerHTML = explanationResult;

    $resultado.textContent = result;

    showResultado();
  });

  // initialize with default values
  $investimentoInicial.value = 1000;
  $aporteMensal.value = 500;
  $juros.value = 0.65;
  $periodo.value = 10;

  setNavigationListeners();
})(juros);
