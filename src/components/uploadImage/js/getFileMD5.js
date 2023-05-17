import SparkMD5 from 'spark-md5'
export function getFileMD5(oFile) {
  return new Promise((resolve, reject) => {
    var file = oFile;
    var tmp_md5;
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    var chunkSize = 8097152; // Read in chunks of 2MB
    var currentChunk = 0;
    var spark = new SparkMD5.ArrayBuffer();
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      spark.append(e.target.result); // Append array buffer
      currentChunk++;
      if (currentChunk === 1 && file.size - chunkSize > 0) {
        fileReader.readAsArrayBuffer(blobSlice.call(file, (file.size - chunkSize), file.size));
      } else {
        tmp_md5 = spark.end();
        resolve(tmp_md5)
      }
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