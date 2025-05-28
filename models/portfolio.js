let portfolios = [];
let idCounter = 1;

function getAll() {
  return portfolios;
}

function getById(id) {
  return portfolios.find(p => p.id === parseInt(id));
}

function create({ name, role, photo }) {
  const newPortfolio = { id: idCounter++, name, role, photo };
  portfolios.push(newPortfolio);
  return newPortfolio;
}

function update(id, data) {
  const index = portfolios.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    portfolios[index] = { ...portfolios[index], ...data };
  }
  return portfolios[index];
}

function remove(id) {
  portfolios = portfolios.filter(p => p.id !== parseInt(id));
}

module.exports = { getAll, getById, create, update, remove };

