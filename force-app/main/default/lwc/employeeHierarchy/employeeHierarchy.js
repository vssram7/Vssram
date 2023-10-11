import { LightningElement, wire } from 'lwc';
import employeeDetails from '@salesforce/apex/employeeApex.employeeList';
export default class EmployeeHierarchy extends LightningElement {

    gridData = []
   @wire(employeeDetails)
   employeeDetails({data, error}){
    if(data){
        console.log(data)
        this.formatGridData(data)
    }
    if(error){
        console.error(error)
    }
   }


     gridColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Position', fieldName: 'Position__c', type: 'text' },
        { label: 'Email', fieldName: 'Email__c', type: 'text' },
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
    ]

    dummyData = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Position', fieldName: 'Position__c', type: 'text' },
        { label: 'Email', fieldName: 'Email__c', type: 'text' },
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
    ]

    formatGridData(result){
        this.gridData = result.map(item=>{
            const {employees__r, ...employee__c} = item
            const updatedemployees = employees__r.map(cont=>{
                return {...empl, "_children":this.dummyData}
            })
            return {...employee__c, "_children":updatedemployees}
        })
        console.log(this.gridData)
    }
   
}