import { Schema } from "mongoose";
export const PostSchema = new Schema(
    {
        board_category:{
            type:Number,
            required: true
        },
        product_category:{
            type:String,
            required: true
        },
        event_date:{
            type:String
        },
        event_location:{
            type:String
        },
        nickname:{
            type:String,
            required: true
        },
        title:{
            type:String,
            required: true
        },
        content:{
            type:String,
            required: true
        },
        picture:{
            type:String
        },
        isFound:{
            type:Boolean,
            defalut:false
        }
    },
    {   versionKey : false,
        timestamps: true,
        collection: "posts"
    }
)

export { PostSchema };