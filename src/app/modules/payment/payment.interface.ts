export type TPayment={
    planId:string;
    accountId:string;
    name:string;
    number?:string;
    email:string;
    // payment info
    invoiceId?:string;
    paymentId?:string;
    amount?:string;
    verifiedStatus:boolean;
    trxID?:string;
    reference?:string;
    payerAccountNumber?:string;
}