import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingFabComponent } from './floating-fab/floating-fab.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { GetHostPipe } from '../pipes/get-host.pipe';

const components = [
    FloatingFabComponent,
    RightSidebarComponent,
    GetHostPipe
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        AppRoutingModule,
        MaterialModule
    ],
    exports: components,
    entryComponents: [
    ]
})
export class CommonComponentsModule {}
