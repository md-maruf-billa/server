import { model, Schema } from "mongoose";
import { TTemplate } from "./template.interface";

const templateSchema = new Schema<TTemplate>({
    templateName: { type: String, required: true },
    templateId: { type: Number, required: true },
    templateImage: { type: String, required: false },
}, {
    versionKey: false,
    timestamps: true
}
)

export const TemplateModel = model<TTemplate>("template", templateSchema)