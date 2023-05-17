export const ACCEPT_CONFIG = {
  image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
  video: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv', '.avi', '.mov', '.rm', '.3gp', '.mpg', '.dat', '.asf', '.flv', 'ogg', 'ogm', '.mpeg', '.ts'],
  document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
  getAll() {
    return [...this.video]
    // return [...this.video, ...this.image, ...this.document]
  },
};
