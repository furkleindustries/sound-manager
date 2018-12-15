"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = require("../Channel/Channel");
class SoundManager {
    constructor() {
        this.channels = {
            default: new Channel_1.Channel(),
        };
        this.masterVolume = 1;
    }
    getChannel(name) {
        return this.channels[name] || null;
    }
}
exports.SoundManager = SoundManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU291bmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1NvdW5kTWFuYWdlci9Tb3VuZE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFFNEI7QUFLNUIsTUFBYSxZQUFZO0lBQXpCO1FBQ0UsYUFBUSxHQUFHO1lBQ1QsT0FBTyxFQUFFLElBQUksaUJBQU8sRUFBRTtTQUN2QixDQUFDO1FBRUYsaUJBQVksR0FBRyxDQUFDLENBQUM7SUFPbkIsQ0FBQztJQUxDLFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDckMsQ0FBQztDQUdGO0FBWkQsb0NBWUMifQ==