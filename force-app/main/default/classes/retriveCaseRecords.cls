public class retriveCaseRecords {
   @AuraEnabled(cacheable=true)
   public static List<Case> caseList(){
    List<Case> cList = [SELECT Id, CaseNumber, Status, Origin, accountId, account.Name, Reason
                             FROM Case ORDER BY CreatedDate desc];
    return cList;
   }
}