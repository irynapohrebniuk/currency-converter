import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CalcService {

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
            case '7 days': {
                return this.getDate7DaysBefore();
            }
            case '1 month': {
                return this.getDateMonthBefore();
            }
            case '1 year': {
                return this.getDateYearBefore();
            }
            case '5 years': {
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