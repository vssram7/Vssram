import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { NavigationMixin } from 'lightning/navigation';

export default class CaseListLWC extends NavigationMixin(LightningElement) {
    caseRecords;

    @wire(getListUi, {
        objectApiName: 'Case',
        listViewApiName: 'All',
        pageSize: 10
    })
    wiredCases({ error, data }) {
        if (data) {
            this.caseRecords = data.records.records;
        } else if (error) {
            console.error('Error retrieving case records:', error);
        }
    }

    handleRecordClick(event) {
        const caseId = event.currentTarget.dataset.caseId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: caseId,
                actionName: 'view'
            }
        });
    }
}
