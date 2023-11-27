import { Schema } from "mongoose";
import {shortId} from "./shortId/shortId.js";

const PostSchema = new Schema(
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
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
            default:false
        },
    },
    {   versionKey : false,
        timestamps: true,
        collection: "posts"
    }
)

export { PostSchema };