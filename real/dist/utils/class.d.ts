export declare class GetDataParams {
    page: number;
    size: number;
    keyword?: string;
    sort?: string;
}
export declare class RequestUser {
    userId: string;
    role?: string;
}
export declare class ResponseJson {
    data: Record<string, any>;
    meta?: string;
}
export declare class KafkaMessagePayload {
    body: any;
    messageId: string;
    messageType: string;
    topicName: string;
    createdTime?: string;
}
export declare class KafkaMessage {
    key?: any;
    value: KafkaMessagePayload;
    headers: any;
    topic: string;
    partition: number;
}
