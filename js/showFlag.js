(function() {
    var countryElements = document.getElementById('countries').childNodes,
        countryCount = countryElements.length,
        countries = [],
        colors = [],
        wrapper = document.getElementById('wrapper'),
        search = document.getElementById('search'),
        globalFlag,
        country,
        timeout = false,
        i = 0;

    getData();

    while (i < countryCount) {

        countryElements[i].onmouseover = function(event) {
            addFlag(this, event);
        };

        countryElements[i].onmousemove = function(event) {
            var flag = document.getElementsByClassName('flag-icon')[0] || false;

            if (flag) {
                flag.style.top = window.scrollY + event.clientY - 50 + 'px';
                flag.style.left = window.scrollX + event.clientX + 10 + 'px';
            }

        };

        countryElements[i].onmouseout = function() {
            remove();
        };

        countryElements[i].ondblclick = function(event) {
            addCountryName(this, event);
        };

        countries.push({
          id: countryElements[i].getAttribute('data-id'),
          name: countryElements[i].getAttribute('data-name'),
          element: countryElements[i]
        });

        i++;
    }

    search.addEventListener("keyup", function() {
      var val = this.value;
        
      removeHighlights();

      countryList = getCountryByName(val);
      if (countryList.length) {
        for (var i = 0, len = countryList.length; i < len; i++) {
          countryList[i]['element'].classList.add('show');
        }
      }

    });


    function addFlag(context, event) {
        globalFlag = globalFlag || document.createElement("span");
        globalFlag.className = "flag flag-icon flag-icon-" + context.getAttribute('data-id').toLowerCase();

        globalFlag.style.top = window.scrollY + event.clientY - 50 + 'px';
        globalFlag.style.left = window.scrollX + event.clientX + 10 + 'px';

        wrapper.appendChild(globalFlag);
    }

    function addCountryName(context, event) {
        country = country || document.createElement("span");
        country.className = "country";
        country.innerHTML = context.getAttribute('data-name');

        country.style.top = event.clientY + 10 + 'px';
        country.style.left = event.clientX + 10  + 'px';

        wrapper.appendChild(country);
    }

    function remove() {
      if (globalFlag)  wrapper.removeChild(globalFlag);
      if (country)  wrapper.removeChild(country);

      globalFlag = null;
      country = null;
    }

    function getCountryByName(name) {
      var inputLength = name.length,
          result = [];

      if (inputLength === 0) {
        return result;
      }

      for (var i = 0, len = countries.length; i < len; i++) {
        if (name.toLowerCase() === countries[i].name.toLowerCase().slice(0, inputLength) ) {
          result.push(countries[i]);
        }
      }
      return result;
    }

    function addHighlights(ev) {
      removeHighlights();
      var color = ev.target.getAttribute('data-color'),
          selectedCountries = [];

      for (var i = 0, len = colors.length; i < len; i++) {
        if (colors[i].color === color) {
          selectedCountries = colors[i].code;
        }
      }

      for (var j = 0, jlen = selectedCountries.length; j < jlen; j++) {
        for (var k = 0, klen = countries.length; k < klen; k++) {
          if (selectedCountries[j] === countries[k]['id'].toLowerCase()) {
            countries[k]['element'].classList.add('show');
            countries[k]['element'].classList.add('show_' + color);
          }
        }
      }
    }

    function removeHighlights() {
      var elems = document.querySelectorAll('path.show');
      for (var i = 0, len = elems.length; i < len; i++) {
        elems[i].classList.remove('show_red');
        elems[i].classList.remove('show_blue');
        elems[i].classList.remove('show_green');
        elems[i].classList.remove('show');
      }
    }

    function getData() {
      var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'data/colors.json', true);
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
             if(xmlhttp.status == 200) {
               colors = JSON.parse(xmlhttp.responseText);

               var btns = document.querySelectorAll('.container__colors-item'),
                   color;
               for (var i = 0, len = btns.length; i < len; i++) {
                 btns[i].addEventListener('click', function(ev) {
                   addHighlights(ev);
                 });
               }
            }
          }
        };
        xmlhttp.send(null);
    }

})();
