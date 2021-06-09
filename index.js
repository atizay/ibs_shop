'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const baseUrl = 'http://localhost:3006';

  class ProductCard {
    constructor(name, picture, alt, price, like, parentSelector) {
      this.name = name;
      this.picture = picture;
      this.price = price;
      this.alt = alt;
      this.like = like;
      this.parent = document.querySelector(parentSelector);
    }

    render() {

      this.price.currency == 'USD' ? this.price.currency = '$' : 'Р';

      const el = document.createElement('li');
      el.classList.add('product-list__item');      
      el.innerHTML = `
        <span class="favorite ${this.like == false ? 'a' : ' active'}"></span>
        <a href="product-page.html" class="product-list__link">
          <img src="${baseUrl}/${this.picture.path}" alt=${this.picture.alt} class="product-list__photo">
        </a>  
        <a href="product-page.html" class="product-list__link">
          <h4 class="product-list__title">${this.name}</h4>
        </a>  
        <span class="product-list__price">${this.price.currency}${this.price.value}</span>
      `;
      this.parent.append(el);
    }
  }

  getResource(`${baseUrl}/item`)
    .then(res => {
      res.content.forEach(({name, picture, alt, price, like}) => {
        new ProductCard(name, picture, alt, price, like, '.product-list').render();
      });
    })
});