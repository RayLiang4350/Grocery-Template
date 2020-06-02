export interface Order{
    item:item,
    quntity:number
}

export interface item{
    object_id:string,
    object_name:string,
    price:number,
    picture_url:string
}