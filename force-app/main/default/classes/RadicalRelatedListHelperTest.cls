@isTest
public with sharing class RadicalRelatedListHelperTest {
    @testsetup
    public static void setupData() {
        //Accounts
        list<Account> accountListToInsert = new list<Account>();
        		Account accObj1 = new Account();
        		accObj1.Name = 'Test Account1';
        	accountListToInsert.add(accObj1);
        insert accountListToInsert;
        
        //Opportunities
        Opportunity opp = new Opportunity();
            opp.Name = 'Test Opp';
            opp.Account = accObj1;
            opp.StageName = '2. Qualify the Hurt';
            opp.CloseDate = system.today();
        insert opp;
    }
    
    public static testmethod void test() {
        Account acct =[SELECT Id FROM Account limit 1];

        Test.startTest();
        
            RadicalRelatedListHelper.ReturnWrapper result = RadicalRelatedListHelper.getRecords(
                acct.Id,'Opportunity',
                'Name,CloseDate,Probability,StageName,IQscore,Amount,IsPrivate',
                'true', 
                '', 
                '', 
                'Name != "Test"', 
                '', 
                ''
            );
       
        Test.stopTest();
    }
}