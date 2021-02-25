export declare type Options = {
    url: string;
    secondaryAuthMode: 'jwt' | 'session';
    api?: ApiOptions;
    ws?: boolean;
};
export declare type ApiOptions = {
    url: string;
    primaryAuthMode?: 'jwt';
    secondaryAuthMode: 'jwt' | 'session';
    loginPath?: string;
    logoutPath?: string;
};
export declare type User = {
    _id: string;
};
export declare type Listener = (payload: any) => Promise<void>;
export declare type RequestTransformer = (request: RequestInit) => RequestInit;
export declare class OothClient {
    private oothUrl;
    private secondaryAuthMode;
    private api;
    private listeners;
    private user;
    private token;
    private ws;
    private started;
    constructor({ url, secondaryAuthMode, api, ws }: Options);
    start(): Promise<User | undefined>;
    on(eventName: string, listener: Listener): void;
    unsubscribe(eventName: string, listener: Listener): void;
    emit(eventName: string, payload: any): Promise<void>;
    authenticate(strategy: string, method: string, body: any): Promise<User | undefined>;
    method<T>(strategy: string, method: string, body?: any, headers?: any): Promise<T>;
    logout(): Promise<void>;
    apiCall<T>(path: string, body: any, headers: any): Promise<T>;
    fetchUser(headers?: any): Promise<User | undefined>;
    setUser(user: User | undefined): Promise<void>;
}
