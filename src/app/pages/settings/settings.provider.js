(function () {
  'use strict';

  angular.module('tf2stadium')
    .config(SettingsPageConfig)
    .provider('SettingsPage', SettingsPage);

  /** @ngInject */
  function SettingsPageConfig($stateProvider, SettingsPageProvider) {
    /*
     Makes children states for each section of the settings.
     */
    SettingsPageProvider.sections = [
      'theme',
      'chat',
      'filters',
      'sound',
      'servers',
      'account'
    ];

    for (var settingSectionKey in SettingsPageProvider.sections) {
      var settingSection = SettingsPageProvider.sections[settingSectionKey];
      $stateProvider.state(settingSection, {
        url: '/' + settingSection,
        parent: 'settings',
        views: {
          'setting-section': {
            templateUrl: 'app/pages/settings/section-' + settingSection + '.html'
          }
        }
      });
    }
  }

  /** @ngInject */
  function SettingsPage() {

    var settingsPageProvider = {};

    settingsPageProvider.sections = {};

    /** @ngInject */
    var settingsPageService = function (Settings) {
      settingsPageProvider.sections = {
        theme: {
          theme: Settings.getConstants('themesList'),
          animationOptions: Settings.getConstants('animationOptions')
        },
        chat: {
          emotes: Settings.getConstants('emoteStyle'),
          timestamps: Settings.getConstants('timestampOptions')
        },
        filters: Settings.getConstants('filters'),
        sound: Settings.getConstants('sound'),
        servers: null,
        account: null
      };

      settingsPageService.getSections = function () {
        return settingsPageProvider.sections;
      };

      return settingsPageService;
    };

    settingsPageProvider.$get = settingsPageService;

    return settingsPageProvider;
  }

})();
