"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_column_decorator_1 = require("./decorator/virtual-column.decorator");
const typeorm_1 = require("typeorm");
typeorm_1.SelectQueryBuilder.prototype.getMany = async function () {
    const { entities, raw } = await this.getRawAndEntities();
    const items = entities.map((entitiy, index) => {
        var _a;
        const metaInfo = (_a = Reflect.getMetadata(virtual_column_decorator_1.VIRTUAL_COLUMN_KEY, entitiy)) !== null && _a !== void 0 ? _a : {};
        const item = raw[index];
        for (const [propertyKey, name] of Object.entries(metaInfo)) {
            entitiy[propertyKey] = item[name];
        }
        return entitiy;
    });
    return [...items];
};
typeorm_1.SelectQueryBuilder.prototype.getOne = async function () {
    var _a;
    const { entities, raw } = await this.getRawAndEntities();
    const metaInfo = (_a = Reflect.getMetadata(virtual_column_decorator_1.VIRTUAL_COLUMN_KEY, entities[0] || {})) !== null && _a !== void 0 ? _a : {};
    for (const [propertyKey, name] of Object.entries(metaInfo)) {
        entities[0][propertyKey] = raw[0][name];
    }
    return entities[0];
};
//# sourceMappingURL=override-typeorm.js.map