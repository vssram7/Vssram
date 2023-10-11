import { LightningElement, track, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getCases from '@salesforce/apex/retriveCaseRecords.caseList';

const Columns = [
    { label: "Case Number", type: "text", fieldName: "CaseNumber" },
    { label: "Origin", type: 'text', fieldName: 'Origin' },
    { label: "Status", fieldName: 'Status' },
    { label: "Reason", fieldName: 'Reason' },
    { label: 'Account Id', fieldName: 'AccountId' },
    {
        type: 'button',
        typeAttributes: { label: 'View details', name: 'view', variant: 'Brand' }
    }
];
export default class caseRecords extends NavigationMixin(LightningElement) {

    rowId;
    @track columns = Columns;
    @track cases;
    error;
    @wire(getCases)
    wireCases({ error, data }) {

        if (data) {
            this.cases = data;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.cases = undefined;
        }
    }

    handleShowModal() {
        const modal = this.template.querySelector("c-new-case");
        modal.show();
    }


    handleRowAction(event) {
        const actionName = event.detail.action.name
        const row = event.detail.row
        this.rowId = row.Id;
        pubsub.publish('componentA', this.rowId)
        switch (actionName) {
            case 'view':

                this[NavigationMixin.Navigate]({

                    type: 'standard__navItemPage',
                    attributes: {
                        apiName: 'Case_Detail_Page'
                    }

                });
                break;
            default:
        }
    }



    import { LightningElement, api } from 'lwc';



export default class DoctorstileComponent extends LightningElement {

    @api doctor;



    handleClick(event) {

        console.log("Slected tile :" + this.doctor.Id);



        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url

        event.preventDefault();

        // 2. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices

        const selectEvent = new CustomEvent('select', {

            detail: this.doctor.Id



        });

        // 3. Fire the custom event

        this.dispatchEvent(selectEvent);

    }

}




}