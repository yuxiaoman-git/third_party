import Dexie from 'dexie'
// 创建名为 editor_database 的数据库
const db = new Dexie('editor_database')
// 这里可以定义版本号，后续修改表字段时可以增加版本号
db.version(1).stores({
  // 创建 docUpdate 表，&表示 primaryKey（++表示自增字段）
  files: `++id,filename,files,status`,
})

export default db