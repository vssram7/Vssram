public class employeeApex {
    @AuraEnabled
    public static List<Employee__c> employeeList(){
        List<Employee__c> empList =  [SELECT Id, Name, Position__c, Email__c,
                                     (SELECT Id, Name, Position__c, Email__c, Reporting_To__c FROM employees__r)
                                     FROM employee__c 
                                     Where Position__c = 'Head of Technology'];
        return empList;
    }
    
    @AuraEnabled
    public static List<Employee__c> relatedEmployeeList(){
        List<Employee__c> relatedEmpList = [SELECT Id, Name, Position__c, Email__c, Reporting_To__c
                                    		 FROM employee__c];
        return relatedEmpList;
    }
}