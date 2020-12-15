'use strict'

const isDate = (dateStr) => !isNaN(new Date(dateStr).getDate());

module.exports = {
  isDate
};
