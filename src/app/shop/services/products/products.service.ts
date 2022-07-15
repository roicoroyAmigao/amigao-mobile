/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  selectedCategories: any = [];
  priceRange: PriceRange = {
    lower: 0,
    upper: 100,
    applied: false
  };
  allProducts: any = [];
  cartCount = 0;

  show_result_size = true;

  bannerImages = [
    {
      imgurl: 'assets/images/slide1.jpg'
    }, {
      imgurl: 'assets/images/slide2.jpg'
    }, {
      imgurl: 'assets/images/slide3.jpg'
    }
  ];

  products = [ ];

  categories: any = [
    {
      category: 'shopping'
    },
    {
      category: 'folk'
    },
    {
      category: 'routine'
    }
  ];

  sort: Sort = {
    latest: false,
    price_lth: false,
    price_htl: false
  };

  beforeSort: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private httpClient: HttpClient,
    private platform: Platform
  ) { }

  initProductList() {
    this.getMedusaProducts().subscribe((medusaProducts: any) => {
      medusaProducts.products.map((medusaProductElement) => {
        const medusaToAppProducts = {
          id: medusaProductElement.id,
          imgurl: medusaProductElement.images[0].url,
          name: medusaProductElement.title,
          category: 'shopping',
          price: medusaProductElement.variants[0].prices[0].amount,
          totalStock: 10,
          varitant: medusaProductElement.variants[0].id,
        };
        this.products.push(medusaToAppProducts);
      });
    });
    // console.log(this.products);
    this.allProducts = this.products;
    this.showResultCount();
  }

  getMedusaProducts() {
    console.log('this.products');
    return this.httpClient.get(environment.MEDUSA_API_BASE_PATH + '/store/products', { headers: this.headers });
  }

  searchProducts(term: string) {
    this.products = [];
    if (`${term}`.trim()) {
      const NotFoundInName = this.allProducts.map(item => {
        if (item.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) < 0) {
          return item;
        } else {
          this.products.push(item);
        }
      });
      console.log({ NotFoundInName });

      const NotFoundInCategory = NotFoundInName.map(item => {
        if (item) {
          if (item.category.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) < 0) {
            return item;
          } else {
            this.products.push(item);
          }
        }
      });
      console.log({ NotFoundInCategory });

      const foundInPrice = NotFoundInCategory.map(item => {
        if (item) {
          if (`${item.price}`.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1) {
            this.products.push(item);
          }
        }
      });
    } else {
      this.products = this.allProducts;
    }

    this.showResultCount();
  }

  applyLocalSort(column, order, type) {
    this.uncheckSorts();
    this.sort[type] = true;
    this.beforeSort = this.products;
    this.products = this.beforeSort.sort((a, b) => {
      // console.log('sort :>> ', a, b);
      if (order === 'desc') {
        return a[column] > b[column];
      } else {
        return a[column] < b[column];
      }
    });
    this.showResultCount();
  }

  applyFilter() {
    console.log(this.selectedCategories, this.priceRange);
    if (this.selectedCategories.length > 0 || this.priceRange.applied) {
      console.log('Filter applied :>> ');
      this.products = [];

      for (let i = 0; i < this.allProducts.length; i++) {
        let foundCategory = true; let foundPrice = true;

        if (this.selectedCategories.length > 0) {
          foundCategory = this.selectedCategories.some(val => val.category.toLocaleLowerCase() === this.allProducts[i].category.toLocaleLowerCase() && val.isChecked);
        }

        if (this.priceRange.applied) {
          const price = this.allProducts[i].price;
          foundPrice = (price >= this.priceRange.lower && price <= this.priceRange.upper);
        }

        if (foundCategory && foundPrice) {
          this.products.push(this.allProducts[i]);
        }

      }
    } else {
      console.log('No Filter found:>> ');
      this.products = this.allProducts;
    }

    if (Object.values(this.sort).some(el => el)) {
      this.verifySort();
    }

    this.showResultCount();
  }

  verifySort() {
    if (this.sort.latest) {
      this.applyLocalSort('id', 'asc', 'latest');
    } else if (this.sort.price_lth) {
      this.applyLocalSort('price', 'desc', 'price_lth');
    } else if (this.sort.price_htl) {
      this.applyLocalSort('price', 'asc', 'price_htl');
    }
  }

  showResultCount() {
    this.show_result_size = true;
    setTimeout(() => {
      this.show_result_size = false;
    }, 2000);
  }

  resetItems() {
    this.products = [];
    this.allProducts = [];
    this.beforeSort = [];
    this.uncheckFilters();
  }

  uncheckFilters() {
    this.selectedCategories = [];
    this.defaultPriceRange();

    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i].isChecked = false;
    }
  }

  defaultPriceRange() {
    this.priceRange = {
      applied: false,
      lower: 0,
      upper: 100
    };

  }

  uncheckSorts() {
    this.defaultSorting();
  }

  defaultSorting() {
    Object.keys(this.sort).forEach(key => {
      this.sort[key] = false;
    });
  }

  isSorted() {
    return Object.values(this.sort).some(el => el);
  }

  isFiltered() {
    return this.selectedCategories.length > 0 || this.priceRange.applied;
  }

}

interface PriceRange {
  lower: any;
  upper: any;
  applied: boolean;
}

interface Sort {
  latest: boolean;
  price_lth: boolean;
  price_htl: boolean;
}
