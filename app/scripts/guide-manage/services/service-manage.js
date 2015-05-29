'use strict';

angular.module('webGuideManageApp')
  .factory('webGuideManageService', ['guideHttpService', function (guideHttpService) {
    return {
      saveGuide: function (data, success) {
        guideHttpService.post('', data).then(success);
      },
      getGuide: function (type, success) {
        guideHttpService.get('' + type).then(success);
      }
    };
  }]);
