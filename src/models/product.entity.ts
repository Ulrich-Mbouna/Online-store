import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./item.entity";


@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number

  getId():number{
    return this.id
  }
  setId(id:number){
    return this.id = id
  }

  @Column()
  name: string

  getName():string{
    return this.name.toUpperCase()
  }
  setName(name:string){
    return this.name = name
  }

  @Column()
  description: string

  getDescription():string{
    return this.description
  }
  setDescription(description:string){
    return this.description = description
  }

  @Column()
  image: string

  getImage():string{
    return this.image
  }
  setImage(image:string){
    return this.image = image
  }

  @Column()
  price:number

  getPrice():number{
    return this.price
  }
  setPrice(price:number){
    return this.price = price
  }

  @OneToMany(() => Item, (item) => item.product)
  items: Item[];

  getItem():Item[]{
    return this.items
  }
  setItem(items:Item[]){
    return this.items = items
  }

  static sumPricesByQuantities(products: Product[], productsInSession): number {
    let total=0;
    for(let i=0; i< products.length; i++) {
      total = total + products[i].getPrice() * productsInSession[products[i].getId()];
    }

    return total;
  }
  
}