// validationSchemas.js

const { z } = require('zod');

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  country: z.string().optional()
});

const agencySchema = z.object({
  name: z.string().min(1, { message: "Agency name is required" }),
  address: addressSchema,
  contact_number: z.string().min(1, { message: "Contact number is required" })
});

const socialMediaSchema = z.object({
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional()
});

const agentSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: addressSchema,
  license_number: z.string().min(1, { message: "License number is required" }),
  license_expiration_date: z.string().refine(
    (date) => !isNaN(Date.parse(date)), 
    { message: "Invalid date" }
  ),
  agency: agencySchema,
  years_of_experience: z.number().nonnegative({ message: "Years of experience must be a positive number" }),
  specializations: z.array(z.string()).min(1, { message: "At least one specialization is required" }),
  profile_picture_url: z.string().optional(),
  social_media: socialMediaSchema.optional(),
});

module.exports = {
  agentSchema
};