export interface Province {
    id: String
    scode: String
    name: String
} 

export interface District {
    id : String
    scode : String
    dcode : String
    name : String
}

export interface Municipality {
    id: String
    scode : String
    dcode : String
    mcode : String
    name : String
}

export interface Ward {
    id : String
    scode : String
    dcode : String
    mcode : String
    ward_number : String
}
