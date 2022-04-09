const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class PostModel {
  table = new pgp.helpers.TableName({ table: "Post" })

  async get(page = 1, perPage = 50) {
    const queryString = `
      select *, count(*) over() as full_count
      from $(table) where state = $(_public)
      order by post_id limit $(perPage) offset $(offset)
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

  // TODO: get all the comments, tags and likes in this posts
  async getById(id) {
    const queryString = `select * from $(table) where post_id = $(id) and state = $(_public)`
    const args = {
      table: this.table,
      id: id,
      _public: STATE.PUBLIC,
      _private: STATE.PRIVATE
    }
    return await queryDB("one", queryString, args)
  }

  async getPostByUserId(id, page = 1, perPage = 50) {
    const queryString = `
    select * from $(table), count(*) over() as full_count
    where author_id = $(id)
    limit $(perPage) offset $(offset)`
    const args = {
      table: this.table,
      id: id,
      perPage: perPage,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async create(post) {
    const queryString = `
      insert into $(table)(author_id, author_avatar, title, content)
      values($(author_id), $(author_avatar), $(title), $(content))
      returning *`
    const args = {
      table: this.table,
      ...post
    }
    return await queryDB("one", queryString, args)
  }

  async deleteById(id) {
    const queryString = `update $(table) set state = $(_deleted) where post_id=$(id)`
    const args = {
      table: this.table,
      id,
      _deleted: STATE.DELETED
    }
    return await queryDB("none", queryString, args)
  }

  async update(post) {
    const queryString = `
        update $(table) set title = $(title), content = $(content)
        where post_id = $(post_id)
        returning *
      `

    const args = {
      table: this.table,
      ...post
    }
    return await queryDB("one", queryString, args)
  }
}

module.exports = new PostModel()
