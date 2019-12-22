/**
 * Really simple and pretty straight forward custom config holder
 */
class LolliConfig {
    constructor(token, lolliConfig, erisConfig) {      
        this.token = token;
        this.erisConfig = erisConfig;
        this.lolliConfig = lolliConfig;
    }
}

module.exports = LolliConfig;