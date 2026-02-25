# ecl-table

## Overview

Tables are used to structure complex data in an organised way that is more user friendly and discoverable.
<br>
<more-info componentPartUrl="table/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-table/Default)

```html
<p>Enhanced tables offers a more user friendly display on mobile. This is the default display of ECL tables, but you
    can turn this behaviour off by using the Input() 'isSimple' for the 'eclTable' directive.</p>

<div eclTableResponsive>
    <table eclTable id="table-id">
        <caption eclTableCaption>Table caption</caption>
        <thead eclTableHead>
            <tr eclTableRow>
                <th eclTableHeader id="table-id-header-1">Job title</th>
                <th eclTableHeader id="table-id-header-2">EFSI finance approved by EIB</th>
                <th eclTableHeader id="table-id-header-3">Location</th>
                <th eclTableHeader id="table-id-header-4">Organization</th>
                <th eclTableHeader id="table-id-header-5">Type of contract</th>
            </tr>
        </thead>
        <tbody eclTableBody>
            <tr eclTableRow>
                <td eclTableCellHeader="Job title" eclTableCell>Administators in Competition Law</td>
                <td eclTableCellHeader="EFSI finance approved by EIB" eclTableCell>AD7</td>
                <td eclTableCellHeader="Location" eclTableCell>Brussels (Belgium), Luxembourg (Luxembourg),
                    Strasbourg (France)</td>
                <td eclTableCellHeader="Organization" eclTableCell>European Commission</td>
                <td eclTableCellHeader="Type of contract" eclTableCell>Permanent official</td>
            </tr>
            <tr eclTableRow>
                <td eclTableCellHeader="Job title" eclTableCell>Administators in Economic and Monetary Union
                    Law</td>
                <td eclTableCellHeader="EFSI finance approved by EIB" eclTableCell>AD7</td>
                <td eclTableCellHeader="Location" eclTableCell>Brussels (Belgium), Luxembourg (Luxembourg),
                    Strasbourg (France)</td>
                <td eclTableCellHeader="Organization" eclTableCell>European Commission</td>
                <td eclTableCellHeader="Type of contract" eclTableCell>Permanent official</td>
            </tr>
            <tr eclTableRow>
                <td eclTableCellHeader="Job title" eclTableCell>Administators in Financial rules appliable to
                    the EU budget</td>
                <td eclTableCellHeader="EFSI finance approved by EIB" eclTableCell>AD7</td>
                <td eclTableCellHeader="Location" eclTableCell>Brussels (Belgium), Luxembourg (Luxembourg),
                    Strasbourg (France)</td>
                <td eclTableCellHeader="Organization" eclTableCell>European Commission</td>
                <td eclTableCellHeader="Type of contract" eclTableCell>Permanent official</td>
            </tr>
            <tr eclTableRow>
                <td eclTableCellHeader="Job title" eclTableCell>Corporate Support Officer</td>
                <td eclTableCellHeader="EFSI finance approved by EIB" eclTableCell>FG IV</td>
                <td eclTableCellHeader="Location" eclTableCell>Prague (Czech Republic)</td>
                <td eclTableCellHeader="Organization" eclTableCell>European Commission</td>
                <td eclTableCellHeader="Type of contract" eclTableCell>Permanent official</td>
            </tr>
            <tr eclTableRow>
                <td eclTableCellHeader="Job title" eclTableCell>Policy Officer - Clean Energy For All
                    Europeans</td>
                <td eclTableCellHeader="EFSI finance approved by EIB" eclTableCell>FG II, FG III, FG IV</td>
                <td eclTableCellHeader="Location" eclTableCell>Vigo (Spain)</td>
                <td eclTableCellHeader="Organization" eclTableCell>EU-LISA</td>
                <td eclTableCellHeader="Type of contract" eclTableCell>Seconded National Expert (SNE)</td>
            </tr>
        </tbody>
    </table>
</div>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { EUI_ECL_TABLE } from '@eui/ecl/components/ecl-table';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABLE],
})
export class DefaultComponent implements OnInit {
    date: Date = new Date();

    ngOnInit() {
        this.date.setDate(5);
        this.date.setMonth(0);
        this.date.setFullYear(2018);
    }
}
```

### Other examples

- [Zebra table](samples/ecl-table/zebra)
- [Multi header table](samples/ecl-table/multi-header)
- [Sort table](samples/ecl-table/sort)
