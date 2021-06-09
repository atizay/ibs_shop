'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const baseUrl = 'http://localhost:3006';

  class ProductCard {
    constructor(name, alt, picture, price, like, description, details, parentSelector) {
      this.name = name;
      this.picture = picture;
      this.price = price;
      this.alt = alt;
      this.description = description;
      this.details = details;
      this.like = like;
      this.parent = document.querySelector(parentSelector);
    }

    render() {

      this.price.currency == 'USD' ? this.price.currency = '$' : 'Р';

      const el = document.createElement('div');   
      el.classList.add('product');
      el.innerHTML = `
        <div class="product__photo-wrapper">
          <img src="${baseUrl}/${this.picture.path}" alt="${this.picture.alt}" class="product__photo" />
        </div>
        <div class="product__data">
          <h3 class="product__title">${this.name}</h3>
          <p class="product__text">
            ${this.description}
          </p>
          <h4>Details</h4>
          <p class="product__text">
            ${this.details}
          </p>          
          <div class="product__options">
            <div class="product__price">
              <span class="product__total">${this.price.currency}${this.price.value}</span>
              <div class="quantity">
                <input type="button" value="-" class="quantity__minus" />
                <input type="number" class="quantity__count" min="0" max="999" value="0" />
                <input type="button" value="+" class="quantity__plus" />
              </div>                
            </div>
            <div class="product__actions">
              <button type="button" class="btn btn_add">Add to cart</button>
              <span class="favorite ${this.like == false ? 'a' : ' active'}"></span>
            </div>
          </div>
        </div>
      `;
      this.parent.append(el);
    }
  }

  getResource(`${baseUrl}/item/:itemId`)
    .then(res => {
      Object.values(res).forEach(({name, alt, picture, price, like, details, description}) => {
        new ProductCard(name, alt, picture, price, like, description, details, '.section-inner_product-wrapper').render();
      });
    })

});