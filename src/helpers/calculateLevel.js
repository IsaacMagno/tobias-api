const calculateLevel = (xp, limiar) => {
  return Math.floor(Math.sqrt(xp / limiar));
};

const calculateXP = (nivel, limiar) => {
  return Math.pow(nivel, 2) * limiar;
};

const showExpRequired = (nivelMax) => {
  for (let nivel = 1; nivel <= nivelMax; nivel++) {
    if (nivel <= 10 || nivel >= nivelMax - 4) {
      console.log(`Nível ${nivel}: ${calculateXP(nivel, 35)} XP`);
    }
  }
};

module.exports = {
  calculateLevel,
  calculateXP,
  showExpRequired,
};
