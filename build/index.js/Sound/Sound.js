"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sound {
    constructor(options) {
        this.__startedTime = 0;
        this.__pausedTime = 0;
        this.__playing = false;
        const { buffer, context, loop, volume, } = options;
        if (buffer) {
            const sourceNode = context.createBufferSource();
            sourceNode.buffer = buffer;
            this.__sourceNode = sourceNode;
            const gainNode = context.createGain();
            sourceNode.connect(gainNode);
            this.__gainNode = gainNode;
        }
        else {
            throw new Error();
        }
        if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
            this.gainNode.gain.value = volume;
        }
        if (typeof loop === 'boolean') {
            this.sourceNode.loop = loop;
        }
        this.getContextCurrentTime = () => context.currentTime;
    }
    get sourceNode() {
        return this.__sourceNode;
    }
    get gainNode() {
        return this.__gainNode;
    }
    get volume() {
        return this.__gainNode.gain.value;
    }
    get loop() {
        return this.__sourceNode.loop;
    }
    get trackPosition() {
        if (this.playing) {
            return this.getContextCurrentTime() - this.__startedTime;
        }
        return this.__pausedTime;
    }
    get playing() {
        return this.__playing;
    }
    setVolume(value) {
        if (value >= 0 && value <= 1) {
            this.gainNode.gain.value = value;
        }
        else {
            throw new Error();
        }
        return this;
    }
    setLoop(doLoop) {
        this.sourceNode.loop = doLoop;
        return this;
    }
    setTrackPosition(trackPosition) {
        if (this.playing) {
            this.__startedTime = this.getContextCurrentTime() - trackPosition;
        }
        else {
            this.__pausedTime = this.getContextCurrentTime() - trackPosition;
        }
        return this;
    }
    play() {
        const trackPosition = this.trackPosition || 0;
        this.sourceNode.start(trackPosition);
        this.__startedTime = this.getContextCurrentTime() - trackPosition;
        this.__pausedTime = 0;
        this.__playing = true;
        return this;
    }
    pause() {
        this.sourceNode.stop();
        this.__pausedTime = this.trackPosition;
        this.__startedTime = 0;
        this.__playing = false;
        return this;
    }
    stop() {
        this.sourceNode.stop();
        this.__startedTime = 0;
        this.__pausedTime = 0;
        this.__playing = false;
        return this;
    }
    rewind(seconds) {
        this.sourceNode.stop();
        if (this.playing) {
            this.__startedTime += seconds;
            this.sourceNode.start(this.trackPosition);
        }
        else {
            this.__pausedTime -= seconds;
        }
        return this;
    }
    fastForward(seconds) {
        this.sourceNode.stop();
        if (this.playing) {
            this.__startedTime -= seconds;
            this.sourceNode.start(this.trackPosition);
        }
        else {
            this.__pausedTime += seconds;
        }
        return this;
    }
}
exports.Sound = Sound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU291bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU291bmQvU291bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxNQUFhLEtBQUs7SUFxQ2hCLFlBQVksT0FBc0I7UUFsQjFCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBVXpCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFRakMsTUFBTSxFQUNKLE1BQU0sRUFDTixPQUFPLEVBQ1AsSUFBSSxFQUNKLE1BQU0sR0FDUCxHQUFHLE9BQU8sQ0FBQztRQUVaLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDaEQsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7WUFDL0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDNUI7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxPQUFPLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDekQs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