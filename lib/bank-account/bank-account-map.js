const mapBankAccount = props => {
  const updatedAt = new Date();
  const { access_token, refresh_token, expires_in } = props;
  return {
    access_token,
    refresh_token,
    expires_in,
    updatedAt
  };
};

module.exports = mapBankAccount;
