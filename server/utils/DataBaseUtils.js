import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Message';

const Message = mongoose.model('Message');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listMessages() {
    return Message.find({});
}

export function listUsers() {
    // return Message.find({}).select({"from"});
}

export function createMessage(data) {
    const message = new Message({
        from  : data.from,
        to    : data.to,
        text  : data.text,
        color : data.color,
        time  : new Date()
    });

    return message.save();
}

export function deleteMessage(id) {
    return Message.findById(id).remove();
}

