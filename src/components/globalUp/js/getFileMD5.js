import SparkMD5 from 'spark-md5'
export function getFileMD5(oFile) {
  return new Promise((resolve, reject) => {
    var file = oFile;
    var tmp_md5;
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    var chunkSize = 10485760; // Read in chunks of 10MB
    // var chunks = Math.ceil(file.size / chunkSize);
    var currentChunk = 0;
    var spark = new SparkMD5.ArrayBuffer();
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      spark.append(e.target.result); // Append array buffer
      tmp_md5 = spark.end();
      resolve(tmp_md5)
      // currentChunk++;
      // if (currentChunk === 1 && file.size - chunkSize > 0) {
      //   fileReader.readAsArrayBuffer(blobSlice.call(file, (file.size - chunkSize), file.size));
      // } else {
      //   tmp_md5 = spark.end();
      //   resolve(tmp_md5)
      // }
    };

    fileReader.onerror = function () {
      reject('oops, something went wrong.')
      console.warn('oops, something went wrong.');
    };

    function loadNext() {
      var start = currentChunk * chunkSize;
      var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  })
}

export function uGetFileMd5(file, chunkSize) {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      spark.append(e.target.result);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        const md5 = spark.end();
        resolve(md5);
      }
    };

    fileReader.onerror = function (e) {
      reject(e);
    };

    function loadNext() {
      const start = currentChunk * chunkSize;
      let end = start + chunkSize;
      if (end > file.size) {
        end = file.size;
      }
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  });
}
