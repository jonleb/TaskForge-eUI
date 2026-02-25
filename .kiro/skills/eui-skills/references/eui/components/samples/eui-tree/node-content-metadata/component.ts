import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Node-content-metadata',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX, ...EUI_LABEL],
})
export class NodeContentMetadataComponent {
    treeData: TreeDataModel = [{ 'node': { 'treeContentBlock': { 'label': 'Node 0' } } }, {
        'node': { 'treeContentBlock': { 'label': 'Node 1' } },
        'children': [{ 'node': { 'treeContentBlock': { 'label': 'Node 1.1' } } }, { 'node': { 'treeContentBlock': { 'label': 'Node 1.2' } } }, {
            'node': { 'treeContentBlock': { 'label': 'Node 1.3' } },
            'children': [{
                'node': {
                    'treeContentBlock': {
                        'label': 'Node 1.3.1',
                        'urlExternal': 'https://www.google.com',
                        'urlExternalTarget': '_blank',
                        'metadata': { 'title': 'this is the description' }
                    }
                }
            }, { 'node': { 'treeContentBlock': { 'label': 'Node 1.3.2' } } }]
        }, { 'node': { 'treeContentBlock': { 'label': 'Node 1.4' } } }, { 'node': { 'treeContentBlock': { 'label': 'Node 1.5' } } }]
    }];

}
