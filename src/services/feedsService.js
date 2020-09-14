import _ from 'lodash';

export default class FeedsService {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.feeds.host}/v1`;
    this._request = request;
    this._sdk = sdk;
  }

  /**
   * Returns ALL pages of realtime data from the realtime API
   */
  getPaginatedBatchDataForTimeframe(
    fields = [],
    timeStart,
    timeEnd,
    timeWindow = 3600
  ) {
    return new Promise((resolve, reject) => {
      if (fields.length < 1) {
        return Promise.resolve({});
      }

      if (_.isNil(timeStart)) {
        return Promise.reject(
          new Error('A timeStart is required for getting batch data')
        );
      }

      if (_.isNil(timeEnd)) {
        return Promise.reject(
          new Error('A timeEnd is required for getting batch data')
        );
      }

      const output = {};
      let requestBody = fields.reduce((acc, field) => {
        const output_id = field.output_id || field.outputId;
        const field_human_name = field.field_human_name || field.fieldHumanName;
        const url = `${this._baseUrl}/outputs/${output_id}/fields/${field_human_name}/data?timeStart=${timeStart}&timeEnd=${timeEnd}&window=${timeWindow}`;
        acc[field.id] = { strictSSL: false, url };
        return acc;
      }, {});

      const url = `${this._baseUrl}/batch`;

      while (!_.isEmpty(requestBody)) {
        const response = this._request.post(url, requestBody).then((data) => {
          requestBody = {};

          Object.keys(response).forEach((field_id) => {
            const { statusCode, body } = response[field_id];
            if (statusCode === 200) {
              output[field_id] = (output[field_id] || []).concat(body.records);

              if (body.meta && body.meta.next_page_url) {
                requestBody[field_id] = {
                  strictSSL: false,
                  url: body.meta.next_page_url
                };
              }
            }
          });
        });
      }

      return output;
    });
  }
}
