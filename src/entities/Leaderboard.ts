import { Column, Entity as TOEntity, Index, ManyToOne, OneToMany } from "typeorm";
import Entity from "./Entity";
import { Category } from "./Category";
import { Score } from "./Score";

@TOEntity("leaderboards")
export class Leaderboard extends Entity {
  constructor(model?: Partial<Leaderboard>) {
    super();
    Object.assign(this, model);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Index()
  @ManyToOne(() => Category, category => category.leaderboards)
  category: Category;

  @OneToMany(() => Score, score => score.leaderboard)
  scores: Score[];
}
