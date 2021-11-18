
type ServerConfigType = {
    questionInterval: ReturnType<typeof setInterval> | null;
    roundInterval: ReturnType<typeof setInterval> | null;
}

export const ServerConfig: ServerConfigType = {
    questionInterval: null,
    roundInterval: null
}
