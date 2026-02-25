import { Injectable } from "@angular/core";

@Injectable()
export class FakeService {
    public readonly id: number;

    constructor() {
        this.id = Math.floor(Math.random() * 1000);
        console.log("FakeService instance created with id =", this.id);
    }

    fake(): void {
        console.log("fake() called from instance", this.id);
    }
}
