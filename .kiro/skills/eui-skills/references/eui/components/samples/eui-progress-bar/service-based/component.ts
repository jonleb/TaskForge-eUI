import { Component, OnDestroy } from "@angular/core";
import { interval, Subject, Subscription } from 'rxjs';

import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_BUTTON } from "@eui/components/eui-button";

import { IncrementService } from '../../services/increment.service';

@Component({
    // eslint-disable-next-line
    selector: 'service-based',
    templateUrl: 'component.html',
    imports: [...EUI_FEEDBACK_MESSAGE, ...EUI_PROGRESS_BAR, ...EUI_BUTTON],
    providers: [IncrementService],
})
export class ServiceBasedComponent implements OnDestroy {

    public isProcessCompleted = false;
    public uploadProgress = 0;

    public importProgress = 0;
    public maxProgress = 1000;
    public isImportCompleted = false;

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private subscription: Subscription;

    constructor(private incrementService: IncrementService) { }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public startFileUpload(e: Event) {
        this._startIncrementValue();
    }

    public startImport(e: Event) {
        this._startImport();
    }

    private _startIncrementValue() {
        this.incrementService.incrementValue().subscribe(value => {
            this.uploadProgress = value;
            if (value === 100) {
                this.isProcessCompleted = true;
            }
        });
    }

    private _startImport() {
        this.importProgress = 0;
        this.subscription = interval(5).subscribe(() => {
            if (this.importProgress < this.maxProgress) {
                this.importProgress++;
            } else {
                this.isImportCompleted = true;
                this.subscription.unsubscribe();
            }
        });
    }
}
