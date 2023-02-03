import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/modules/common/utils';
import {DictionaryDishesService, DishModel, KeyValue} from '../dictionary-dishes.service';
import {DictionaryIngredientAutocomplete,DictionaryIngredientsService} from '../../../dictionary/dictionary-ingredients/dictionary-ingredients.service';
@Component({
    selector: 'dictionary-countries-create-update',
    templateUrl: './dictionary-dishes-create-update.component.html',
    styleUrls: ['./dictionary-dishes-create-update.component.sass']
})
export class DictionaryDishesCreateUpdateComponent implements OnInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Public properties
    // -------------------------------------------------------------------------

    /**
     * Page heading.
     */
    title: string;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Form values for request.
     */
    payload: DishModel;

    /**
     * Form.
     */
    form: FormGroup;

    /**
     * List of ingredients for selectbox
     */
    ingredients: DictionaryIngredientAutocomplete[];
    
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private ingredientsService: DictionaryIngredientsService,
                private dialogRef: MatDialogRef<DictionaryDishesCreateUpdateComponent>,
                private snackbar: MatSnackBar,
                private service: DictionaryDishesService,
                private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name: ['',Validators.required],
            ingredients: [[], Validators.required],
        });
    }

    // Lifecycle Methods
    // -------------------------------------------------------------------------

    ngOnInit() {

        if (this.data.id) {
            this.title = 'Редактировать';
            this.form.disable();
            this.getDishById();
        } else {
            this.title = 'Добавить';
        }
        this.getIngredients();
    }
    
    ngOnDestroy() { }

    // -------------------------------------------------------------------------
    // Public methods
    // -------------------------------------------------------------------------

    /**
     * Get country by ID
     */
    getDishById() {
        this.isRequesting = true;

        this.service
            .getDishById(this.data.id)
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(
                response => {
                    this.form.patchValue({
                        name: response.data.name,
                        ingredients: response.data.ingredients
                    });
                    this.form.enable();
                },
                error => (this.isRequesting = false),
                () => (this.isRequesting = false)
            );
    }
     /**
     * Get all ingredients
     */
     getIngredients() {
        this.ingredientsService
            .getSelectList()
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(response => {
                this.ingredients = response.data;
            });
    }
    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
       
        this.payload = {
            name: this.form.get('name').value,
            ingredients: this.form.get('ingredients').value,
        };

        let action = 'Create';

        if (this.data.id) {
            action = 'Edit';
            this.payload.id = this.data.id;
        }

        this.isRequesting = true;
        this.form.disable();
        
        this.service
            .submit(action, this.payload)
            .pipe(takeUntil(componentDestroyed(this)))
            .subscribe(
                response => {
                    if(response.errors.length > 0)
                    {
                        this.isRequesting = false;
                        this.form.enable();
                        
                        this.snackbar.open(response.errors[0].description);
                        return false;
                    }
                    else
                        this.dialogRef.close('submit');

                },
                error => {
                    this.isRequesting = false;
                    this.form.enable();
                    console.log(error);
                },
                () => {
                    this.isRequesting = false;
                    this.form.enable();
                }
            );
    }
}