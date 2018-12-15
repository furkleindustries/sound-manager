"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Channel {
    constructor(options) {
        this.__sounds = {};
        const opts = options || {};
        const { context, sounds, volume, } = opts;
        this.__gainNode = context.createGain();
        if (Array.isArray(sounds)) {
            this.__sounds = Object.assign({}, sounds);
            /* Connect all initial sounds' gain nodes to the channel gain node. */
            Object.keys(this.__sounds).forEach((key) => {
                this.__sounds[key].gainNode.connect(this.gainNode);
            });
        }
        if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
            this.__gainNode.gain.value = volume;
        }
    }
    get sounds() {
        return this.__sounds;
    }
    get gainNode() {
        return this.__gainNode;
    }
    get volume() {
        return this.gainNode.gain.value;
    }
}
exports.Channel = Channel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DaGFubmVsL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxNQUFhLE9BQU87SUFlbEIsWUFBWSxPQUF3QjtRQWQ1QixhQUFRLEdBQStCLEVBQUUsQ0FBQztRQWVoRCxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO1FBRTFCLE1BQU0sRUFDSixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sR0FDUCxHQUFHLElBQUksQ0FBQztRQUVULElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLHNFQUFzRTtZQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBbkNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDO0NBeUJGO0FBdENELDBCQXNDQyJ9