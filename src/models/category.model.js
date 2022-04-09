const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class CategoryModel {
  table = new pgp.helpers.TableName({ table: "Category" })

  async get(page = 1, perPage = 50) {
    const queryString = `
      select *, count(*) over() as full_count
      from $(table) where state = $(_public)
      order by category_id limit $(perPage) offset $(offset)
    `
    const args = {
      table: this.table,
      _public: STATE.PUBLIC,
      _private: STATE.PRIVATE,
      perPage: Math.max(perPage, 50),
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async getById(id) {
    const queryString = `select * from $(table) where category_id = $(id) and state = $(_public)`
    const args = {
      table: this.table,
      id: id,
      _public: STATE.PUBLIC,
      _private: STATE.PRIVATE
    }
    return await queryDB("one", queryString, args)
  }

  async create({ name, color = "#18c1f0" }) {
    const queryString = `insert into $(table)(name, color) values($(name), $(color)) returning *`
    const args = {
      table: this.table,
      name,
      color
    }
    return await queryDB("one", queryString, args)
  }

  async deleteById(id) {
    const queryString = `update $(table) set state = $(_deleted) where category_id=$(id)`
    const args = {
      table: this.table,
      id,
      _deleted: STATE.DELETED
    }
    return await queryDB("none", queryString, args)
  }

  async update(category) {
    const queryString = `
         update $(table) set name = $(name), color = $(color)
         where category_id = $(category_id)
         returning *
      `

    const args = {
      table: this.table,
      ...category
    }
    return await queryDB("one", queryString, args)
  }
}

module.exports = new CategoryModel()
