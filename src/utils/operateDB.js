import editorDB from './editorDB'
export default class operateDB {
  constructor() {
    this.db = editorDB && editorDB.files
  }

  // 添加一条消息记录
  async add(msg) {
    const time = new Date().getTime()
    try {
      await this.db.add({
        ...msg,
        // status: 0,
        createTime: time,
        // updateTime: time
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 删除单条消息记录
  async delete(filename) {
    try {
      await this.db.where('filename').equals(filename).delete()
    } catch (err) {
      console.error(err)
    }
  }
  //删除全部
  async deleteAll() {
    try {
      await this.db.where('id').above(0).delete()
    } catch (err) {
      console.error(err)
    }
  }

  // 删除多条消息记录
  async deleteMessagesByMsgIds(msgIds) {
    try {
      await this.db
        .where('msgId')
        .anyOf(msgIds)
        .delete()
    } catch (err) {
      console.error(err)
    }
  }

  // 更新一条消息的状态
  async update(filename, status) {
    try {
      await this.db
        .where('filename')
        .equals(filename)
        .modify({
          status
        })
    } catch (err) {
      console.error(err)
    }
  }

  // 更新多条消息的状态
  async updateMessagesStatus(msgIds, status) {
    const time = new Date().getTime()
    try {
      await this.db
        .where('msgId')
        .anyOf(msgIds)
        .modify({
          status,
          updateTime: time
        })
    } catch (err) {
      console.error(err)
    }
  }

  // 查询某时间段内某文档的所有消息
  async filterMessagesByDocId(docId, startTime, endTime) {
    let messages = []
    try {
      messages = await this.db
        .where({ docId })
        .and((item) => item.createTime < endTime && item.createTime > startTime) // 也可以使用 above 和 below
        .toArray()
    } catch (err) {
      console.error(err)
    }
    return messages
  }

  // 查询某文档的所有消息
  async getAllMessagesByDocId(docId) {
    let messages = []
    try {
      messages = this.db.where({ docId }).sortBy('createTime')
    } catch (err) {
      console.error(err)
    }
    return messages
  }
  //获取单条
  async get(filename) {
    return new Promise((resolve, reject) => {
      try {
        (async () => {
          const res = await this.db.get({ filename })
          resolve(res)
        })()
      } catch (err) {
        reject(err)
      }
    })
  }
  async get_completed(status) {
    return new Promise((resolve, reject) => {
      try {
        (async () => {
          const res = await this.db.where('status').equals(status).toArray()
          resolve(res)
        })()
      } catch (err) {
        reject(err)
      }
    })
  }
  //获取所有
  getAll() {
    return new Promise((resolve, reject) => {
      try {
        (async () => {
          const res = await this.db.where('id').above(0).toArray()
          resolve(res)
        })()
      } catch (err) {
        reject(err)
      }
    })
  }
}