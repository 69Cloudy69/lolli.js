/*
    An extensible and smart command framework for Eris.
    Copyright (C) 2019  Alexander
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
if (Number(process.version.slice(1).split(".")[0]) < 10) {
    throw new Error('Node v10.0.0 or higher is required to use Lolli.js. Please update Node.js to the latest LTS version.');
}

module.exports = {
    Client: require('./structures/LolliClient'),
    Config: require('./structures/LolliConfig'),
    Logger: require('./helpers/Logger'),
    Collection: require('./helpers/Collection'),
    RichEmbed: require('./structures/LolliEmbed'),
    Colors: require('./structures/LolliColors'),
    Command: require('./structures/LolliCommand'),
    Event: require('./structures/LolliEvent'),
    Vial: require('./structures/LolliVial')
};