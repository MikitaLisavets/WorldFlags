(function() {
    var input = document.getElementById('search'),
        inputWrapper = document.getElementById('search-field'),
        hint;

    input.addEventListener('focus', function() {

        hint = document.createElement("div");
        hint.className = 'hint';
        hint.innerHTML = 'Enter country name to find on the map';

        inputWrapper.appendChild(hint);
    });

    input.addEventListener('blur', function() {
        inputWrapper.removeChild(hint);
    });
})();
