# showcase templates   view states   page edit state   list

```html
<eui-card euiNoContentPadding [euiHighlighted]="(asService.state$ | async).isDimmerActive">
	<eui-card-header>
        <eui-card-header-title>
            List of available cars &mdash;
            <span class="eui-u-f-regular eui-u-ml-xs">
                <span euiBadge>{{nbItems}}</span> result<span *ngIf="nbItems > 1">s</span> found
            </span>
        </eui-card-header-title>

        <eui-card-header-right-content>
            <eui-table-filter euiResponsive #filter placeholder="Search filter..." (filterChange)="onFilterChange($event)"></eui-table-filter>
            <button euiButton euiPrimary euiOutline (click)="onInsert($event)" class="eui-u-ml-m">
                <eui-icon-svg icon="eui-edit" class="eui-u-mr-xs"></eui-icon-svg>
                <span euiLabel>Add a new car</span>
            </button>
        </eui-card-header-right-content>
	</eui-card-header>

    <eui-card-content>
        <!-- The optional scrollable wrapper around the table allows dynamic scroll when the table is too big -->
        <div class="eui-table__scrollable-wrapper">
            <table euiTable isTableResponsive [data]="filteredData" [paginator]="paginator" [filter]="filter">
                <ng-template euiTemplate="header">
                    <tr>
                        <th sortable sortOn="vin" class="eui-u-text-no-wrap">Vendor Id</th>
                        <th sortable sortOn="year">Year</th>
                        <th sortable sortOn="brand">Brand</th>
                        <th sortable sortOn="brand">Model</th>
                        <th sortable sortOn="color">Color</th>
                        <th sortable sortOn="price" class="eui-u-text-no-wrap">Price (€)</th>
                        <th sortable sortOn="available">Available</th>
                        <th sortable sortOn="description">Description</th>
                        <th class="eui-u-text-center">Actions</th>
                    </tr>
                </ng-template>

                <ng-template let-row euiTemplate="body">
                    <tr>
                        <td data-col-label="Vendor Id">{{ row.vin }}</td>
                        <td data-col-label="Year"><eui-chip euiSecondary euiSizeS>{{ row.year }}</eui-chip></td>
                        <td data-col-label="Brand">{{row.brand.title}}</td>
                        <td data-col-label="Model">{{row.brand.model}}</td>
                        <td data-col-label="Color">{{row.color}}</td>
                        <td data-col-label="Price (€)" class="eui-u-text-right">{{row.price}}</td>
                        <td data-col-label="Available" class="eui-u-text-center">
                            <eui-icon-svg *ngIf="row.available" icon="eui-checkmark" fillColor="success"></eui-icon-svg>
                            <eui-icon-svg *ngIf="!row.available" icon="eui-close" fillColor="danger"></eui-icon-svg>
                        </td>
                        <td data-col-label="Description" euiTooltip="{{row.description}}" contentAlignment="left">{{ row.description | euiTruncate : 100 }}</td>
                        <td data-col-label="Actions" class="eui-u-text-center eui-u-text-no-wrap">
                            <button euiButton euiBasicButton euiIconButton euiRounded euiPrimary (click)="onEdit(row)" euiTooltip="Edit row" euiTooltipPrimary>
                                <eui-icon-svg icon="eui-edit" fillColor="primary"></eui-icon-svg>
                            </button>
                            <button euiButton euiBasicButton euiIconButton euiRounded euiDanger (click)="onDelete(row)" euiTooltip="Delete row" euiTooltipDanger>
                                <eui-icon-svg icon="eui-trash" fillColor="danger"></eui-icon-svg>
                            </button>
                        </td>
                    </tr>
                </ng-template>
            </table>
        </div>
        <eui-paginator #paginator [pageSizeOptions]="[5, 10, 25, 50, 100]" [pageSize]="5" [hasPageNumberNavigation]="true"></eui-paginator>

    </eui-card-content>
</eui-card>

<eui-message-box #messageBox euiWarning
    [title]="'WARNING'"
    (accept)="onAccept(car)"
    (dismiss)="onDismiss(car)">

    <div class="eui-u-flex eui-u-flex-column">
        <p class="eui-u-text-paragraph">Are you sure you want to delete this record ?</p>
        <div *ngIf="car">
            <strong>
                brand: {{ car?.brand.title }} {{ car?.brand.model }}<br>
                color: {{ car?.color }}<br>
                year: {{ car?.year }}<br>
                price: {{ car?.price }} €
            </strong>
        </div>
    </div>
</eui-message-box>
```
