import { COUNTRY } from '../types/customers/customer.types';
import { baseSchemaPart } from './base.schema';

export const customerSchema = {
  'type': 'object',
  'properties': {
    Customer: {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string',
          'description': 'First name of the customer.'
        },
        'flat': {
          'type': 'integer',
          'minimum': 1,
          'maximum': 99,
          'description': 'Flat number.'
        },
        'house': {
          'type': 'integer',
          'minimum': 0,
          'maximum': 99,
          'description': 'House number.'
        },
        'city': {
          'type': 'string',
          'description': 'City where the customer resides.'
        },
        'notes': {
          'type': 'string',
          'description': 'Notes related to the customer.'
        },
        'street': {
          'type': 'string',
          'description': 'Street where the customer resides.'
        },
        'phone': {
          'type': 'string',
          'description': "Phone number with a '+' prefix and 12 numeric characters."
        },
        'email': {
          'type': 'string',
          'format': 'email',
          'description': "Customer's email address without special characters."
        },
        'country': {
          'type': 'string',
          enum: Object.values(COUNTRY),
          'description': 'Country of the customer.'
        }
      },
      'required': [
        'name',
        'flat',
        'house',
        'city',
        'notes',
        'street',
        'phone',
        'email',
        'country'
      ],
      'additionalProperties': false,
    },
  },
  ...baseSchemaPart
};