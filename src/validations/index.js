import * as Yup from 'yup';
import { USE_MOCK_API } from '../api/endpoints';

/**
 * Raw rules, always exported so the shapes are reviewable, and the gated
 * `*Schema` names the screens actually use. While the app runs on mock data
 * every schema resolves to `undefined`, so forms submit without being filled
 * in; flipping USE_MOCK_API re-arms all of them with no screen changes.
 */
const gate = schema => (USE_MOCK_API ? undefined : schema);

const email = Yup.string().trim().email('Enter a valid email').required('Email is required');
const password = Yup.string().min(6, 'At least 6 characters').required('Password is required');

export const loginRules = Yup.object({ email, password });

export const registerRules = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email,
  phone: Yup.string().trim().min(10, 'Enter a valid phone number').required('Phone is required'),
  password,
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm your password'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  zip: Yup.string().trim().min(5, 'Enter a valid ZIP').required('ZIP is required'),
  agreed: Yup.boolean().oneOf([true], 'Please accept the terms'),
});

export const resetRules = Yup.object({ email });

export const applyRules = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email,
  phone: Yup.string().trim().required('Phone is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  home: Yup.string().required('Tell us about your home'),
  why: Yup.string().trim().min(20, 'A sentence or two, please').required('This helps us match you'),
});

export const contactRules = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  email,
  message: Yup.string().trim().min(10, 'A sentence or two, please').required('Message is required'),
});

export const editProfileRules = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email,
  phone: Yup.string().trim().required('Phone is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  zip: Yup.string().trim().required('ZIP is required'),
});

export const passwordRules = Yup.object({
  current: Yup.string().required('Current password is required'),
  next: password,
  confirm: Yup.string()
    .oneOf([Yup.ref('next')], 'Passwords do not match')
    .required('Confirm your new password'),
});

export const checkoutRules = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  address: Yup.string().trim().required('Address is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  zip: Yup.string().trim().required('ZIP is required'),
});

export const reviewRules = Yup.object({
  rating: Yup.number().min(1, 'Pick a rating').required('Pick a rating'),
  text: Yup.string().trim().min(10, 'A sentence or two, please').required('Please write a little'),
});

export const loginSchema = gate(loginRules);
export const registerSchema = gate(registerRules);
export const resetSchema = gate(resetRules);
export const applySchema = gate(applyRules);
export const contactSchema = gate(contactRules);
export const editProfileSchema = gate(editProfileRules);
export const passwordSchema = gate(passwordRules);
export const checkoutSchema = gate(checkoutRules);
export const reviewSchema = gate(reviewRules);
