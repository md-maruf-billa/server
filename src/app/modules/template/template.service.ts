import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";
import { TemplateModel } from "./template.schema";

const create_new_template_into_db = async (req: Request) => {
    const payload = req?.body;
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file)
        if (uploadedFile?.secure_url) {
            payload.templateImage = uploadedFile?.secure_url
        }
    }
    // find template id
    const templates = await TemplateModel.find().lean();
    payload.templateId = Number(templates?.length + 1)

    const result = await TemplateModel.create(payload);
    return result;
}

const update_template_into_db = async (req: Request) => {
    const id = req?.params?.id;
    const payload = req?.body;
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file)
        if (uploadedFile?.secure_url) {
            payload.templateImage = uploadedFile?.secure_url
        }
    }
    const result = await TemplateModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const get_all_template_from_db = async () => {
    const result = await TemplateModel.find().lean();
    return result;
}



export const template_services = {
    create_new_template_into_db,
    update_template_into_db,
    get_all_template_from_db
}