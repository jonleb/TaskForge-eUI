# showcase templates   templates   mywp templates   tasks centre   task details   :id   overview

```html
<eui-fieldset label="General information" isExpandable>
    <!-- MANDATORY INFOS -->
    <div class="row">
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Contract number</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">300032985</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Maximum contract value</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">800 EUR</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Contract title</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">SG 18052022 Audit Sanity</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Leader</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">DELOITTE BEDRIJFSREVISOREN/REVISEURS D'ENTREPRISES</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Start date</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">18/06/2022</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">End date</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">19/12/2022</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Duration</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">220 day(s)</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Procedure type</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">Specific contract under framework contract</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Project ID</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">CCREF-ALERT-2021-{{ data?.population }}</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Commitment type</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">&mdash;</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Project owner</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">{{ data?.country }}</div>
        </div>
        <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
            <div class="eui-u-c-text-light">Lot</div>
            <div class="eui-u-flex-wrap eui-u-f-bold">&mdash;</div>
        </div>
    </div>

    <!-- More/ Less -->
    @if (hasSupplementaryItems) {
        <button euiButton euiPrimary euiOutline euiSizeS class="eui-u-mv-m" (click)="onShowMoreToggle($event)">
            @if (!showMore) {
                <eui-icon-svg icon="eui-add" />
                More
            } @else {
                <eui-icon-svg icon="eui-remove" />
                Less
            }
        </button>
    }

    <!-- MORE OPTIONAL INFOS -->
    @if (showMore) {
        <div class="row">
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Process</div>
                <div class="eui-u-flex-wrap eui-u-f-bold eui-u-c-warning-light">RoutingReferenceFlow</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Process version</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">1</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Task</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">User Task1</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Facilitator</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">Vesta Considine</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Task ID</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">51912</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Creation date</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">30/05/2022 00:00:00</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Task status</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">Completed</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Contractor</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">Jane DOE</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Domain</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">GRANTS</div>
            </div>
            <div class="col-xxxl-3 col-xxl-4 col-xl-6 eui-u-mb-xs">
                <div class="eui-u-c-text-light">Urgent</div>
                <div class="eui-u-flex-wrap eui-u-f-bold">false</div>
            </div>
        </div>
    }
</eui-fieldset>

<eui-fieldset label="Comments" isExpandable>
    <eui-timeline>
        <eui-timeline-item
            date="07/06/2024"
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            subLabel="by Jane DOE" />
        <eui-timeline-item
            date="01/06/2024"
            label="Etiam cursus nec enim nec viverra."
            subLabel="by John DOE" />
        <eui-timeline-item
            date="15/03/2024"
            label="Aenean sit amet ligula ac libero tempor semper at accumsan lorem. Donec et tincidunt nulla. Vivamus et tortor blandit, tempor dolor a, hendrerit nibh."
            subLabel="by Jane DOE" />
    </eui-timeline>
</eui-fieldset>

<eui-fieldset label="Task actions" isExpandable>
   <eui-alert euiInfo>
        <eui-alert-title>Instructions</eui-alert-title>
        In order to complete this task, you need to perform the following actions.
   </eui-alert>
</eui-fieldset>
```
