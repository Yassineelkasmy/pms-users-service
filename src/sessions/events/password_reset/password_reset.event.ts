export class PasswordResetEvent{
    constructor(public  userId:string, public readonly userEmail:string) {}
}