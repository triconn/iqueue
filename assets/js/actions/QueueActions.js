var GuestAPI = require('../utils/GuestAPI.js');
var Dispatcher = require('../dispatcher/AppDispatcher.js');
var QueueConstants = require('../constants/QueueConstants.js');

module.exports = {

  addGuest: function(guest) {
    Dispatcher.handleViewAction({
      type: QueueConstants.ADD_GUEST,
      guest: guest
    });

    GuestAPI.add(guest);
  },

  getGuests: function() {
    Dispatcher.handleViewAction({
      type: QueueConstants.GET_GUESTS
    });

    GuestAPI.get();
  }
};

