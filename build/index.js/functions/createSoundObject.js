"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadAudioBuffer_1 = require("./loadAudioBuffer");
const Sound_1 = require("../Sound/Sound");
exports.createSoundObject = (url, context, options) => {
    return new Promise((resolve, reject) => {
        loadAudioBuffer_1.loadAudioBuffer(url, context).then((buffer) => {
            return resolve(new Sound_1.Sound({
                buffer,
                context,
                ...options,
            }));
        }, (err) => {
            return reject(err);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU291bmRPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZnVuY3Rpb25zL2NyZWF0ZVNvdW5kT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsdURBRTJCO0FBQzNCLDBDQUV3QjtBQUdYLFFBQUEsaUJBQWlCLEdBQUcsQ0FDL0IsR0FBVyxFQUNYLE9BQXFCLEVBQ3JCLE9BQXVCLEVBQ04sRUFBRTtJQUVuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLGlDQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzVDLE9BQU8sT0FBTyxDQUFDLElBQUksYUFBSyxDQUFDO2dCQUN2QixNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsR0FBRyxPQUFPO2FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNULE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==