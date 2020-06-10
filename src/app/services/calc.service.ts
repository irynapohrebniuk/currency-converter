import { Injectable } from '@angular/core';
import { Periods } from './periods.enum';

@Injectable({
    providedIn: 'root'
})

export class CalcService {

    toMoneyFormat(value) {
        return Number.parseFloat(value).toFixed(2);
    }

    toFinancialFormat(value) {
        return Number.parseFloat(value).toFixed(4);
    }

    calculateTo() {
        let today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const dd = (day < 10) ? ('0' + day) : day;
        const mm = (month < 10) ? ('0' + month) : month;
        return yyyy + '-' + mm + '-' + dd;
    }

    calculateFrom(period) {
        switch (period) {
            case Periods.SEVEN_DAYS: {
                return this.getDate7DaysBefore();
            }
            case Periods.ONE_MONTH: {
                return this.getDateMonthBefore();
            }
            case Periods.ONE_YEAR: {
                return this.getDateYearBefore();
            }
            case Periods.FIVE_YEARS: {
                return this.getDate5YearsBefore();
            }
            default: {
                return this.getDate7DaysBefore();
            };
        }
    }

    private getDate7DaysBefore() {
        let today = new Date();
        today.setDate(today.getDate() - 7);
        const day = today.getDate();
        const month = today.getMonth() + 1;

        const dd = (day < 10) ? ('0' + day) : day;
        const mm = (month < 10) ? ('0' + month) : month;
        const yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    private getDateMonthBefore() {
        let today = new Date();
        today.setMonth(today.getMonth() - 1);
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const dd = (day < 10) ? ('0' + day) : day;
        const mm = (month < 10) ? ('0' + month) : month;
        return yyyy + '-' + mm + '-' + dd;
    }

    private getDateYearBefore() {
        let today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const yyyy = today.getFullYear() - 1;
        const dd = (day < 10) ? ('0' + day) : day;
        const mm = (month < 10) ? ('0' + month) : month;
        return yyyy + '-' + mm + '-' + dd;
    }

    private getDate5YearsBefore() {
        let today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const yyyy = today.getFullYear() - 5;
        const dd = (day < 10) ? ('0' + day) : day;
        const mm = (month < 10) ? ('0' + month) : month;
        return yyyy + '-' + mm + '-' + dd;
    }

}