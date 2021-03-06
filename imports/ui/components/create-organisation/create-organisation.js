import '../create-organisation/create-organisation.html';

import { Template } from 'meteor/templating';
import { loadFilePicker } from 'meteor/natestrauser:filepicker-plus';
import { ReactiveVar } from 'meteor/reactive-var';
import { handleMethodResult } from '/imports/modules/handle-method-result.js';
import { outputHandler } from '/imports/modules/output-handler.js';
import { noImage } from '/imports/modules/images.js';
import { changeIcon } from '/imports/modules/filepicker.js';


Template.createOrganisation.onCreated(function () {
  this.iconUrl = new ReactiveVar();
});

Template.createOrganisation.events({
  'submit form': function(event, template) {
    event.preventDefault();

    let name = event.target['organisation-name'].value.trim();
    let description = event.target['organisation-description'].value.trim();
    let companySite = event.target['company-site'].value.trim();
    let iconUrl = template.iconUrl.get() || noImage;

    if (!name || !description) {
      outputHandler('Name or description are empty');
      return;
    }

    let organisation = {
      name: name,
      description: description,
      profile: {
        iconUrl: iconUrl,
        companySite: companySite
      },
      members: [Meteor.userId()]
    };

    event.target.reset();
    template.iconUrl.set();
    
    Meteor.call('organisationInsert', organisation, handleMethodResult(()=>{
      Router.go('myorganisations');
    }));
  },

  'click #organisation-icon': function (event, tmpl) {
    changeIcon({
      onsuccess: (result) => tmpl.iconUrl.set(result),
      onerror: outputHandler
    });
  }
});

Template.createOrganisation.helpers({
  iconUrl: function () {
    let iconUrl = Template.instance().iconUrl.get();

    return iconUrl || noImage;
  }
});
