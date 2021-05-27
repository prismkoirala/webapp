export enum Action {
    // Base = "https://127.0.0.1:8000",
    Base = 'https://gipechecommerce.el.r.appspot.com',
    API = "/api",

    //JWT config
    ObtainToken = "auth/obtain/token",
    RefreshToken = "auth/refresh/token",
    VerifyToken = "auth/verify/token",

    // Admininstrative Area Config
    Province = "administrative_area/province/list",
    District = "administrative_area/district/list",
    Municipality = "administrative_area/municipality/list",
    Ward = "administrative_area/ward/list",
    
    //auth config
    User = "auth/users",
    GetUserBasicInfo = "auth/user/basic_info",
    GetTypesOfUsers = "auth/get/users/type/list",
    // user config
    Address = "user_app/address",
    Order = "user_app/order",
    WishList = "user_app/wishlist",

    //ProductConfig
    GetCategoryInfo = "ecommerce/category",
    GetProductInfo = "ecommerce/products",
    GetProductImage = "ecommerce/product/images",
    GetProductVariant = "ecommerce/variant"


    // //SUPERUSER - organization config
    // OrganizationInfo = "auth/organizations",
    // GetOrganizationsList = "auth/get/organizations/list",
}
