import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ProductsService} from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    addProduct(@Body('title') prodTitle: string,
               @Body('description') prodDesc: string,
               @Body('price') prodPrice: number) {
        const genID = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: genID};
    }

    @Patch(':id')
    updateProduct(@Param('id') prodID: string,
                  @Body('title') prodTitle: string,
                  @Body('description') prodDesc: string,
                  @Body('price') prodPrice: number) {
        this.productsService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodID: string) {
        this.productsService.deleteProduct(prodID);
        return null;
    }

    @Get()
    getAllProducts() {
        return this.productsService.fetchProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') prodID: string) {
        return this.productsService.getProduct(prodID);
    }
}