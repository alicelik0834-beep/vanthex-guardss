// Basit yetki depolaması (disk tabanlı değil), bot yeniden başlatıldığında sıfırlanır.
const authorizedUsers = new Set();

module.exports = {
  isAuthorized(userId) {
    return authorizedUsers.has(userId);
  },

  addAuthorizedUser(userId) {
    if (authorizedUsers.has(userId)) return false;
    authorizedUsers.add(userId);
    return true;
  },

  removeAuthorizedUser(userId) {
    return authorizedUsers.delete(userId);
  },

  listAuthorizedUsers() {
    return Array.from(authorizedUsers);
  }
};