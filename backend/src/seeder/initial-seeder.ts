import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { Product } from '../entity/product.entity';

export class InitialSeeder {
  constructor(private dataSource: DataSource) {}

  async seed(): Promise<void> {
    await this.seedUsers();
    await this.seedProducts();
  }

  private async seedUsers(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@greenkode.com',
        password: await bcrypt.hash('admin123', 10),
        mobile: '+1234567890',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        mobile: '+1234567891',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        mobile: '+1234567892',
      },
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });
      if (!existingUser) {
        await userRepository.save(userRepository.create(userData));
      }
    }

    console.log('Users seeded successfully');
  }

  private async seedProducts(): Promise<void> {
    const productRepository = this.dataSource.getRepository(Product);

    const products = [
      {
        name: 'Organic Green Tea',
        description:
          'Premium organic green tea leaves sourced from sustainable farms. Rich in antioxidants and perfect for daily consumption.',
        price: 12.99,
        stock: 50,
        image_url: '/images/green-tea.jpg',
      },
      {
        name: 'Bamboo Toothbrush',
        description:
          'Eco-friendly bamboo toothbrush with biodegradable bristles. Sustainable alternative to plastic toothbrushes.',
        price: 4.99,
        stock: 100,
        image_url: '/images/bamboo-toothbrush.jpg',
      },
      {
        name: 'Reusable Coffee Cup',
        description:
          'Insulated stainless steel reusable coffee cup. Keep your drinks hot while reducing single-use cup waste.',
        price: 18.99,
        stock: 75,
        image_url: '/images/reusable-cup.jpg',
      },
      {
        name: 'Organic Cotton Tote Bag',
        description:
          'Durable organic cotton tote bag for shopping and daily use. Say no to plastic bags.',
        price: 8.99,
        stock: 120,
        image_url: '/images/cotton-tote.jpg',
      },
      {
        name: 'Solar Powered Charger',
        description:
          'Portable solar charger for your devices. Harness solar energy to power your electronics sustainably.',
        price: 45.99,
        stock: 30,
        image_url: '/images/solar-charger.jpg',
      },
      {
        name: 'Biodegradable Phone Case',
        description:
          'Eco-friendly phone case made from biodegradable materials. Protect your phone and the planet.',
        price: 14.99,
        stock: 80,
        image_url: '/images/phone-case.jpg',
      },
      {
        name: 'LED Energy Saving Bulb',
        description:
          'Energy efficient LED bulb that consumes 80% less energy than traditional bulbs. Long-lasting and eco-friendly.',
        price: 6.99,
        stock: 200,
        image_url: '/images/led-bulb.jpg',
      },
      {
        name: 'Water Filter Pitcher',
        description:
          'Advanced water filter pitcher that reduces plastic bottle usage. Clean, filtered water at home.',
        price: 29.99,
        stock: 40,
        image_url: '/images/water-pitcher.jpg',
      },
    ];

    for (const productData of products) {
      const existingProduct = await productRepository.findOne({
        where: { name: productData.name },
      });
      if (!existingProduct) {
        await productRepository.save(productRepository.create(productData));
      }
    }

    console.log('Products seeded successfully');
  }
}
