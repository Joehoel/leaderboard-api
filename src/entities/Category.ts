import { Column, Entity as TOEntity, Index, OneToMany } from "typeorm";
import Entity from "./Entity";
import { Leaderboard } from "./Leaderboard";

@TOEntity("category")
export class Category extends Entity {
  constructor(model?: Partial<Category>) {
    super();
    Object.assign(this, model);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Leaderboard, leaderboard => leaderboard.category)
  leaderboards: Leaderboard[];
}
