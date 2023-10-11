import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import pubsub from 'c/pubsub';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class caseDetail extends LightningElement {
    recordId;
    connectedCallback() {
        this.callsubscribe()
    }
    callsubscribe() {
        pubsub.subscribe('componentA', function (rowId) {
            this.recordId = rowId
        })
    }


    @api recordId;
    @api objectApiName = "Case";


    @track error;

    handleDeleteClick(event) {
        deleteRecord(this.recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Case',
                        actionName: 'home',
                    },
                });
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




    

    import { LightningElement, wire, track } from 'lwc';

import findDoctors from '@salesforce/apex/DoctorsFetchClass.findDoctors';

import { publish, MessageContext } from 'lightning/messageService';

import DOCTORDETAILS from '@salesforce/messageChannel/DoctorMessageChannel__c';

const DELAY = 300;

export default class ListOfDoctorsComponent extends LightningElement {

    @track searchKey = '';

    @track selectedDoctor;

    @track doctorId;

    @wire(findDoctors, { searchKey: '$searchKey' })

    doctors;

    handleKeyChange(event) {

        // Debouncing this method: Do not update the reactive property as long as this function is

        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.

        window.clearTimeout(this.delayTimeout);

        const searchKey = event.target.value;

        // eslint-disable-next-line @lwc/lwc/no-async-operation

        this.delayTimeout = setTimeout(() => {

            this.searchKey = searchKey;

        }, DELAY);

    }

    // wired message context

    @wire(MessageContext)

    messageContext;

    // Publishes the selected Id on the DOCTORDETAILS.



    sendMessageService() {

        const message = { recordId: this.doctorId };

        // explicitly pass doctortId to the parameter recordId

        publish(this.messageContext, DOCTORDETAILS, message);

        console.log("message is Published");

        console.log("message is Published" + message.recordId);

    }





    handleSelect(event) {

        this.doctorId = event.detail;

        this.selectedDoctor = this.doctors.data.find(

            (doctor) => doctor.Id === this.doctorId

        );

        console.log(this.doctorId);

        console.log(JSON.stringify(this.selectedDoctor));



    }



}




}
