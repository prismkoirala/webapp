export interface UserBasicInfo{
    id: number
    full_name: string
    first_name: string
    last_name: string
    username: string
    phone_number: string
    email: string
    is_blocked: boolean
    user_type: string
}

export interface UserList {
    id: number;
    name: string;
    email: string;
    phone_number: number;
    user_type: string;
  }

export interface PaginatedUsersList {
    next: string;
    previous: string;
    page: number;
    page_size: number;
    count: number;
    total_pages: number;
    results: UserList[];
}



export interface User {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
    username: string
    password: string
    confirm_password: string
    address: string
    province: string
    district: string
    municipality: string
    ward: string
}

export interface TypeOfUserList {
    id: number;
    type: string;
  }

export interface UserProfile {
    id: number;
    username: number;
    profile_picture: any
}

export interface UserOrganization {
    id: number;
    organization_info: number;
}

export interface AddressBook {
    province: string
    district: string
    municipality: string
    ward: string
}
export  interface WishList{
    user: string
    product: Object
    id: number
    
}

export interface PaginatedWishList { 
    next: string;
    previous: string;
    page: number;
    page_size: number;
    count: number;
    total_pages: number;
    results: WishList[];
}

