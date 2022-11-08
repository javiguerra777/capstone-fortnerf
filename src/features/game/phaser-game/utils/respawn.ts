const randomRespawn = () => {
  const respawnOptions = [
    {
      x: 200,
      y: 200,
    },
    {
      x: 1500,
      y: 300,
    },
    {
      x: 200,
      y: 1500,
    },
    {
      x: 1500,
      y: 1500,
    },
  ];
  const index = Math.floor(Math.random() * 4);
  return respawnOptions[index];
};

export default randomRespawn;
