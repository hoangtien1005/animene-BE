const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class UserModel {
  table = new pgp.helpers.TableName({ table: "User" })

  async get(page = 1, perPage = 50) {
    const queryString = `
      select * from $(table) where state = $(_public) or state = $(_private)
      order by user_id limit $(perPage) offset $(offset)
    `
    const args = {
      table: this.table,
      _public: STATE.PUBLIC,
      _private: STATE.PRIVATE,
      perPage: perPage,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async getById(id) {
    const queryString = `select * from $(table) where user_id = $(id) and state = $(_public) or state = $(_private)`
    const args = {
      table: this.table,
      id: id,
      _public: STATE.PUBLIC,
      _private: STATE.PRIVATE
    }
    return await queryDB("one", queryString, args)
  }

  async getByEmail(email) {
    const queryString = `select * from $(table) where email = $(email) and state = $(_public) or state = $(_private)`
    const args = {
      table: this.table,
      email: email,
      _public: STATE.PUBLIC,
      _private: STATE.PRIVATE
    }
    return await queryDB("one", queryString, args)
  }

  async create({ email, password }) {
    const queryString = `insert into $(table)(email, password) values($(email), $(password)) returning *`
    const args = {
      table: this.table,
      email,
      password
    }
    return await queryDB("one", queryString, args)
  }

  async deleteById(id) {
    const queryString = `update $(table) set state = $(_deleted) where user_id=$(id)`
    const args = {
      table: this.table,
      id,
      _deleted: STATE.DELETED
    }
    return await queryDB("none", queryString, args)
  }

  async update(user) {
    const queryString = `
         update $(table) set email = $(email), password = $(password),
         fullname = $(fullname), avatar = $(avatar), date_of_birth = $(date_of_birth),
         role = $(role), state = $(state) where user_id = $(user_id)
         returning *
      `

    const args = {
      table: this.table,
      ...user
    }
    return await queryDB("one", queryString, args)
  }
}

module.exports = new UserModel()
