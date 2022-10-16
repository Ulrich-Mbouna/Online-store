import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";

export class OrdersService {
  constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>) {
  }

  createOrUpdate(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  findByUserId(id: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        user: { id}
      },
      relations: ['items', 'items.product']
    })
  }
}