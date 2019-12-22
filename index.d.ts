declare module "structures/LolliCommand" {
    export = LolliCommand;
    /**
     * Basic abstract Command class for command identification
     */
    class LolliCommand {
        execute(): void;
        /**
         * Simple argument handler for getting tailed arguments with custom length and delimeters
         * @param {string} string A string to be used
         * @param {string} delimeter A delimeter to split a text by
         * @param {number} count How often a string should be split by the delimeter before merging the contents
         * @returns {string[]} An array of all collected arguments
         */
        tailedArguments(string: string, delimeter: string, count: number): string[];
    }
}
declare module "structures/LolliEvent" {
    export = LolliEvent;
    /**
     * Basic abstract Command class for command identification
     */
    class LolliEvent {
        /**
         * Instantiate a new Lolli.js Event
         * @param {string} event A valid Eris event name! E.g. messageCreate, guildMemberAdd, etc.
         */
        constructor(event: string);
        _eventName: string;
    }
}
declare module "helpers/Collection" {
    export = Collection;
    const Collection_base: typeof import("eris").Collection;
    /**
     * Extremely simple customization of Eris' Collections giving the possibility to add more
     * Collection methods down the road if ever needed.
     */
    class Collection extends Collection_base<any> {
        constructor(baseObject: any, limit: any);
    }
}
declare module "helpers/Logger" {
    export = Logger;
    /**
     * Colorful logger class for the Lolli.js Client framework featuring various log levels. This logger class is used primarily internally
     */
    class Logger {
        /**
         * Pads a single number for unified looks in the console
         * @param {number} number The number that should be force-padded
         * @returns {number} The padded number
         */
        static _forcePadding(number: number): number;
        /**
         * Gets the full current system time and date for logging purposes
         * @returns {string} The formatted current time
         */
        static _getCurrentTime(): string;
        /**
         * Log something related to being successful
         * @param {string} title The title of the log enty
         * @param {string} body The body of the log entry
         * @returns {void}
         */
        static success(title: string, body: string): void;
        /**
         * Log something related to a warning
         * @param {string} title The title of the log enty
         * @param {string} body The body of the log entry
         * @returns {void}
         */
        static warning(title: string, body: string): void;
        /**
         * Log something related to an error
         * @param {string} title The title of the log enty
         * @param {string} body The body of the log entry
         * @returns {void}
         */
        static error(title: string, body: string): void;
        /**
         * Log something related to debugging
         * @param {string} title The title of the log enty
         * @param {string} body The body of the log entry
         * @returns {void}
         */
        static debug(title: string, body: string): void;
        /**
         * Log something related to an event
         * @param {string} body The body of the log entry
         * @returns {void}
         */
        static event(body: string): void;
        /**
         * Log something related to command usage
         * @param {string} body The body of the log entry
         * @returns {void}
         */
        static command(body: string): void;
    }
}
declare module "helpers/Util" {
    export {};
}
declare module "structures/LolliColors" {
    export const DEFAULT: number;
    export const WHITE: number;
    export const AQUA: number;
    export const GREEN: number;
    export const BLUE: number;
    export const PURPLE: number;
    export const LUMINOUS_VIVID_PINK: number;
    export const GOLD: number;
    export const ORANGE: number;
    export const RED: number;
    export const GREY: number;
    export const NAVY: number;
    export const DARK_AQUA: number;
    export const DARK_GREEN: number;
    export const DARK_BLUE: number;
    export const DARK_PURPLE: number;
    export const DARK_VIVID_PINK: number;
    export const DARK_GOLD: number;
    export const DARK_ORANGE: number;
    export const DARK_RED: number;
    export const DARK_GREY: number;
    export const DARKER_GREY: number;
    export const LIGHT_GREY: number;
    export const DARK_NAVY: number;
    export const BLURPLE: number;
    export const GREYPLE: number;
    export const DARK_BUT_NOT_BLACK: number;
    export const NOT_QUITE_BLACK: number;
}
declare module "structures/LolliEmbed" {
    export = LolliEmbed;
    /**
     * Custom Discord Embed builder with color resolving
     */
    class LolliEmbed {
        constructor(data?: {});
        fields: any[];
        /**
         * Set the author of this Embed
         * @param {string} name Name of the Author
         * @param {string} icon URL of the icon that should be used
         * @param {string} url URL of the author if clicked
         */
        setAuthor(name: string, icon: string, url: string): LolliEmbed;
        author: {
            name: string;
            icon_url: string;
            url: string;
        } | undefined;
        /**
         * Resolves a color to a usable "Discord readable" color
         * @private
         * @param {*} color Any color which can be resolved
         */
        _resolveColor(color: any): any;
        /**
         * Set the color of this Embed
         * @param {*} color Any color resolvable by this._resolveColor
         */
        setColor(color: any): LolliEmbed;
        color: any;
        /**
         * Set the description of this Embed
         * @param {string} desc A description
         */
        setDescription(desc: string): LolliEmbed;
        description: string | undefined;
        /**
         * Add a field to the Embed
         * @param {string} name The name (or title if you will) of the field
         * @param {string} value The content of the field
         * @param {boolean} inline Whether this field should be inline or not
         */
        addField(name: string, value: string, inline?: boolean): false | LolliEmbed;
        /**
         * Add a blank field to the Embed
         * @param {boolean} inline Whether this field should be inline or not
         */
        addBlankField(inline?: boolean): false | LolliEmbed;
        /**
         * Attaches a file to the Embed
         * @param {*} file The file to be attached
         */
        attachFile(file: any): LolliEmbed;
        file: any;
        /**
         * Set the footer of this Embed
         * @param {string} text The footer's text
         * @param {string} icon The URL of an icon that should be used in the footer
         */
        setFooter(text: string, icon: string): LolliEmbed;
        footer: {
            text: string;
            icon_url: string;
        } | undefined;
        /**
         * Set the image of this Embed
         * @param {string} url The image url
         */
        setImage(url: string): LolliEmbed;
        image: {
            url: string;
        } | undefined;
        /**
         * Set the timestamp of this Embed
         * @param {*} time A time resolvable, e.g. a UTC timestamp or epoch timestamps in MS
         */
        setTimestamp(time?: any): LolliEmbed;
        timestamp: any;
        /**
         * Set the title of this Embed
         * @param {string} title The title this Embed should have
         */
        setTitle(title: string): LolliEmbed;
        title: string | undefined;
        /**
         * Set the thumbnail of this Embed
         * @param {string} url The thumbnail URL of this Embed
         */
        setThumbnail(url: string): LolliEmbed; map
        thumbnail: {
            url: string;
        } | undefined;
        /**
         * Set the URL of this Embed
         * @param {string} url The URL of this Embed
         */
        setUrl(url: string): LolliEmbed;
        url: string | undefined;
    }
}
declare module "handlers/MessageHandler" {
    export = MessageHandler;
    /**
     * This class handles the incoming messages and triggers commands if a valid command was issued
     */
    class MessageHandler {
        constructor(lolli: any);
        lolli: any;
        cooldowns: import("helpers/Collection");
        minimumPermissions: string[];
        /**
         * This method handles messages and checks their content for valid commands.
         * If a valid command was found, the command file will be checked for its instantiated properties and then executed.
         * @async
         * @param {Object} message The message object emitted from Discord
         * @param {Map.Collection} commands A collection containing all registered commands
         */
        handle(message: Object, commands: any): Promise<any>;
    }
}
declare module "constants/General" {
    export namespace EVENTS {
        export const EVENT_NAMES: string[];
    }
}
declare module "internal/commands/LolliHelp" {
    export const name: string;
    export const permissions: string[];
    export const allowDMs: boolean;
    export namespace help {
        export const message: string;
        export const usage: string;
        export const example: string[];
        export const inline: boolean;
    }
}
declare module "structures/LolliClient" {
    export = LolliClient;
    const LolliClient_base: any;
    /**
     * Main class extending the actual Eris library.
     * This class handles all the config loading, assures that all pre-conditions are met and
     * finally registers all valid commands in the specified command directory.
     */
    class LolliClient extends LolliClient_base {
        [x: string]: any;
        constructor(lolliOptions: any);
        lolliOptions: any;
        prefix: any;
        events: Set<any>;
        commands: import("helpers/Collection");
        messageHandler: import("handlers/MessageHandler");
        commandFiles: any[];
        eventFiles: any[];
        /**
         * Adds all event listeners. This can be overwritten in the main bot file which inherits this class
         */
        _addEventListeners(): void;
        /**
         * Run all message operators needed off of a single event.
         * @param {object} message The message object emitted from the Discord API
         */
        _runMessageOperators(message: any): void;
        /**
         * Listen for messages, check if they might be valid commands and assign the due work to the MessageHandler
         * @param {object} message The message object emitted from the Discord API
         */
        _messageListener(message: any): void;
        /**
         * This method is called once the bot is "ready" which means that it's
         * successfully logged in to Discord and is now ready to listen to events.
         */
        _readyEmitter(): void;
        _registerInternalCommands(): void;
        /**
        * Register all Lolli events extending the abstract Event class, no matter where events are saved without providing any path.
        * @async
        */
        _registerLolliEvents(): Promise<void>;
        /**
         * Register all Lolli commands extending the abstract Command class, no matter where commands are saved without providing any path.
         * @async
         */
        _registerLolliCommands(): Promise<void>;
    }
}
declare module "structures/LolliConfig" {
    export = LolliConfig;
    /**
     * Really simple and pretty straight forward custom config holder
     */
    class LolliConfig {
        constructor(token: any, lolliConfig: any, erisConfig: any);
        token: any;
        erisConfig: any;
        lolliConfig: any;
    }
}
declare module "structures/LolliVial" {
    export = LolliVial;
    /**
     * Store any data indefinitely and reliably with additional utility methods.
     * @extends Lolli
     * @property {Array<*>} first Get the first item of this Vial
     * @property {Array<*>} last Get the last item of this Vial
     */
    class LolliVial extends Map<any, any> {
        get first(): any;
        get last(): [any, any] | null;
        /**
         * @private
         * @param {*} anything Anything that needs to be stored inside the Vial
         * @returns {string} The object's Snowflake OR a randomly generated v4 UUID if no object with a Snowflake ID was provided for accessing the stored data again
         */
        _pourIn(anything: any): string;
        /**
         * Store ANYTHING inside the vial. If it isn't a data structure with a set predefined ID, the Vial will generate a v4 UUID automatically.
         * If an object gets provided of which the Snowflake is already present in the Vial, the object will be stored nevertheless and gets a v4 UUID assigned!
         *
         * @param {...*} anything Anything that needs to be stored inside the Vial. Can be as many arguments as needed
         * @returns {string | Array<string>} The object's Snowflake OR a randomly generated v4 UUID if no object with a Snowflake ID was provided if a single item was provided or an array containing all Snowflakes / UUIDs of all items
         */
        pourIn(...anything: any[]): string | string[];
        /**
         * Pour out any object or data structure previously added by their identifier.
         * Pouring an element of the Vial will permanently remove the item!
         * @param {string} identifier An item's identifier (Snowflake or v4 UUID)
         * @returns {* | null} The originally stored item inside the Vial or null if none was found
         */
        pourOut(identifier: string): any;
        /**
         * Pour out every item the Vial holds, causing the Vial to return every item it holds and empty itself!
         * This method will DELETE every item the Vial once held!
         * @returns {Array<*>} An array containing every item the Vial once held
         */
        pourAll(): any[];
        /**
         * Test whether the Vial has at least one element satisfying the condition
         * @param {function} probe A testing function that returns true or false
         * @returns {Boolean} True if the Vial includes at least one element satisfying the probe's condition, otherwise false
         */
        incorporates(probe: Function): boolean;
        /**
         * Test whether ALL of the stored items within the Vial satisfy the probe's condition
         * @param {function} probe A testing function that returns true or false
         * @returns {Boolean} True if the Vial includes ONLY elements satisfying the probe's condition, otherwise false
         */
        incorporatesAll(probe: Function): boolean;
        /**
         * Runs an operator on each item of the Vial and returns a merged resulting value
         * @param {function} operator A function that takes the previous and next item and returns a new resulting value
         * @param {*} [initialDrip] An initial value passed to the operator. If left out the first item of the Vial will be taken
         * @returns {*} A merged item resulting from running the operator on all items in the Vial
         */
        merge(operator: Function, initialDrip?: any): any;
        /**
         * Apply an operator on every item of the Vial and return the resulting items in an array
         * @param {function} operator A function taking an item from the Vial and returning a new element
         * @returns {Array<*>} An array containing all new applied items of the Vial
         */
        apply(operator: Function): any[];
        /**
         * Filter the entire Vial for items making the provided operator function evalute true
         * @param {function} operator A function taking an item from the Vial and returning true if it matches
         * @returns {Array<*> | null} An array containing all filtered items or null if none were found
         */
        filter(operator: Function): any[] | null;
        /**
         * Get a certain element from the Vial making the provided operator function evaluate true
         * @param {function} operator A function taking an item from the Vial and returning true if it matches
         * @returns {* | null} A found element from the Vial or null if none were found
         */
        obtain(operator: Function): any;
        /**
         * Get a random element from the Vial
         * @returns {* | null} A random element or null if the Vial is empty
         */
        obtainRandom(): any;
    }
}
declare module "index" {
    export const Client: typeof import("structures/LolliClient");
    export const Config: typeof import("structures/LolliConfig");
    export const Logger: typeof import("helpers/Logger");
    export const Collection: typeof import("helpers/Collection");
    export const RichEmbed: typeof import("structures/LolliEmbed");
    export const Colors: {
        DEFAULT: number;
        WHITE: number;
        AQUA: number;
        GREEN: number;
        BLUE: number;
        PURPLE: number;
        LUMINOUS_VIVID_PINK: number;
        GOLD: number;
        ORANGE: number;
        RED: number;
        GREY: number;
        NAVY: number;
        DARK_AQUA: number;
        DARK_GREEN: number;
        DARK_BLUE: number;
        DARK_PURPLE: number;
        DARK_VIVID_PINK: number;
        DARK_GOLD: number;
        DARK_ORANGE: number;
        DARK_RED: number;
        DARK_GREY: number;
        DARKER_GREY: number;
        LIGHT_GREY: number;
        DARK_NAVY: number;
        BLURPLE: number;
        GREYPLE: number;
        DARK_BUT_NOT_BLACK: number;
        NOT_QUITE_BLACK: number;
    };
    export const Command: typeof import("structures/LolliCommand");
    export const Event: typeof import("structures/LolliEvent");
    export const Vial: typeof import("structures/LolliVial");
}