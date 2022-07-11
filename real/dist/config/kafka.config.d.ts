declare const _default: (() => {
    client: {
        clientId: string;
        brokers: string;
    };
    consumer: {
        groupId: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    client: {
        clientId: string;
        brokers: string;
    };
    consumer: {
        groupId: string;
    };
}>;
export default _default;
