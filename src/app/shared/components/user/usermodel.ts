export class Usermodel {
     Id :number;
     FirstName :string;
    MiddleName :string;
     LastName:string;
     DisplayName :string;
     UserName :string;
     Email :string;
     Phone :string;
     Image :string;
    DOB :Date;
    
     Address  :string;
     CountryId  :number;
     StateId  :number;
     City  :string;
    PostalCode  :string;
    CompanyId  :number;
    
     LanguageId  :number;
    GenderId  :number;
    
    FacebookId  :string;
     TwitterId  :string;
    
     Password  :string;
    
     ReturnCode  :number;
    
     ReturnMessage  :string;

}
export class UserLogin
{
username :string;
Token :string;
refreshToken:string;
RoleId:number;
}