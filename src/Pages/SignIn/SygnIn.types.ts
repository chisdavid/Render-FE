
export const NAME: string = "Name";
export const USERNAME: string = "UserName";
export const ADDRESS: string = "Address";
export const PASSWORD: string = "Password";
export const DATE: string = "Date"

export interface ISignInTypes {
    NAME: "Name";
    USERNAME: "UserName";
    ADDRESS: "Address";
    PASSWORD: "Password";
    DATE: "Date"
}
export enum SignInTypes {
    EMAIL = "Email",
    NAME = "Name",
    USERNAME = "UserName",
    ADDRESS = "Address",
    PASSWORD = "Password",
    DATE = "Date",
    ID = "Id",
    BIRTHDATE = "BirthDate",
    PHONE_NUMBER = "Phone Number",
    PHOTO = "Profile Photo"
}

export interface ISignInProps {

}