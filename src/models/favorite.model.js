const { pgp } = require("../config/db.config")
const { STATE } = require("../constants")
const { queryDB } = require("../services/database.service")

class FavoriteModel {
  table = new pgp.helpers.TableName({ table: "Favorite" })

  async get(page = 1, perPage = 50) {
    const queryString = `
      select media_id, type, image, count(*) as favorite_count
      from $(table)
      group by media_id, type, image
      order by favorite_count desc
      limit $(perPage) offset $(offset)
    `
    const args = {
      table: this.table,
      perPage: perPage,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async getFavoriteByUserId(id, page = 1, perPage = 50) {
    const queryString = `
    select * from $(table), count(*) over() as full_count
    where user_id = $(id)
    limit $(perPage) offset $(offset)`
    const args = {
      table: this.table,
      id: id,
      perPage: perPage,
      offset: (page - 1) * perPage
    }
    return await queryDB("any", queryString, args)
  }

  async create(favorite) {
    const queryString = `
      insert into $(table)(user_id, media_id, type, image)
      values($(user_id), $(media_id), $(type), $(image))
      returning *`
    const args = {
      table: this.table,
      ...favorite
    }
    return await queryDB("one", queryString, args)
  }

  async deleteById(user_id, media_id) {
    const queryString = `
      delete from $(table)
      where media_id=$(media_id) and user_id = $(user_id)`
    const args = {
      table: this.table,
      user_id,
      media_id
    }
    return await queryDB("none", queryString, args)
  }
}

module.exports = new FavoriteModel()
