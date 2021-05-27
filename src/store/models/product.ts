export interface CategoryInfo{
    name: String
    description: String
    boxicon: String
}

export interface ProductInfo{
    name: String
    description: String
    category: CategoryInfo[]
    price: String
    variant_name: String
}

export interface ProductDetail{
    id: Number
    name: String
    description: String
    category: CategoryInfo[]
    price: String
    images: ImageSliderModel[]
    variant_name: String
    variant_value: String
}

export interface ImageSliderModel{
    id: Number
    image: String
    thumbnail_image: String
    hd_image: String
    caption: String
    product: Number 
}


export interface ProductVariantDetail{
    id: Number
    price: String
    cost_price: String
    sku: String
    product: Number
}