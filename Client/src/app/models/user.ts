

export default interface User{
    email: string;
    password: string;
    nationality?: string;
    dateOfBirth?: Date;
    firstName?: string;
    lastName?: string;
    roleId: number;
    token:string;
};

