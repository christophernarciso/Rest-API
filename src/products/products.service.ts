import {Injectable, NotFoundException} from '@nestjs/common';
import {ProductModel} from './product.model';

@Injectable()
export class ProductsService {
    private readonly products: ProductModel[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodID = Math.random().toString();
        const newProd = new ProductModel(prodID, title, desc, price);
        this.products.push(newProd);
        return prodID;
    }

    fetchProducts() {
        return [...this.products];
    }

    getProduct(productID: string) {
        const product = this.findProduct(productID)[0];
        return {...product};
    }

    updateProduct(productID: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productID);
        const updatedProduct = {...product};
        if (title)
            updatedProduct.title = title;
        if (desc)
            updatedProduct.description = desc;
        if (price)
            updatedProduct.price = price;

        this.products[index] = updatedProduct;
    }

    deleteProduct(productID: string) {
        const [_, index] = this.findProduct(productID);
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [ProductModel, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product)
            throw new NotFoundException('Could not find product');
        return [product, productIndex];
    }
}