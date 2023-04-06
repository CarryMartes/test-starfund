class LocalStorage {
    localStorage: any;
    constructor() {
        this.localStorage = window.localStorage;
    }
    set(key: string, value: string) {
        this.localStorage.setItem(key, value)
    }

    get(key: string): string {
        return this.localStorage.getItem(key);
    }
}

const localStorage = new LocalStorage();

export default localStorage;
