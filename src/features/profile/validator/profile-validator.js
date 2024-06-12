import Joi from "joi";

const editProfileSchema = Joi.object(
    {
        userName: Joi.string().required().trim().messages({ 'string.empty': 'user name is required.' }),
        firstName: Joi.string().required().trim().messages({ 'string.empty': 'first name is required.' }),
        lastName: Joi.string().required().trim().messages({ 'string.empty': 'last name is required.' }),
        email: Joi.string().required().email({ tlds: false }).messages({ 'string.empty': 'last name is required.' }),
        mobile: Joi.string().required().pattern(/^[0-9]{10}$/).messages({ 'string.empty': 'last name is required.' }),
    }
)

const validateProfile = (input) => {
    const { error } = editProfileSchema.validate(
        input,
        { abortEarly: false, allowUnknown: true }
    )
    if (error) {
        const result = error.details.reduce((acc, c) => {
            acc[c.path[0]] = c.message
            return acc
        }, {})
        console.dir(error);
        return result
    }
}


export default validateProfile;