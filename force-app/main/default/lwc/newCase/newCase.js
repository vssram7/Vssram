// newCaseRecordComponent.js
import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import ACCOUNTID_FIELD from '@salesforce/schema/Case.AccountId';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class NewCaseRecordComponent extends LightningElement {
  @track subject = '';
  @track accountId = '';
  @track origin = '';
  @track status = '';
  @track priority = '';
  @track reason = '';
  @track description = '';
  @track originOptions = [];
  @track statusOptions = [];
  @track priorityOptions = [];
  @track reasonOptions = [];

  @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
  caseInfo;

  get accountIdFieldLabel() {
    return this.caseInfo.data ? this.caseInfo.data.fields.AccountId.label : '';
  }

  handleSubjectChange(event) {
    this.subject = event.target.value;
  }

  // handleAccountIdChange(event) {}
  accountId = "0015g00001JAV5XAAX"; //event.target.value;


  handleOriginChange(event) {
    this.origin = event.target.value;
  }

  handleStatusChange(event) {
    this.status = event.target.value;
  }

  handlePriorityChange(event) {
    this.priority = event.target.value;
  }

  handleReasonChange(event) {
    this.reason = event.target.value;
  }

  handleDescriptionChange(event) {
    this.description = event.target.value;
  }

  createCase() {
    const fields = {};
    fields[SUBJECT_FIELD.fieldApiName] = this.subject;
    fields[ACCOUNTID_FIELD.fieldApiName] = this.accountId;
    fields[ORIGIN_FIELD.fieldApiName] = this.origin;
    fields[STATUS_FIELD.fieldApiName] = this.status;
    fields[PRIORITY_FIELD.fieldApiName] = this.priority;
    fields[REASON_FIELD.fieldApiName] = this.reason;
    fields[DESCRIPTION_FIELD.fieldApiName] = this.description;

    const recordInput = { apiName: CASE_OBJECT.objectApiName, fields };
    createRecord(recordInput)
      .then((result) => {
        // Handle success
        console.log('Case created with recordId: ' + result.id);
        // Reset fields
        this.subject = '';
        this.accountId = '';
        this.origin = '';
        this.status = '';
        this.priority = '';
        this.reason = '';
        this.description = '';
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating case: ' + error.body.message);
      });
  }

  connectedCallback() {
    this.originOptions = this.getPicklistOptions(ORIGIN_FIELD);
    this.statusOptions = this.getPicklistOptions(STATUS_FIELD);
    this.priorityOptions = this.getPicklistOptions(PRIORITY_FIELD);
    this.reasonOptions = this.getPicklistOptions(REASON_FIELD);
  }

  getPicklistOptions(field) {
    const picklistValues = this.caseInfo.data ? this.caseInfo.data.fields[field.fieldApiName].picklistValues : [];
    return picklistValues.map((item) => ({ label: item.label, value: item.value }));
  }


}
