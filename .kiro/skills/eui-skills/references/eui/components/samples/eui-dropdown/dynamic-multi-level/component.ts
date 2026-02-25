import { Component, ViewChild, Input, ViewEncapsulation } from "@angular/core";

import { EUI_DROPDOWN, EuiDropdownComponent } from "@eui/components/eui-dropdown";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: "app-dynamic-dropdown-click",
    template: `
        <eui-dropdown #menu>
            <ng-content></ng-content>
            <eui-dropdown-content>
            @for (item of items; track $index) {
                @if (!item.children) {
                    <button
                        euiDropdownItem
                        (click)="onClick(item.name)"
                        [attr.aria-label]="item.name">
                            <span euiLabel>{{ item.name }}</span>
                    </button>
                } @else {
                    <button
                        euiDropdownItem
                        [subDropdown]="subDropdown.menu"
                        (click)="subDropdown.menu.openDropdown($any($event).target)                "
                        [attr.aria-label]="item.name">
                            <span euiLabel>{{ item.name }}</span>
                    </button>
                    <app-dynamic-dropdown-click #subDropdown [items]="item.children"></app-dynamic-dropdown-click>
                }
            }
            </eui-dropdown-content>
        </eui-dropdown>
    `,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
})
export class DynamicDropdownClickComponent {
    @ViewChild("menu", { static: true }) menu: EuiDropdownComponent;
    @ViewChild("subDropdown", { static: true })
    subDropdown: DynamicDropdownClickComponent;
    @Input() items: any[];

    onClick(str: string): void {
        console.log(str);
    }
}

@Component({
    selector: "app-dynamic-dropdown-hover",
    template: `
        <eui-dropdown isExpandOnHover #menu>
            <ng-content></ng-content>
            <eui-dropdown-content>
            @for (item of items; track $index) {
                @if (!item.children) {
                    <button
                        euiDropdownItem
                        (click)="onClick(item.name)"
                        [attr.aria-label]="item.name">
                            <span euiLabel>{{ item.name }}</span>
                    </button>
                } @else {
                    <button euiDropdownItem [subDropdown]="subDropdown.menu" (mouseenter)="subDropdown.menu.openDropdown($any($event).target)" [attr.aria-label]="item.name">
                        <span euiLabel>{{ item.name }}</span>
                    </button>
                    <app-dynamic-dropdown-hover #subDropdown [items]="item.children"></app-dynamic-dropdown-hover>
                }
            }
            </eui-dropdown-content>
        </eui-dropdown>
    `,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
})
export class DynamicDropdownHoverComponent {
    @ViewChild("menu", { static: true }) menu: EuiDropdownComponent;
    @ViewChild("subDropdown", { static: true })
    subDropdown: DynamicDropdownHoverComponent;
    @Input() items: any[];

    onClick(str: string): void {
        console.log(str);
    }
}

@Component({
    // eslint-disable-next-line
    selector: "dynamic-multi-level",
    templateUrl: "component.html",
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BUTTON,
        DynamicDropdownClickComponent,
        DynamicDropdownHoverComponent,
    ],
})
export class DynamicMultiLevelComponent {
    public items = [
        {
            name: "Menu item 1 with very very long label that will be automatically truncated by ellipsis",
        },
        {
            name: "Country",
            children: [
                { name: "Austria" },
                {
                    name: "Belgium",
                    children: [
                        { name: "Antwerp" },
                        {
                            name: "Brussels",
                            children: [
                                { name: "Pl. du Lux." },
                                { name: "Pl. Flagey" },
                                { name: "Rue Neuve" },
                                { name: "Grand Place" },
                                { name: "Sablon" },
                                { name: "Bourse" },
                                { name: "Gare du Midi" },
                                { name: "Gare Centrale" },
                                { name: "Parvis de St. Gilles" },
                            ],
                        },
                        { name: "Namur" },
                        { name: "Ostende" },
                        { name: "Liège" },
                    ],
                },
                { name: "Bulgaria" },
                { name: "Croatia" },
                {
                    name: "France",
                    children: [
                        { name: "Lyon" },
                        {
                            name: "Paris",
                            children: [
                                { name: "Tour Eiffel" },
                                { name: "Arc de Triomphe" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "Car",
            children: [
                { name: "Renault" },
                { name: "Peugeot" },
                { name: "BMW" },
                { name: "Fiat" },
                { name: "Seat" },
                { name: "Skoda" },
            ],
        },
        {
            name: "European DG",
            children: [
                { name: "AGRI" },
                { name: "BUDG" },
                { name: "CLIMA" },
                { name: "COMM" },
                { name: "Connect" },
                { name: "COMP" },
            ],
        },
    ];
}
