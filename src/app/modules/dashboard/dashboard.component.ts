import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../common/utils';
import { fade } from '../../animations/all';

// const Muuri = require('muuri');

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass'],
    animations: [fade]
})
export class DashboardComponent implements OnDestroy, OnInit, AfterViewInit {
    /**
     * Muuri.js options.
     */
    muuriOptions = {
        dragEnabled: true
    };

    draggableGrid: any;

    constructor(
        
    ) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initGrid();
    }

    /**
     * Initialize grid.
     */
    private initGrid() {
       
    }

    ngOnDestroy() {}
}
