(function() {
    var countryElements = document.getElementById('countries').childNodes,
        countryCount = countryElements.length,
        countries = [],
        wrapper = document.getElementById('wrapper'),
        search = document.getElementById('search'),
        globalFlag,
        country,
        timeout = false,
        i = 0;

    while (i < countryCount) {

        countryElements[i].onmouseover = function(event) {
            addFlag(this, event);
        };

        countryElements[i].onmousemove = function(event) {
            var flag = document.getElementsByClassName('flag-icon')[0] || false;

            if (flag) {
                flag.style.top = event.clientY - 50 + 'px';
                flag.style.left = event.clientX + 10    + 'px';
            }

        };

        countryElements[i].onmouseout = function() {
            removeFlag();
        };

        countries.push({
          id: countryElements[i].getAttribute('data-id'),
          name: countryElements[i].getAttribute('data-name'),
          element: countryElements[i]
        });

        i++;
    }

    search.addEventListener("keyup", function() {
      var val = this.value,
          country;
      removeFlag();
      removeHighlights();

      country = getCountryByName(val);
      if (country) {
        country['element'].classList.add('show');
        addFlag(country['element']);
      }


    });


    function addFlag(context, event) {
        globalFlag = globalFlag || document.createElement("span");
        globalFlag.className = "flag flag-icon flag-icon-" + context.getAttribute('data-id').toLowerCase();

        if (event) {
            globalFlag.style.top = event.clientY - 50 + 'px';
            globalFlag.style.left = event.clientX + 10    + 'px';
        }
        else {
            globalFlag.style.top = context.style.top + 'px';
            globalFlag.style.left = context.style.left + 'px';
        }

        wrapper.appendChild(globalFlag);
    }

    function removeFlag() {
      if (globalFlag) {
        wrapper.removeChild(globalFlag);
        globalFlag = null;
      }
    }

    function getCountryByName(name) {
      for (var i = 0, len = countries.length; i < len; i++) {
        if (name.toLowerCase() === countries[i].name.toLowerCase() ) {
          return countries[i];
        }
      }
    }

    function removeHighlights() {
      var elems = document.querySelectorAll('path.show');
      for (var i = 0, len = elems.length; i <len; i++) {
        elems[i].classList.remove('show');
      }
    }

})();
