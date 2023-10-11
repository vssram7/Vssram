import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCases from '@salesforce/apex/retriveCaseRecords.caseList';
import Case from '@salesforce/schema/Case'
import AccountName from '@salesforce/schema/Case.AccountId'
import CaseOrigin from '@salesforce/schema/Case.Origin'
import Priority from '@salesforce/schema/Case.Priority'
import CaseReason from '@salesforce/schema/Case.Reason'
import Status from '@salesforce/schema/Case.Status'
import Subject from '@salesforce/schema/Case.Subject'
import Description from '@salesforce/schema/Case.Description'

export default class caseTaskScenario extends NavigationMixin(LightningElement) {

    caseColumns = [];
    casesData = [];
    caseRecords = [];
    rowData;
    error;
    iterableData = [];
    landingPageVisible = true;
    caseDetailVisible = false;
    accountDetailVisible = false;
    showNewCasePopup = false;
    pageSizeOptions = [5, 10, 25, 50, 75, 100];
    totalRecords = 0;
    pageSize;
    totalPages;
    pageNumber = 1;

    get disableOnFirstPage() {
        return this.pageNumber == 1;
    }

    get disableOnLastPage() {
        return this.pageNumber == this.totalPages;
    }

    connectedCallback() {
        this.caseColumns = [
            { label: "Case Number", fieldName: "CaseNumber" },
            { label: "Origin", fieldName: 'Origin' },
            { label: "Status", fieldName: 'Status' },
            { label: "Reason", fieldName: 'Reason' },
            { label: 'Account Id', fieldName: 'AccountId' },
            {
                type: 'button', label: 'Case Detail',
                typeAttributes: { label: 'View Case details', name: 'viewCase', variant: 'Brand' }
            },
            {
                type: 'button', label: 'Account Detail',
                typeAttributes: { label: 'View Account details', name: 'viewAcoount', variant: 'Brand', disabled: false }
            }
        ];

        getCases()
            .then((result) => {
                if (result != null) {
                    this.caseRecords = result;
                    this.totalRecords = result.length;
                    this.pageSize = this.pageSizeOptions[0];
                    this.paginationHelper();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleRecordDetailButton(event) {
        const row = event.detail.row
        const rowData = JSON.parse(JSON.stringify(row));
        this.rowData = rowData;
        // console.log('Lets see...' + this.rowData);
        if (event.detail.action.name == 'viewCase') {
            this.landingPageVisible = false;
            this.caseDetailVisible = true;
        }
        else if ((event.detail.action.name == 'viewAcoount') && this.rowData.AccountId != undefined) {
            // console.log(this.rowData.AccountId)
            this.landingPageVisible = false;
            this.accountDetailVisible = true;
        }
    }

    caseObjectApiName = Case;
    NewCaseRecordFields = [CaseOrigin, Priority, CaseReason, Status, AccountName, Subject, Description];

    handleDeleteClick() {
        deleteRecord(this.rowData.Id)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record with Id: ' + this.rowData.Id + ' has been successfully deleted',
                        variant: 'success',
                    })
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__navItemPage',
                    attributes: {
                        apiName: 'Case_Information'
                    },
                });
                location.reload();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    handleNewCaseButtonClick() {
        this.showNewCasePopup = true;
    }
    handleDialogClose() {
        if (this.accountDetailVisible == true) {
            this.showNewCasePopup = false;
            this.landingPageVisible = false;
            this.accountDetailVisible = true;
        }
        else {
            this.showNewCasePopup = false;
            this.landingPageVisible = true;
        }
    }

    handleGoBackClick() {
        this.landingPageVisible = true;
        this.caseDetailVisible = false;
        this.accountDetailVisible = false;
    }

    handleNewCaseSave(event) {
        const recordId = event.detail.id;
        // console.log("Record created successfully" + event.detail.recordId);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: ' Record Created Successfully: ' + recordId,
                variant: 'success'
            })
        );
        if (this.accountDetailVisible == true) {
            this.showNewCasePopup = false;
            this.accountDetailVisible = false;
            setTimeout(() => {
                location.reload();
            }, 1000);
            this.landingPageVisible = true;
        }
        else {
            setTimeout(() => {
                this.showNewCasePopup = false;
                location.reload();
            }, 1000);
            this.landingPageVisible = true;
        }
    }
    handleNewCaseCancel() {
        if (this.accountDetailVisible == true) {
            this.showNewCasePopup = false;
            this.landingPageVisible = false;
            this.accountDetailVisible = true;
        }
        else {
            this.showNewCasePopup = false;
            this.landingPageVisible = true;
        }
    }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }

    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }

    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    paginationHelper() {
        this.casesData = [];
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.casesData.push(this.caseRecords[i]);
        }
    }
}