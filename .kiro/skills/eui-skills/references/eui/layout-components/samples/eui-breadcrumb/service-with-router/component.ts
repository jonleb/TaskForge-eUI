// import { Component, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import {
//     EUI_BREADCRUMB,
//     EuiBreadcrumbService,
// } from '@eui/components/eui-breadcrumb';
// import { EUI_BUTTON } from '@eui/components/eui-button';
// import { EUI_SHOWCASE } from "@eui/showcase";

// @Component({
//     // eslint-disable-next-line
//     selector: 'ServiceUsage',
//     templateUrl: 'component.html',
//     standalone: false,
// })
// export class ServiceWithRouterComponent {
//     sampleCode = `service.setBreadcrumb([
//         {id: 'child-1', label: 'Child 1', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1'},
//         {id: 'child-2', label: 'Child 2', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1/child-2'},
//     ]);`
//     constructor(public service: EuiBreadcrumbService) {
//     }
// }

// @Component({ template: `<p class="eui-u-text-paragraph">You are in Parent</p><br><button [routerLink]="['child-1']" euiButton>Child 1</button>`, standalone: false,})
// export class ParentComponent {
//     constructor(private service: EuiBreadcrumbService) {
//         service.setBreadcrumb([]);
//     }
// }
// @Component({template: `<p class="eui-u-text-paragraph">You are in Child 1</p><br><button [routerLink]="['child-2']" euiButton>Child 2</button>
// <br><button [routerLink]="['child-3']" euiButton>Child 3</button>`, standalone: false,})
// export class Child1Component {
//     constructor(private service: EuiBreadcrumbService) {
//         service.setBreadcrumb([
//             {id: 'child-1', label: 'Child 1', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1'},
//         ]);
//     }
// }
// @Component({template: `<p class="eui-u-text-paragraph">You are in Child 2</p><br><button [routerLink]="['../']" euiButton>Child 1</button>`, standalone: false,})
// export class Child2Component {
//     constructor(private service: EuiBreadcrumbService) {
//         service.setBreadcrumb([
//             {id: 'child-1', label: 'Child 1', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1'},
//             {id: 'child-2', label: 'Child 2', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1/child-2'},
//         ]);
//     }
// }
// @Component({template: `<p class="eui-u-text-paragraph">You are in Child 3</p><br><button [routerLink]="['../']" euiButton>Child 1</button>`, standalone: false,})
// export class Child3Component {
//     constructor(private service: EuiBreadcrumbService) {
//         service.setBreadcrumb([
//             {id: 'child-1', label: 'Child 1', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1'},
//             {id: 'child-3', label: 'Child 3', link: '/style-guide/layout-components/eui-breadcrumb/parent/child-1/child-3'},
//         ]);
//     }
// }

// @NgModule({
//     imports: [
//         CommonModule,
//         ...EUI_BREADCRUMB, 
//         ...EUI_BUTTON,
//         ...EUI_SHOWCASE,
//         RouterModule,
//         RouterModule.forChild([
//             {
//                 path: '', component: ServiceWithRouterComponent,
//                 children: [
//                     { path: '', component: ParentComponent },
//                     {
//                         path: 'child-1',
//                         children: [
//                             {path: '', component: Child1Component},
//                             {path: 'child-2', component: Child2Component},
//                             {path: 'child-3', component: Child3Component},
//                         ],
//                     }],
//             },
//         ]),
//     ],
//     providers: [EuiBreadcrumbService],
//     exports: [ServiceWithRouterComponent],
//     declarations: [
//         ServiceWithRouterComponent,
//         Child3Component,
//         Child2Component,
//         Child1Component,
//         ParentComponent,
//     ],
// 	bootstrap: [ServiceWithRouterComponent],
// })
// export class ServiceWithRouterModule {
// }
