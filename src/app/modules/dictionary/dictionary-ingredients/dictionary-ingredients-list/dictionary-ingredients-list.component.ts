import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
    MatDialog,
    MatTableDataSource
} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {fade} from 'src/app/animations/all';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from 'src/app/modules/common/utils';
import {DictionaryIngredientsService} from '../dictionary-ingredients.service';
import {DictionaryIngredientsCreateUpdateComponent} from '../dictionary-ingredients-create-update/dictionary-ingredients-create-update.component';
import { AppComponent } from '../../../../app.component';

@Component({
    selector: 'dictionary-ingredients-list-component',
    templateUrl: './dictionary-ingredients-list.component.html',
    styleUrls: ['./dictionary-ingredients-list.component.sass'],
    animations: [fade]
})
export class DictionaryIngredientsListComponent implements OnInit, OnDestroy {

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
     * Ingredients values
     */
    ingredients = new MatTableDataSource();

    /**
     * Columns to display in the table.
     */
    displayedColumns: string[] = ['name'];
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(
                private service: DictionaryIngredientsService,
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
           this.getIngredients();
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
        const dialogRef = this.dialog.open(DictionaryIngredientsCreateUpdateComponent, {
            data: { id, name }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(result => {
                if (result === 'submit') this.getIngredients();
            });
    }

    // -------------------------------------------------------------------------
    // Private methods
    // -------------------------------------------------------------------------

    /**
     * list
     */
    private getIngredients() {
        this.isRequesting = true;

        this.service
            .getList()
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(response => {
                this.ingredients = response.data;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
            });
    }

    /**
     * Remove
     */
    private RemoveIngredientById(id: number) {
        this.isRequesting = true;

        this.service
            .RemoveIngredientById(id)
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(response => {
                alert("Запись удалена")
                this.getIngredients();
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
            });
    }
}
