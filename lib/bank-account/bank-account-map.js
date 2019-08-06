const mapBankAccount = props => {
  const updatedAt = new Date();
  const { access_token, refresh_token, expires_in, persistToken } = props;
  return {
    persistToken,
    access_token,
    refresh_token,
    expires_in,
    updatedAt
  };
};

module.exports = mapBankAccount;
