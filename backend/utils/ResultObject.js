class ResultObject {
  constructor(successStatus, message, data) {
    this.successStatus = successStatus;
    this.message = message;
    this.data = data;
  }
}

module.exports = ResultObject;
