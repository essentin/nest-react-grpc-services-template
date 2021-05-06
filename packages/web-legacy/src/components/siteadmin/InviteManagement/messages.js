import { defineMessages } from 'react-intl';

const messages = defineMessages({
  delete: {
    id: 'adminInvites.delete',
    defaultMessage: 'Delete',
    description: 'Delete Button',
  },
  view: {
    id: 'adminInvites.view',
    defaultMessage: 'View',
    description: 'View Button',
  },
  emailInvalid: {
    id: 'ListSettingsForm.emailInvalid',
    defaultMessage: '*Invalid email address',
    description: 'email address error',
  },
  required: {
    id: 'ListSettingsForm.required',
    defaultMessage: '*Required',
    description: 'Required',
  },
  emailInvalid: {
    id: 'ListSettingsForm.emailInvalid',
    defaultMessage: '*Invalid email address',
    description: 'email address error',
  },
  exceedLimit: {
    id: 'exceedLimit',
    defaultMessage: 'Maximum allowed character is 255.',
    description: 'exceedLimit',
  },
  emailBlankSpace: {
    id: 'ListSettingsForm.emailBlankSpace',
    defaultMessage: 'Email should not be blank spaces',
    description: 'email address error',
  },

});

export default messages;
