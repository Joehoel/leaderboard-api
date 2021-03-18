import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity as TOEntity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Entity from "./Entity";
import { Leaderboard } from "./Leaderboard";

@TOEntity("scores")
export class Score extends Entity {
  constructor(model?: Partial<Score>) {
    super();
    Object.assign(this, model);
  }

  @Index()
  @Column()
  user: string;

  @Column()
  score: string;

  @Column({ default: "N/A" })
  proof: string;

  @ManyToOne(() => Leaderboard, leaderboard => leaderboard.scores)
  leaderboard: Leaderboard;
}
