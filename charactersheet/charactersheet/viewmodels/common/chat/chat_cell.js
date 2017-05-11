'use strict';

function ChatCellViewModel(chat) {
    var self = this;

    self.id = chat.chatId;
    self.characterId = chat.characterId;
    self._name = chat.name;
    self.badge = ko.observable();
    self.isGroupChat = chat.isGroupChat;
    self.isParty = chat.isParty;

    self.name = ko.pureComputed(function() {
        return self._name() + (self.isParty() ? 'party chat' : '');
    });

    self.shouldShowDelete = ko.pureComputed(function() {
        return !self.isParty();
    });

    /* View Model Methods */

    self.save = function() {
//         var chat = PersistenceService.findFirstBy(Chat, 'chatId', self.chatId());
//         chat.name(self.name());
//     };
//
//     self.delete = function() {
//         var chat = PersistenceService.findFirstBy(Chat, 'chatId', self.chatId());
//         chat.delete();
//         self.children().forEach(function(child, idx, _) {
//             child.delete();
//         });
//     };
//
//     /* Data Refresh Methods */
//
//     self.reloadData = function() {
//         var chat = PersistenceService.findFirstBy(Chat, 'chatId', self.chatId());
//         self.name(chat.name());
//         self.children().forEach(function(child, idx, _) {
//             child.reloadData();
//         });
    };
}
