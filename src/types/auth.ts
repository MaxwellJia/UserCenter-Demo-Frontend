// Register request to the backend and respond from the backend
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    token?: string;
    IsSuccess: boolean;
    ErrorMessage?: string;
}

/** Log in request to the backend and respond from the backend
 * saveChanges used  LoginUser as request and LoginResponse as respond**/
export interface LoginRequest {
    username: string;
    password: string;
}

 // User data saved in LoginResponse
 // Also used to send user information to backend for saveChanges (Profile)
export interface LoginUser {
    userId:string;
    avatar?: string;
    nickName: string;
    email: string;
    userRole: number;
    phone: string;
    gender: number;
}

//Response after login
//Also used to receive respond from the backend for saveChanges (Profile)
export interface LoginResponse {
    isSuccess: boolean;
    message: string;
    data?: LoginUser;
}

/** Message to sign out to the back end as a response, no request needed **/
export interface LogoutResponse {
    message: string;
}

//  Added user table type used to retrieved users
export interface CurrentUser {
    id: string;
    username: string;
    nickName: string;
    avatarUrl: string;
    gender: number;
    phone: string;
    email: string;
    userRole: number;
}

/** Used to be as the filter of searching users **/
export interface FilterUser {
    id?: string;
    userName?: string;
    nickName?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userRole?: number;
    current?: number;
    pageSize?: number;
}


/** Used to update the relative user **/
export interface UpdateUser {
    id: string;            // 用户ID (GUID)
    userName?: string;     // 用户名
    nickName?: string;     // 昵称
    avatarUrl?: string;    // 头像地址
    email?: string;        // 邮箱
    phone?: string;        // 电话
    gender?: number;       // 性别 (0 = Female, 1 = Male)
    userRole?: number;     // 用户角色 (0 = 普通用户, 1 = 管理员)
}
