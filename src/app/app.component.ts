import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from './animations/router-transitions';
import { DateAdapter, MatSnackBar, MatDialog } from '@angular/material';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from './modules/common/utils';

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private dateAdapter: DateAdapter<any>,
        private router: Router,
        private titleService: Title,
        private snackbar: MatSnackBar,
        private matDialog: MatDialog,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // Set MatDatePicker locale
        this.dateAdapter.setLocale('ru');

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationStart),
                map(() => this.router),
                takeUntil(componentDestroyed(this))
            )
            .subscribe(event => {
                this.snackbar.dismiss();
                this.matDialog.closeAll();

                //console.log(this.route.snapshot.data);
            });

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.router),
                takeUntil(componentDestroyed(this))
            )
            .subscribe(event => {
                const title = this.constructTitle(this.router.routerState, this.router.routerState.root)
                    .reverse()
                    .join(' ‹ ');

                this.titleService.setTitle(title);
            });
    }

    /**
     * Construct document title based on route nesting.
     * @param state Current state snapshot.
     * @param parent Parent route.
     */
    private constructTitle(state, parent: ActivatedRoute) {
        const titlesArray = [];

        if (parent && parent.snapshot.data && parent.snapshot.data.title) titlesArray.push(parent.snapshot.data.title);
        if (state && parent) titlesArray.push(...this.constructTitle(state, state.firstChild(parent)));

        return titlesArray;
    }

    /**
     * Get route state.
     * @param outlet Router outlet.
     */
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    ngOnDestroy() {}
}
