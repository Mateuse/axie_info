import { Entity, Column, ObjectIdColumn} from 'typeorm';

@Entity('parts')
export class Part{
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    class: string;

    @Column()
    specialGenes: string;

    @Column()
    type: string;

    constructor(axie?: Partial<Part>){
        Object.assign(this, Part)
    }
}

@Entity('axies')
export class Axie{
    @ObjectIdColumn({unique: true})
    _id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    class: string;

    @Column()
    parts: Part[];

    @Column()
    auction: string;

    @Column()
    title: string;

    @Column()
    breedCount: number;

    constructor(axie?: Partial<Axie>){
        Object.assign(this, Axie)
    }

}
