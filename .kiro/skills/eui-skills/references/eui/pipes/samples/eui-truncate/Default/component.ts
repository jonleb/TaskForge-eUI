import { Component } from '@angular/core';

import { EuiTruncatePipe } from '@eui/components/pipes';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [EuiTruncatePipe]
})
export class DefaultComponent {
    // tslint:disable max-line-length
    public commentSmall = 'The quick brown fox jumps over the lazy dog';
    public commentBig = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur id diam vitae varius. Nullam ornare lectus quis dui volutpat, id tincidunt dolor ultricies. Curabitur ut nulla vitae nisl interdum fringilla feugiat in felis. Suspendisse commodo massa a ipsum interdum, accumsan gravida arcu vestibulum. Donec pharetra congue lorem. Vestibulum porta suscipit ullamcorper. Maecenas pellentesque feugiat ultricies. Suspendisse faucibus diam ac est porttitor, sed vestibulum nisl viverra.';
}
