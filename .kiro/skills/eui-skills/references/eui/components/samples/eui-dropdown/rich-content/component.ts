import { Component } from '@angular/core';

import { EUI_DROPDOWN, EuiDropdownComponent } from "@eui/components/eui-dropdown";
import { EUI_TREE, TreeDataModel } from "@eui/components/eui-tree";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_SIDEBAR_MENU } from "@eui/components/eui-sidebar-menu";
import { EuiMenuItem } from "@eui/base";

@Component({
    // eslint-disable-next-line
    selector: 'rich-content',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_LIST,
        ...EUI_TREE,
        ...EUI_SIDEBAR_MENU,
    ],
})
export class RichContentComponent {

    public dropdownItems = [];
    public treeData: TreeDataModel = [
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Europe',
                },
            },
            children: [
                {
                    node: {
                        isExpanded: true,
                        selectable: true,
                        treeContentBlock: {
                            label: 'Benelux',
                        },
                    },
                    children: [
                        {
                            node: {
                                isExpanded: true,
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Belgium',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        isExpanded: true,
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Brussels',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                isExpanded: true,
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Ixelles',
                                                },
                                            },
                                            children: [
                                                {
                                                    node: {
                                                        selectable: true,
                                                        treeContentBlock: {
                                                            label: 'Place Flagey',
                                                        },
                                                    },
                                                },
                                                {
                                                    node: {
                                                        selectable: true,
                                                        treeContentBlock: {
                                                            label: 'Place du Châtelain',
                                                        },
                                                    },
                                                },
                                                {
                                                    node: {
                                                        selectable: true,
                                                        treeContentBlock: {
                                                            label: 'Place du Luxembourg',
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Etterbeek',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Uccle',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Forest',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Schaerbeek',
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    node: {
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Antwerp',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Liège',
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Luxemburg',
                                },
                            },
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Nederlands',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Latin America',
                },
            },
            children: [
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Argentina',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Brazil',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Chile',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Colombia',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Venezuela',
                        },
                    },
                },
            ],
        },
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Others',
                },
            },
        },
    ];

    public sidebarItems: EuiMenuItem[] = [
        { label: 'Module 1', url: '.', iconClass: 'eui-icon-work' },
        { label: 'Module 2', url: '.', iconClass: 'eui-icon-work' },
        { label: 'Module 3', url: '.', iconClass: 'eui-icon-work' },
        { label: 'With children' },
        { label: 'Programming',
            children: [
                { label: 'Programme intro' },
                { label: 'Programme 1', url: '.', iconClass: 'eui-icon-file', iconTypeClass: 'secondary' },
                { label: 'Programme 2', url: '.', iconClass: 'eui-icon-file', iconTypeClass: 'accent' },
                { label: 'Programme 3 disabled', url: '.', disabled: true, iconClass: 'eui-icon-file', iconTypeClass: 'warning' },
            ],
        },
    ];

    public onItemLinkClicked(item: string) {
        console.log('onItemLinkClicked() item:', item);
    }

    public onEnterkeyPress(item: string, dropdownRef: EuiDropdownComponent) {
        console.log('onEnterkeyPress() item:', item);
        dropdownRef.closeDropdown();
    }

    public onDeleteItemClicked(item: string, event: Event) {
        console.log('onDeleteClicked() delete item:', item);
        event.preventDefault();
        event.stopPropagation();
    }
}
