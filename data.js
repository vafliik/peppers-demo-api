const users = [
  {
    _id: 1587912698986,
    email: 'default@user.org',
    password: '$2b$13$CW3SP.VCKI0NQFgu9plKQeXc3KugDB9hD/EB.nDgS79FQyxzBSDBW'
  },
  {
    _id: 1598362276594,
    email: 'pavelp@salsitasoft.com',
    password: '$2b$13$6sDB9FmyC9j06V449iTDHexmUAbq3dFAVIg7YlGBgr5n2w5RVM1Ie'
  }
];

const peppers = [
  {
    _id: 1,
    name: 'Jolokia',
    strength: 2,
    owner: 1587912698986,
  },
  {
    _id: 2,
    name: 'Habanero',
    strength: 3,
    owner: 1587912698986,
  },
  {
    _id: 3,
    name: 'Shishito',
    strength: 1,
    owner: 1598362276594,
  }
  
];

const last_pepper_id = 3;

module.exports = { users, peppers };
