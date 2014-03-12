let {interfaces: Ci, utils: Cu} = Components;

Cu.import("resource:///modules/imXPCOMUtils.jsm");
Cu.import("resource:///modules/jsProtoHelper.jsm");
Cu.import("resource:///modules/xmpp.jsm");
Cu.import("resource:///modules/xmpp-session.jsm");

function JabbimAccount(aProtoInstance, aImAccount) {
  this._init(aProtoInstance, aImAccount);
}

JabbimAccount.prototype = {
  __proto__: XMPPAccountPrototype,
  get canJoinChat() false,
  connect: function() {
    this._jid = this._parseJID(this.name.replace("@","\\40") + "@jabbim.com/instantbird");
    this._connection = new XMPPSession("jabbim.com", 5222,
                                       "allow_unencrypted_plain_auth", this._jid,
                                       this.imAccount.password, this);
  }
};

//XMPPSession(aHost, aPort, aSecurity, aJID, aPassword, aAccount)

function JabbimProtocol() { }

JabbimProtocol.prototype = {
  __proto__: GenericProtocolPrototype,
  get normalizedName() "jabbim",
  get name() "Jabbim",
  get iconBaseURI() "chrome://prpl-jabbim/skin/",
  getAccount: function(aImAccount) new JabbimAccount(this, aImAccount),
  classID: Components.ID("{54cf64b0-8c5a-11e3-baa8-0800200c9a66}")
};

const NSGetFactory = XPCOMUtils.generateNSGetFactory([JabbimProtocol]);
