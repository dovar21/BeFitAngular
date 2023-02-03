import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainNavigationComponent } from './layout/main-navigation/main-navigation.component';
import { SidenavStateService } from './layout/dashboard-layout/sidenav-state.service';
import { SidebarToggleComponent } from './layout/sidebar-toggle/sidebar-toggle.component';
import { PushNotificationsModule } from 'ng-push';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { CommonComponentsModule } from './modules/common/components/common-components.module';
import { GlobalHttpHeadersInterceptorService } from './modules/common/services/http-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardLayoutComponent,
        HeaderComponent,
        MainNavigationComponent,
        SidebarToggleComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LayoutModule,
        NgMaterialMultilevelMenuModule,
        PerfectScrollbarModule,
        DictionaryModule,
        PushNotificationsModule,
        CommonComponentsModule,
    ],
    entryComponents: [],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpHeadersInterceptorService, multi: true },
        SidenavStateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
