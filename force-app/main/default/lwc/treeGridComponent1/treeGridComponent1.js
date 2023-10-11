import { LightningElement ,track,wire,api} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import MANAGER_NAME from '@salesforce/schema/Manager__c.NameoftheManager__c';
import MANAGER_ROLE from '@salesforce/schema/Manager__c.Role__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import fetchDataFromSalesforce from '@salesforce/apex/TreeDemo.getManagerDetails';
import EMPLOYEE_OBJECT from '@salesforce/schema/Employee__c';
import MANAGER_OBJECT from '@salesforce/schema/Manager__c';
const MANAGER_FIELDS = [
  'Manager__c.NameoftheManager__c',
  'Manager__c.Role__c',
];
import getRelatedEmployees from '@salesforce/apex/TreeDemo.getRelatedEmployees';
export default class TreeGridComponent1 extends LightningElement {
  @api
  recordId;
  @track columns = [
    { label: 'Name', fieldName: 'NameoftheManager__c', type: 'text' },
    { label: 'Role', fieldName: 'Role__c', type: 'text' },
    {
      label: 'Action',
      type: 'button',
      typeAttributes: {
        iconName: 'utility:add',
        name: 'add',
        title: 'Add Data',
        variant: 'border-filled',
      },
    },
  ];
  @track data = [];
  wiredManagerData;
  @wire(getObjectInfo, { objectApiName: MANAGER_OBJECT })
  managerObjectInfo;
  @wire(getRecord, {
    recordId: "$recordId",
    fields: MANAGER_FIELDS})
   wiredManager({  data,error }) {
      if(data) {
        const managerdata = {
          Id: this.recordId,
          Name: getFieldValue(data, 'Manager__c.NameoftheManager__c'),
          Role: getFieldValue(data, 'Manager__c.Role__c'),
          _children: [] // Placeholder for child contacts
        };
        this.data = [managerdata];
      } else if (error) {
        console.error(error);
      }
    }

  //@track gridData;
  handleRowAction(event){
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    if (actionName === 'add') {
      // Get the manager Id from the row data
      const managerId = row.Id;
         console.log(managerId);
      // Call the Apex method to get related employees
      getRelatedEmployees({ managerId })
        .then((result) => {
          var tempVariable =JSON.parse(JSON.stringify(result));
          // Add the employees to the selected manager
         //console.log("result :"+JSON.stringify(result));
          var tempVariable =JSON.parse(JSON.stringify(result));
         console.log("result :"+JSON.stringify(tempVariable));
          const manager = this.data[0];
          //console.log("manager record is:"+JSON.stringify(manager[1]));
          manager._children = result.map((employees) => ({
            //console.log("total records":+JSON.stringify(_children));
            Id: employees.Id,
            Name: employees.NameoftheEmployee__c,
            Role: employees.Role__c,
            Email: employees.Email__c,
            Phone:employees.ContactNumber__c
          }));
          // Refresh the grid to display the employees
          refreshApex(this.wiredData);
        })
        .catch((error) => {
          console.error(JSON.stringify(error));
        });
    }
  }
}










   




   