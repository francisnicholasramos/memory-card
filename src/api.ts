export type Cat = {
    id: string,
    tags?: string[],
    mimetype?: string,
    createAt?: string,
    clickCount: number
}

async function apiCall(limit: number = 5) {
    const raw = await fetch(`https://cataas.com/api/cats?limit=${limit}`);
        const convert: Cat[] = await raw.json();
    const modified = convert.map(property => ({
        ...property,
        clickCount: 0,
    }));
    return modified;

};

export default apiCall;
