# ecl-sticky-container

## Overview

Overview

## API

API content

## Samples

### [Default](samples/ecl-sticky-container/Default)

```html
<div class="ecl-container">
    <div class="ecl-row">
        <div class="ecl-col-m-6">
            <ecl-sticky-container [marginTop]="64">
                <ecl-timeline>
                    <ecl-timeline-item label="13 September 2017" title="Item title 1">
                        <a eclLink routerLink="/">President Juncker's State of the Union speech</a>
                    </ecl-timeline-item>
                    <ecl-timeline-item label="14 November 2017" title="Item title 2">
                        <a eclLink routerLink="/">Informal Digital Summit, Tallinn</a>
                    </ecl-timeline-item>
                    <ecl-timeline-item label="13 December 2017" title="Item title 3">
                        <a eclLink routerLink="/">Strengthening European identity through education and culture: European Commission's contribution to the Leaders' meeting, Gothenburg, Sweden</a>
                    </ecl-timeline-item>
                    <ecl-timeline-item label="14-15 December 2017" title="Item title 4" toggleGroup="myGroup" isCollapsed>
                        <a eclLink routerLink="/">EU Leaders' meeting on migration, Brussels</a>
                    </ecl-timeline-item>
                    <ecl-timeline-item label="15 December 2017" title="Item title 5" toggleGroup="myGroup" isCollapsed>
                        <a eclLink routerLink="/">Euro Summit</a>
                    </ecl-timeline-item>
                    <ecl-timeline-item isToggler toggleGroup="myGroup"></ecl-timeline-item>
                    <ecl-timeline-item label="11 December 2018" title="Item title 6">
                        Commission contribution to the <a eclLink routerLink="/">Euro Summit</a>
                    </ecl-timeline-item>
                    <ecl-timeline-item label="13-14 December 2018" title="Item title 7">
                        Commission contribution to the Euro Summit
                    </ecl-timeline-item>
                </ecl-timeline>
            </ecl-sticky-container>
        </div>
        <div class="ecl-col-m-6">
            <h2 #nav1 class="ecl-u-type-heading-2">Heading 1</h2>
            <p class="ecl-u-type-paragraph-m">Est fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.</p>
            <h2 #nav2 class="ecl-u-type-heading-2">Heading 2</h2>
            <p class="ecl-u-type-paragraph-m">Est fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.</p>
            <h2 #nav3 class="ecl-u-type-heading-2">Heading 3</h2>
            <p class="ecl-u-type-paragraph-m">Est fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.Est fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.Est fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.st fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.</p>
            <h2 #nav4 class="ecl-u-type-heading-2">Heading 4</h2>
            <p class="ecl-u-type-paragraph-m">Est fugiat cillum et irure do irure laborum aliqua est aute officia magna. Officia do voluptate occaecat occaecat et eiusmod eiusmod velit elit nostrud. Mollit sunt ullamco occaecat quis veniam voluptate do velit tempor ipsum qui cillum id. Velit ullamco occaecat deserunt minim dolore reprehenderit aute duis sit culpa. Velit aliqua incididunt aute anim eu consectetur aute deserunt laboris consectetur. Lorem deserunt duis anim aliqua velit reprehenderit. Dolore labore in aliqua esse magna occaecat tempor. Irure minim ut esse laboris quis eu magna. Voluptate officia voluptate ex adipisicing. Ipsum pariatur aliquip occaecat non elit deserunt incididunt cillum ea nisi consequat culpa commodo. Est reprehenderit proident id eiusmod id sit exercitation elit laborum eu. Proident ex labore non do aliqua ea ad do quis. In occaecat eiusmod do magna enim in magna proident dolor eu ad anim. Aute fugiat anim irure ad ipsum nisi tempor est irure et qui reprehenderit veniam. Voluptate sunt veniam sunt elit voluptate commodo dolore. Qui quis enim in laboris aliqua deserunt excepteur officia id est qui sunt qui aute. Ex ad culpa consectetur dolor enim et qui id incididunt ea labore exercitation id. Cillum laborum duis qui fugiat duis. Et anim non Lorem ut veniam pariatur voluptate dolor Lorem. Id aute ipsum nostrud commodo duis anim. Minim elit eu id sint nostrud mollit aliqua eu irure amet est velit. Id reprehenderit incididunt ut voluptate dolore ipsum est aliquip ullamco nostrud occaecat incididunt Lorem. Sit incididunt cillum sunt incididunt fugiat irure nisi sunt fugiat. Non esse duis tempor laboris labore elit occaecat. Velit eu nostrud ea aliqua amet qui aliqua reprehenderit culpa cupidatat tempor incididunt.</p>
        </div>
    </div>
</div>
```

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_STICKY_CONTAINER } from '@eui/ecl/components/ecl-sticky-container';
import { EUI_ECL_TIMELINE } from '@eui/ecl/components/ecl-timeline';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_STICKY_CONTAINER, ...EUI_ECL_TIMELINE],
})
export class DefaultComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        const euiApp: HTMLElement = document.querySelector('eui-app');
        euiApp.style.overflow = 'visible';
    }

    ngOnDestroy(): void {
        const euiApp: HTMLElement = document.querySelector('eui-app');
        euiApp.style.overflow = 'hidden';
    }
}
```
