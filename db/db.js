import sqlite3 from 'sqlite3';

// './db/data.db'
export default function openDB(dbFile) {
  // eslint-disable-next-line no-bitwise
  const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX);
  const wrapper = {
    db,
  };
  const debug = true;
  // 执行update:
  wrapper.update = async function update(strs, ...params) {
    return new Promise((resolve, reject) => {
      const sql = strs.join('?');
      db.run(sql, ...params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  };
  // 执行insert并返回lastID:
  wrapper.insert = async function insert(strs, ...params) {
    return new Promise((resolve, reject) => {
      const sql = strs.join('?');
      db.run(sql, ...params, function callback(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };
  // 查询数据,返回array:
  wrapper.select = async function select(strs, ...params) {
    return new Promise((resolve, reject) => {
      const sql = strs.join('?');
      if (debug) {
        console.log(`sql = ${sql}, params = [${params.join(', ')}]`);
      }
      db.all(sql, ...params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  // 查询一行数据,不存在返回null:
  wrapper.fetch = async function fetch(strs, ...params) {
    return new Promise((resolve, reject) => {
      const sql = strs.join('?');
      if (debug) {
        console.log(`sql = ${sql}, params = [${params.join(', ')}]`);
      }
      // sql = 'SELECT * FROM users WHERE name = "Bob"'
      db.get(sql, ...params, (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve(null);
        } else {
          console.log('查询结果:', row);
          resolve(row);
        }
      });
    });
  };
  return wrapper;
}
