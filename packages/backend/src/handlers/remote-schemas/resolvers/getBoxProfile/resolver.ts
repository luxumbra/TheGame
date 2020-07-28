import Box from '3box';

import { CONFIG } from '../../../../config';

interface BoxProfileRequest {
  address: string;
}
interface BoxProfileResponse {
  ethereumAddress: string | null;
  name: string | null;
  description: string | null;
  location: string | null;
  job: string | null;
  emoji: string | null;
  imageUrl: string | null;
}

export const getBoxProfile = async (_: any, { address }: BoxProfileRequest) => {
  const boxProfile = await Box.getProfile(address);

  if (Object.keys(boxProfile).length === 0) {
    return {};
  }

  const parsedProfile: BoxProfileResponse = {
    ethereumAddress: address,
    name: boxProfile.name,
    description: boxProfile.description,
    location: boxProfile.location,
    job: boxProfile.job,
    emoji: boxProfile.emoji,
    imageUrl: getProfilePicture(boxProfile),
  };

  return parsedProfile;
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
