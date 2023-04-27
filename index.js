const config = require('./Event/utils/config');
const app = require('./app');

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
