import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import BaseResponseInterface from '../../common/interfaces/base-response.interface';
import {MatTableDataSource} from '@angular/material';
import { buildQueryParams } from '../../common/utils';
import {map} from 'rxjs/operators';
import {DictionaryIngredientAutocomplete} from '../../dictionary/dictionary-ingredients/dictionary-ingredients.service';


 export interface KeyValue {
    id: number;
    name: string;
}

export interface DishModel {
    id?: number;
    name: string;
    ingredients: DictionaryIngredientAutocomplete[]
}

@Injectable({ providedIn: 'root' })
export class DictionaryDishesService {

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private http: HttpClient) { }

    // -------------------------------------------------------------------------
    // Get methods
    // -------------------------------------------------------------------------

    /**
     * Get list.
     */
    getList(): Observable<BaseResponseInterface<MatTableDataSource<DishModel[]>>> {
        return this.http.get<BaseResponseInterface<MatTableDataSource<DishModel[]>>>(
            environment.API.URL + 'dishes', { params: buildQueryParams() }
        );
    }

    /**
     *Get by id
     * @param id
     */
    getDishById(id?: number): Observable<BaseResponseInterface<DishModel>> {
        return this.http.get<BaseResponseInterface<DishModel>>(environment.API.URL + 'dishes/' + id);
    }
    /**
     * Remove
     * @param id
     */
    RemoveDishById(id): Observable<BaseResponseInterface<DishModel>> {
        return this.http.delete<BaseResponseInterface<DishModel>>(environment.API.URL + 'dishes/' + id);
    }
    // -------------------------------------------------------------------------
    // Create or Update methods
    // -------------------------------------------------------------------------

    /**
     *
     * @param action The type of job to do (Create | Edit)
     * @param payload Form value
     */
    submit(action: string, payload: DishModel) {
        const endpoint = environment.API.URL + 'dishes';
        if (action === 'Create') return this.http.post(endpoint, payload);
        if (action === 'Edit') return this.http.put(endpoint, payload);
    }
}
