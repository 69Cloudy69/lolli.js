/**
 * Basic abstract Command class for command identification
 */
class LolliEvent {
    /**
     * Instantiate a new Lolli.js Event 
     * @param {string} event A valid Eris event name! E.g. messageCreate, guildMemberAdd, etc.
     */
    constructor(event) {
        this._eventName = event;
    }
}

module.exports = LolliEvent;