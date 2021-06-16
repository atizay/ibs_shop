document.querySelector('.search-panel__input').addEventListener('input', function() {
  let val = this.value.trim().toLowerCase();
  let elasticItems = document.querySelectorAll('.product-list__title');
  if (val != '') {
    elasticItems.forEach(function(elem) {
      if (elem.innerText.toLowerCase().search(val) == -1) {
        elem.closest('.product-list__item').classList.add('hide');
      }
      else {
        elem.closest('.product-list__item').classList.remove('hide');
      }
    });
  }
  else {
    elasticItems.forEach(function(elem) {
      elem.closest('.product-list__item').classList.remove('hide');
    })
  }
});