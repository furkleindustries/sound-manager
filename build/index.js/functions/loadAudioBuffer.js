"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAudioBuffer = (url, context) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    return new Promise((resolve, reject) => {
        request.onload = function () {
            // Asynchronously decode the audio file data in request.response
            context.decodeAudioData(request.response, function (buffer) {
                if (!buffer) {
                    return reject(`error decoding file data:  ${url}`);
                }
                return resolve(buffer);
            }, function (error) {
                return reject(error);
            });
        };
        request.onerror = function () {
            reject(`Encountered error loading audio from ${url}`);
        };
        request.send();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZEF1ZGlvQnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9sb2FkQXVkaW9CdWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLGVBQWUsR0FBRyxDQUM3QixHQUFXLEVBQ1gsT0FBcUIsRUFDQyxFQUFFO0lBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLE9BQU8sQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO0lBRXJDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsT0FBTyxDQUFDLE1BQU0sR0FBRztZQUNmLGdFQUFnRTtZQUNoRSxPQUFPLENBQUMsZUFBZSxDQUNyQixPQUFPLENBQUMsUUFBUSxFQUNoQixVQUFVLE1BQU07Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxPQUFPLE1BQU0sQ0FBQyw4QkFBOEIsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUNELFVBQVUsS0FBSztnQkFDYixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQTtRQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUc7WUFDaEIsTUFBTSxDQUFDLHdDQUF3QyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQTtRQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyJ9