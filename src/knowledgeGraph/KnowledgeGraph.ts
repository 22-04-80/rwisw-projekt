export class KnowledgeGraph {
    protected readonly apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public search(query: string): Promise<any> {
        return fetch(this.getRequestUrl(query));
    }

    protected getRequestUrl(query: string) {
        return `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${this.apiKey}&limit=10&indent=True&types=Book`;
    }

}
