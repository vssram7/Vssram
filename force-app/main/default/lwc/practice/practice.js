import { LightningElement, track, wire } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi'
import { getRecord } from 'lightning/uiRecordApi'
import Id from '@salesforce/user/Id'

export default class Practice extends LightningElement {
    account;
    @wire(getRecord, { recordId: '0015g00000twuPKAAY', fields: ['Account.Name', 'Account.Industry'] })
    userDetailHandler({ data, error }) {
        if (data) {
            this.account = data.fields;
            console.log(this.account)
        }
        else {
            console.error(error)
        }

    }

    // userId = Id

    // userDetail
    // @wire(getRecord, { recordId: '0015g00000twuPKAAY', fields: ['Account.Name'] })
    // userDetailHandler({ data, error }) {
    //     if (data) {
    //         this.userDetail = data.fields
    //         console.log(this.userDetail)
    //     }
    //     if (error) {
    //         console.error(error)
    //     }
    // }




    collabera;
    course = "Salesforce";
    handleCourseName(event) {
        this.course = event.detail.value;
    }
    @track collabera = {
        Name: "Siva",
        Age: 25
    }
    handleTrack(event) {
        this.collabera.Name = event.detail.value;
    }
}