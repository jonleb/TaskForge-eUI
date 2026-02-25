import { Component } from "@angular/core";

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { TreeDataModel, EUI_TREE } from '@eui/components/eui-tree';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Mix-advanced',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        EuiTooltipDirective,
    ],
})
export class MixAdvancedComponent {
    public treeDataAllOptions: TreeDataModel = [
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Europe - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum felis, viverra quis ex id, posuere congue dui.',
                    iconClass: 'eui-flag-icon eui-flag-icon-eu',
                    iconTypeClass: '',
                    typeLabel: '27',
                    typeClass: 'primary',
                    chips: [
                        {
                            label: '27',
                            typeClass: 'primary',
                            isOutline: true,
                        },
                    ],
                    rightContent: {
                        badges: [
                            {
                                label: 'badge',
                                typeClass: 'secondary',
                            },
                        ],
                        chips: [
                            {
                                label: '3',
                                typeClass: 'danger',
                                isOutline: true,
                            },
                            {
                                label: '24',
                                typeClass: 'info',
                                isOutline: true,
                            },
                        ],
                        contextMenuMetaData: { items: ['Item1', 'Item2', 'Item3'] },
                    },
                },
                selectConfig: {
                    recursive: true,
                },
            },
            children: [
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Benelux - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum felis, viverra quis ex id, posuere congue dui.',
                            iconSvgName: 'globe:regular',
                            iconTypeClass: 'info-100',
                            typeLabel: '3',
                            typeClass: 'primary',
                            chips: [
                                {
                                    label: '3',
                                    typeClass: 'info',
                                    isOutline: true,
                                },
                            ],
                            rightContent: {
                                badges: [
                                    {
                                        label: 'badge',
                                        typeClass: 'secondary',
                                    },
                                ],
                                chips: [
                                    {
                                        label: '3',
                                        typeClass: 'info',
                                        isOutline: true,
                                    },
                                ],
                                hasContextMenu: true,
                            },
                        },
                        selectConfig: {
                            recursive: true,
                        },
                    },
                    children: [
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Belgium',
                                    iconClass: 'eui-flag-icon eui-flag-icon-be',
                                    iconTypeClass: '',
                                },
                            },
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Luxemburg',
                                    iconClass: 'eui-flag-icon eui-flag-icon-lu',
                                    iconTypeClass: '',
                                },
                            },
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Nederlands',
                                    iconClass: 'eui-flag-icon eui-flag-icon-nl',
                                    iconTypeClass: '',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Austria',
                            iconClass: 'eui-flag-icon eui-flag-icon-au',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Bulgaria',
                            iconClass: 'eui-flag-icon eui-flag-icon-bg',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Croatia',
                            iconClass: 'eui-flag-icon eui-flag-icon-hr',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Cyprus',
                            iconClass: 'eui-flag-icon eui-flag-icon-cy',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Czechia',
                            iconClass: 'eui-flag-icon eui-flag-icon-cz',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Denmark',
                            iconClass: 'eui-flag-icon eui-flag-icon-dk',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Estonia',
                            iconClass: 'eui-flag-icon eui-flag-icon-ee',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Finland',
                            iconClass: 'eui-flag-icon eui-flag-icon-fi',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'France',
                            iconClass: 'eui-flag-icon eui-flag-icon-fr',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Germany',
                            iconClass: 'eui-flag-icon eui-flag-icon-de',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Greece',
                            iconClass: 'eui-flag-icon eui-flag-icon-gr',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Hungary',
                            iconClass: 'eui-flag-icon eui-flag-icon-hu',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Ireland',
                            iconClass: 'eui-flag-icon eui-flag-icon-ie',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Italy',
                            iconClass: 'eui-flag-icon eui-flag-icon-it',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Latvia',
                            iconClass: 'eui-flag-icon eui-flag-icon-lv',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Lithuania',
                            iconClass: 'eui-flag-icon eui-flag-icon-lt',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Malta',
                            iconClass: 'eui-flag-icon eui-flag-icon-mt',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Poland',
                            iconClass: 'eui-flag-icon eui-flag-icon-pl',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Portugal',
                            iconClass: 'eui-flag-icon eui-flag-icon-pt',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Romania',
                            iconClass: 'eui-flag-icon eui-flag-icon-ro',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Slovakia',
                            iconClass: 'eui-flag-icon eui-flag-icon-sk',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Slovenia',
                            iconClass: 'eui-flag-icon eui-flag-icon-si',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'danger',
                            urlExternal: 'https://google.com',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Spain',
                            iconClass: 'eui-flag-icon eui-flag-icon-es',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'danger',
                            urlExternal: 'https://google.com',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Sweden',
                            iconClass: 'eui-flag-icon eui-flag-icon-se',
                            iconTypeClass: '',
                            typeLabel: 'badge',
                            typeClass: 'danger',
                            urlExternal: 'https://google.com',
                        },
                    },
                },
            ],
        },
    ];
}
