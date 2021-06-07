'use strict';

document.addEventListener('DOMContentLoaded', () => {

  class ProductCard {
    constructor(name, picture, price, like, parentSelector) {
      this.name = name;
      this.picture = picture;
      this.price = price;
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
          <img src="http://localhost:3006/${this.picture.path}" alt=${this.name} class="product-list__photo">
        </a>  
        <a href="product-page.html" class="product-list__link">
          <h4 class="product-list__title">${this.name}</h4>
        </a>  
        <span class="product-list__price">${this.price.currency}${this.price.value}</span>
      `;
      this.parent.append(el);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
    }
    
    return await res.json();
  };

  getResource('http://localhost:3006/item')
    .then(res => {
      res.content.forEach(({name, picture, price, like}) => {
        new ProductCard(name, picture, price, like, '.product-list').render();
      });
    })

});