import 'meteor/jesperwe:bootstrap-select';
import 'meteor/trsdln:modals';
import './project-create.html';
import '../../components/select-dropdown/select-dropdown.js';

import {  handleMethodResult } from '../../../modules/handle-method-result';


Template.Project_create.events({
  'click .client-add': function(event, tmpl){
    event.preventDefault();

    let clientName = tmpl.$('.client-name');

    Meteor.call('clientCreate', clientName.val(), handleMethodResult((res) =>{
      clientName.val("");
      tmpl.$('.select-client')
        .selectpicker('refresh')
        .selectpicker('val', res);
      })
    );
  },
  'submit .project-create-form': function(event, tmpl){
    event.preventDefault();
    let target = event.target;

    let projectAttributes = {
      name: target.name.value,
      clientId: target.clients.value,
      public: target.public.checked,
      color: ''
    }

    target.reset();
    
    Meteor.call('projectCreate', projectAttributes, handleMethodResult(()=>{
      ModalManager.getInstanceByElement(event.target).close();
    }));
  }
});

Template.Project_create.helpers({
  clients: function(){
  	return Clients.find();
  }
});