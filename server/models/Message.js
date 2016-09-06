import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from      : { type: String, required: true },
    to        : { type: String, required: true },
    text      : { type: String, required: true },
    color     : { type: String                 },
    createdAt : { type: Date                   }
});

mongoose.model('Message', MessageSchema);
