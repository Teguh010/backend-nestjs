import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productsRepository.count();
    if (count === 0) {
      const mockProducts = [
        {
          name: 'Premium Wireless Headphones',
          price: 199.99,
          description:
            'High-quality sound with active noise cancellation and 40-hour battery life.',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        },
        {
          name: 'Mechanical Gaming Keyboard',
          price: 129.5,
          description:
            'RGB backlit mechanical keyboard with tactile blue switches.',
          image:
            'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        },
        {
          name: 'Ultra-wide 4K Monitor',
          price: 599.0,
          description:
            '34-inch curved display for immersive gaming and productivity.',
          image:
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
        },
        {
          name: 'Pro Wireless Mouse',
          price: 79.99,
          description:
            'Ergonomic design with high-precision sensor and customizable buttons.',
          image:
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
        },
      ];
      await this.productsRepository.save(mockProducts);
    }
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id: id as any });
  }

  async create(createProductDto: any): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product) as Promise<Product>;
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error('Product not found after update');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
