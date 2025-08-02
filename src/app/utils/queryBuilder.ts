const queryBuilder = (query: any, keys: string[]) => {
    const filter: Record<string, any> = {};
    for (const key of keys) {
        if (query[key] !== undefined) {
            filter[key] = query[key];
        }
    }
    return filter;
};

export default queryBuilder;