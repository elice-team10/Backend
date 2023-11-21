import { nanoid } from 'nanoid'

export const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  required: true,
};
