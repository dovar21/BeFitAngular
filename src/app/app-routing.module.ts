import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DictionaryIngredientsListComponent } from './modules/dictionary/dictionary-ingredients/dictionary-ingredients-list/dictionary-ingredients-list.component';
import { DictionaryDishesListComponent } from './modules/dictionary/dictionary-dishes/dictionary-dishes-list/dictionary-dishes-list.component';

const routes: Routes = [
    {
        path: '',
        data: { title: 'BeFit' },
        component: DashboardLayoutComponent,
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { title: 'Главная' }
            },
            {
                path: 'dictionaries',
                data: { title: 'Справочники' },
                children: [
                    {
                        path: 'ingredients',
                        data: {
                            title: 'Ингредиенты',
                            controllerName: 'Ingredients'
                        },
                        children: [
                            {
                                path: '',
                                component: DictionaryIngredientsListComponent,
                            }
                        ]
                    },
                    {
                        path: 'dishes',
                        data: {
                            title: 'Блюда>',
                            controllerName: 'Dishes'
                        },
                        children: [
                            {
                                path: '',
                                component: DictionaryDishesListComponent,
                            }
                        ]
                    }
                ]
            }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
