import { Schema, model } from "mongoose";

const additionalUserDataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    governmentId: {
        type: String,
        required: false
    },
    fileUpload: {
        type: String, 
        required: false
    },
    hobbies: {
        type: [String],
        required: false
    },
    shortBio: {
        type: String,
        required: false
    }
});

const AdditionalUserData = model("AdditionalUserData", additionalUserDataSchema);

export { AdditionalUserData };
