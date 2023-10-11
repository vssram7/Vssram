import { LightningElement, track } from 'lwc';
import employeeDetails from '@salesforce/apex/employeeApex.employeeList';
import relatedEmployeeDetails from '@salesforce/apex/employeeApex.relatedEmployeeList';
export default class employeeTreeGrid extends LightningElement {

@track gridColumns = [   
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Position', fieldName: 'Position__c', type: 'text' },
    { label: 'Email', fieldName: 'Email__c', type: 'text' },

]
@track rerelatedEmployees = [];
@track gridData;
connectedCallback(){

    employeeDetails()
        .then(result =>{
            //console.log('Tpe of result '+typeof result)
            const temp = result;
            console.log('temp...'+JSON.stringify(temp));
            for(var i=0; i<temp.length; i++){
                var relatedEmployees = temp[i]['Employees__r'];
               // console.log('related...'+JSON.stringify(relatedEmployees))
                if(relatedEmployees){
                temp[i]._children = relatedEmployees;
              //  console.log('children...'+JSON.stringify(temp[i]._children));
                    delete temp[i].Employees__r;
                   // console.log('rlated...'+JSON.stringify(relatedEmployees))
                   
                    relatedEmployeeDetails()
                    .then(result=>{
                        const temp1 = result;
                        console.log('temp1...'+JSON.stringify(temp1));                        
                        for(var j=0; j<relatedEmployees.length; j++){                                         
                            for(var k=0; k<temp1.length; k++){                               
                                if((relatedEmployees[j].Id == temp1[k].Reporting_To__c)){                                  
                                    this.rerelatedEmployees.push(temp1[k]);                                                                                                         
                                }
                            }
                           // console.log(this.rerelatedEmployees.length)
                            if(this.rerelatedEmployees.length>0){
                            relatedEmployees[j]._children =[...this.rerelatedEmployees]; 
                            this.rerelatedEmployees.splice(0);   
                            }                  
                        }
                        this.gridData = temp;
                        console.log('temp final data ...' +JSON.stringify(this.gridData));
                    })
                    .catch(error=>{
                        console.error(error); 
                    })
            }
            } 
           // this.gridData = temp;
           // console.log('temp final data ...' +JSON.stringify(this.gridData));
            
        })
        .catch(error =>{
            console.error(error);
        })
}

handlerowselection(event){
    const selecteddata = event.detail.selectedRows;
    console.log('selected data...' +JSON.stringify(selecteddata))

    for(var i=0; i<selecteddata.length; i++){
        console.log('Name>>'+selecteddata[i].Name);
        console.log('Email>>'+selecteddata[i].Email__c);

    }
}

}
