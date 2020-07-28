import Box from '3box';
import { Request, Response } from 'express';

import { CONFIG } from '../../../config';

export const getBoxProfile = async (req: Request, res: Response) => {
  const { address } = req.body.input;
  const boxProfile = await Box.getProfile(address);

  if (Object.keys(boxProfile).length === 0) {
    return res.json({});
  }

  const parsedProfile: BoxProfile = {
    name: boxProfile.name,
    description: boxProfile.description,
    location: boxProfile.location,
    job: boxProfile.job,
    emoji: boxProfile.emoji,
    imageUrl: getProfilePicture(boxProfile),
  };

  return res.json(parsedProfile);
};

function getProfilePicture(boxProfile: any) {
  const imageHash =
    boxProfile &&
    boxProfile.image &&
    boxProfile.image[0] &&
    boxProfile.image[0].contentUrl &&
    boxProfile.image[0].contentUrl['/'];
  if (imageHash) {
    return `${CONFIG.ipfsEndpoint}/ipfs/${imageHash}`;
  }
  return 'https://i.imgur.com/RXJO8FD.png';
}
