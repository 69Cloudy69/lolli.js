const path              = require('path');
const readdirp          = require('readdirp');
const Eris              = require('eris-additions')(require('eris'));
const Command           = require('../structures/LolliCommand');
const Event             = require('../structures/LolliEvent');
const Collection        = require('../helpers/Collection');
const Logger            = require('../helpers/Logger');
const MessageHandler    = require('../handlers/MessageHandler');
const Constants         = require('../constants/General');

/**
 * Main class extending the actual Eris library.
 * This class handles all the config loading, assures that all pre-conditions are met and 
 * finally registers all valid commands in the specified command directory.
 */
class LolliClient extends Eris.Client {
    constructor (lolliOptions) {
        if (!lolliOptions.token) {
            throw 'You must specify a valid Discord token!';
        }

        if (!lolliOptions.lolliConfig.prefix) {
            throw 'You must specify a valid prefix for your bot!';
        }

        if (!lolliOptions.lolliConfig.owner.length) {
            throw 'You must specify a valid Discord ID for your bot owner!';
        }

        super(lolliOptions.token, lolliOptions.erisConfig);

        this.lolliOptions = lolliOptions;
        this.prefix         = lolliOptions.lolliConfig.prefix;
        
        this.events         = new Set();
        this.commands       = new Collection();
        this.messageHandler = new MessageHandler(this);

        this.commandFiles   = [];
        this.eventFiles     = [];

        this._registerInternalCommands();
        this._registerLolliCommands();
        this._registerLolliEvents();
        this._addEventListeners();
        this.connect();
    }

    /**
     * Adds all event listeners. This can be overwritten in the main bot file which inherits this class
     */
    _addEventListeners() {
        this.on('ready', this._readyEmitter);
        this.on('messageCreate', this._runMessageOperators);
    }

    /**
     * Run all message operators needed off of a single event.
     * @param {object} message The message object emitted from the Discord API 
     */
    _runMessageOperators(message) {
        this._messageListener(message);
    }

    /**
     * Listen for messages, check if they might be valid commands and assign the due work to the MessageHandler
     * @param {object} message The message object emitted from the Discord API 
     */
    _messageListener(message) {
        try {
            if (message.author.bot) return;
            if (!message.content.startsWith(this.prefix)) return;
            if (message.content === this.prefix) return;

            this.messageHandler.handle(message, this.commands);
        } catch (lolliListenerError) {
            Logger.error('LOLLI ERROR', `Handling a message failed because of: ${lolliListenerError}`);
        }
    }

    /**
     * This method is called once the bot is "ready" which means that it's 
     * successfully logged in to Discord and is now ready to listen to events.
     */
    _readyEmitter() {
        Logger.success('LOLLI STARTUP', 'Successfully started and logged in!');
    }

    _registerInternalCommands() {
        if (this.lolliOptions.lolliConfig.defaultHelpCommand) {
            const defaultHelpCommand = require('../internal/commands/LolliHelp');

            if (this.commands.find(commandName => commandName.name === defaultHelpCommand.name)) {
                throw `Default help command couldn't be initialized because another command with the same name already exists!`;
            }

            this.commands.set(defaultHelpCommand.name, defaultHelpCommand);
        }
    }

     /**
     * Register all Lolli events extending the abstract Event class, no matter where events are saved without providing any path.
     * @async
     */
    async _registerLolliEvents() {
        const directory = path.dirname(require.main.filename);
        const readFiles = await readdirp.promise(directory, { fileFilter: '*.js', directoryFilter: ['!.git', '!*modules'] });

        this.eventFiles = readFiles.map(file => file.path);

        for (const lolliEventFile of this.eventFiles) {
            const lolliEvent = require(path.join(directory, lolliEventFile));

            lolliEvent.client = this;

            if (lolliEvent instanceof Event) {
                if (!Constants.EVENTS.EVENT_NAMES.includes(lolliEvent._eventName)) {
                    throw new Error(`Unknown event called "${lolliEvent._eventName}" in file "${lolliEventFile}". Event names are case sensitive! Check https://abal.moe/Eris/docs/Client for an event overview.`)
                }

                if (typeof lolliEvent.execute === 'undefined') {
                    throw new Error(`Couldn't find main executor "execute" in event file "${lolliEventFile}"!`);
                }

                this.events.add(lolliEvent);
            }
        }

        this.events.forEach((event) => {
            this.on(event._eventName, event.execute);
        });

        Logger.success('EVENTS', `Successfully loaded ${this.events.size} ${(this.events.size === 1) ? 'event' : 'events'}`);
    }

    /**
     * Register all Lolli commands extending the abstract Command class, no matter where commands are saved without providing any path.
     * @async
     */
    async _registerLolliCommands() {
        const directory = path.dirname(require.main.filename);
        const readFiles = await readdirp.promise(directory, { fileFilter: '*.js', directoryFilter: ['!.git', '!*modules'] });
        
        this.commandFiles = readFiles.map(file => file.path);

        for (const lolliCommandFile of this.commandFiles) {
            const lolliCommand = require(path.join(directory, lolliCommandFile));

            if (this.commands.has(lolliCommand.name) && (lolliCommand instanceof Command)) {
                throw new Error(`A command with the name of ${lolliCommand.name} has already been registered!`);
            }

            if (lolliCommand instanceof Command) {
                this.commands.set(lolliCommand.name, lolliCommand);
            }
        }

        Logger.success('COMMANDS', `Successfully loaded ${this.commands.size} ${(this.commands.size === 1) ? 'command' : 'commands'}`);
    }
}

module.exports = LolliClient;