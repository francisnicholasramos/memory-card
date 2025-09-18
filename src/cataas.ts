export type Cat = {
    id: string,
    tags?: string[],
    mimetype?: string,
    createAt?: string,
    clickCount: number,
    url: string
}

export default function cataas() {
    async function fetchCats(limit: number = 7) {
        const json = Array.from({ length: limit }, () =>  
           fetch(`https://cataas.com/cat?json=true`).then((res) => res.json())
        );

       const modifiedJson: Cat[] = (await Promise.all(json)).map(property => ({
           ...property,
           clickCount: 0,
       }));

       return modifiedJson;
    }

    async function getCats(): Promise<Cat[]> {
        const data = await fetchCats();
        const arr: Cat[] = [];

        arr.push(...data);

        return arr;
    }

    return { fetchCats, getCats }
};


