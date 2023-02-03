import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonComponentsModule} from '../common/components/common-components.module';
import { DictionaryIngredientsListComponent } from './dictionary-ingredients/dictionary-ingredients-list/dictionary-ingredients-list.component';
import { DictionaryIngredientsCreateUpdateComponent } from './dictionary-ingredients/dictionary-ingredients-create-update/dictionary-ingredients-create-update.component';
import { DictionaryDishesListComponent } from './dictionary-dishes/dictionary-dishes-list/dictionary-dishes-list.component';
import { DictionaryDishesCreateUpdateComponent } from './dictionary-dishes/dictionary-dishes-create-update/dictionary-dishes-create-update.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

@NgModule({
    declarations: [
        DictionaryIngredientsListComponent,
        DictionaryIngredientsCreateUpdateComponent,
        DictionaryDishesListComponent,
        DictionaryDishesCreateUpdateComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        PerfectScrollbarModule,
        CommonComponentsModule
    ],
    entryComponents: [
        DictionaryIngredientsCreateUpdateComponent,
        DictionaryDishesCreateUpdateComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class DictionaryModule {}
