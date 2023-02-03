import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
    MatDialog,
    MatTableDataSource
} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {fade} from 'src/app/animations/all';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from 'src/app/modules/common/utils';
import {DictionaryDishesService} from '../dictionary-dishes.service';
import {DictionaryDishesCreateUpdateComponent} from '../dictionary-dishes-create-update/dictionary-dishes-create-update.component';
import { AppComponent } from '../../../../app.component';

@Component({
    selector: 'dictionary-dishes-list-component',
    templateUrl: './dictionary-dishes-list.component.html',
    styleUrls: ['./dictionary-dishes-list.component.sass'],
    animations: [fade]
})
export class DictionaryDishesListComponent implements OnInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Public properties
    // -------------------------------------------------------------------------

    /**
     * Current URL.
     */
    currentUrl = this.router.url;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Dishes values
     */
    dishes = new MatTableDataSource();

    /**
     * Columns to display in the table.
     */
    displayedColumns: string[] = ['name'];
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(
                private service: DictionaryDishesService,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private app: AppComponent,
                private router: Router
    ) {
        
    }

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------

    ngOnInit() {
        this.displayedColumns.push('actions');

        // Fetch data on every URL query params change
        this.route.queryParams.pipe(takeUntil(componentDestroyed(this))).subscribe(params => {
           this.getDishes();
        });
    }

    ngOnDestroy() { }

    // -------------------------------------------------------------------------
    // Public methods
    // -------------------------------------------------------------------------

    /**
     * Create or update dictionary sub-values
     * @param id sub-dictionary ID
     * @param name sub-dictionary name
     */
    openDialogUpdate(id?: number, name?: string): void {
        const dialogRef = this.dialog.open(DictionaryDishesCreateUpdateComponent, {
            data: { id, name }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(result => {
                if (result === 'submit') this.getDishes();
            });
    }

    // -------------------------------------------------------------------------
    // Private methods
    // -------------------------------------------------------------------------

    /**
     * list
     */
    private getDishes() {
        this.isRequesting = true;

        this.service
            .getList()
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(response => {
                this.dishes = response.data;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
            });
    }

    /**
     * Remove
     */
    private RemoveDishById(id: number) {
        this.isRequesting = true;

        this.service
            .RemoveDishById(id)
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(response => {
                alert("Запись удалена")
                this.getDishes();
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
            });
    }
}
