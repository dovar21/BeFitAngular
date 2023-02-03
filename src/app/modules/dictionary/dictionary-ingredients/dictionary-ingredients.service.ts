import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import BaseResponseInterface from '../../common/interfaces/base-response.interface';
import {MatTableDataSource} from '@angular/material';
import { buildQueryParams } from '../../common/utils';
import {map} from 'rxjs/operators';

 export interface KeyValue {
    id: number;
    name: string;
}

export interface IngredientModel {
    id?: number;
    name: string;
}
export interface DictionaryIngredientAutocomplete {
    id: number;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class DictionaryIngredientsService {

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
    getList(): Observable<BaseResponseInterface<MatTableDataSource<IngredientModel[]>>> {
        return this.http.get<BaseResponseInterface<MatTableDataSource<IngredientModel[]>>>(
            environment.API.URL + 'ingredients', { params: buildQueryParams() }
        );
    }
    /**
     * Get select list.
     */
    getSelectList(): Observable<BaseResponseInterface<DictionaryIngredientAutocomplete[]>> {
        return this.http.get<BaseResponseInterface<DictionaryIngredientAutocomplete[]>>(
            environment.API.URL + 'ingredients', { params: buildQueryParams() }
        );
    }
    /**
     *Get by id
     * @param id
     */
    getIngredientById(id?: number): Observable<BaseResponseInterface<IngredientModel>> {
        return this.http.get<BaseResponseInterface<IngredientModel>>(environment.API.URL + 'ingredients/' + id);
    }
    /**
     * Remove
     * @param id
     */
    RemoveIngredientById(id): Observable<BaseResponseInterface<IngredientModel>> {
        return this.http.delete<BaseResponseInterface<IngredientModel>>(environment.API.URL + 'ingredients/' + id);
    }
    // -------------------------------------------------------------------------
    // Create or Update methods
    // -------------------------------------------------------------------------

    /**
     *
     * @param action The type of job to do (Create | Edit)
     * @param payload Form value
     */
    submit(action: string, payload: IngredientModel) {
        const endpoint = environment.API.URL + 'ingredients';
        if (action === 'Create') return this.http.post(endpoint, payload);
        if (action === 'Edit') return this.http.put(endpoint, payload);
    }
}
