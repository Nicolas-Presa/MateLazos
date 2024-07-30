import mongoose from "mongoose";

mongoose.pluralize(null);
const collection = 'users';

const schema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, index: true},
    password: {type: String, required: true},
    role: {type: String, default: 'admin'},
    last_connection: {type: Boolean, default: false},
    last_connection_date: {type: Date, required: false}
});


export default mongoose.model(collection, schema)

