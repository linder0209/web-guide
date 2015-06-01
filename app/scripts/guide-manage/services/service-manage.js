'use strict';

angular.module('webGuideApp')
  .factory('webGuideManageService', ['guideHttpService', function (guideHttpService) {
    return {
      saveGuide: function (data, success) {
        guideHttpService.post('', data).then(success);
      },
      getGuide: function (type, success) {
        guideHttpService.get('manage/' + type).then(success);
      }
    };
  }]);
