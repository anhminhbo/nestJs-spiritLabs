declare module 'typeorm' {
    interface SelectQueryBuilder<Entity> {
        getMany(this: SelectQueryBuilder<Entity>): Promise<Entity[] | undefined>;
        getOne(this: SelectQueryBuilder<Entity>): Promise<Entity | undefined>;
    }
}
export {};
