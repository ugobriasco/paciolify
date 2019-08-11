const mapBankAccount = props => {
  const updatedAt = new Date();

  // in case of an invalid mapping, better to reset the related credentials as security measure
  if (!props) {
    return {
      persistToken: null,
      access_token: null,
      refresh_token: null,
      expires_in: null,
      updatedAt
    };
  } else {
    const { access_token, refresh_token, expires_in, persistToken } = props;
    return {
      persistToken,
      access_token,
      refresh_token,
      expires_in,
      updatedAt
    };
  }
};

module.exports = mapBankAccount;
