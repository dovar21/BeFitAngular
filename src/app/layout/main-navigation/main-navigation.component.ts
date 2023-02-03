import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SidenavStateService } from '../dashboard-layout/sidenav-state.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/modules/common/utils';

@Component({
    selector: 'main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent
    implements OnInit, AfterViewInit, OnDestroy {
    
    /**
     * Component config object
     */
    config = {
        classname: 'main-navigation',
        fontColor: '#D2D7E8',
        selectedListFontColor: '#533DFE',
        interfaceWithRoute: true,
        highlightOnSelect: true,
        collapseOnSelect: true
    };

    appitems = [
        {
            label: 'Главная',
            link: '/'
        },
        {
            label: 'Ингредиенты',
            link: '/dictionaries/ingredients'
        },
        {
            label: 'Блюда',
            link: '/dictionaries/dishes'
        }
    ];

    /**
     * Determines if it's app init state.
     */
    isInit: boolean;

    constructor(
        private app: AppComponent,
        private sidenavService: SidenavStateService,
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit() {
        this.isInit = true;
    }

    ngAfterViewInit() {
        this.isInit = false;
    }

    /**
     * Close sedebar on screens less that 767px wide.
     */
    closeSideBarOnSmallScreen(event) {
        if (!this.isInit) {
            this.breakpointObserver
                .observe('(max-width: 767px)')
                .pipe(takeUntil(componentDestroyed(this)))
                .subscribe((state: BreakpointState) => {
                    if (state.matches)
                        this.sidenavService.onSideNavToggle.emit(false);
                });
        }
    }

    ngOnDestroy() {}
}
