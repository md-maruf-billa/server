export const isLocalIp = (ip: string) => {
    return (
        ip === '::1' ||
        ip === '127.0.0.1' ||
        ip === '::ffff:127.0.0.1' || // IPv6 mapped localhost
        ip.startsWith('192.168.') ||
        ip.startsWith('10.') ||
        ip.startsWith('172.')
    );
};
